"use server";

import { NextResponse } from "next/server";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

// Helper to generate a unique file name with an extension
const generateUniqueFileName = (extension: string) => {
  const timestamp = Date.now();
  const uniqueId = uuidv4();
  return `${timestamp}-${uniqueId}.${extension}`;
};

// Upload a file to S3
const uploadFileToS3 = async (
  fileContent: Buffer,
  fileName: string,
  bucketName: string
) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ContentType: "application/octet-stream", // Generic content type
  });
  await s3Client.send(command);
};

// GET method to generate a signed URL for accessing an object in S3
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key || typeof key !== "string") {
    return NextResponse.json(
      { error: "Missing key parameter" },
      { status: 400 }
    );
  }

  const bucketName = process.env.AWS_BUCKET_NAME;

  if (!bucketName) {
    return NextResponse.json(
      { error: "Bucket name is not defined" },
      { status: 500 }
    );
  }

  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error details:", error);
    const errorMessage =
      (error as Error).message || "Error generating presigned URL";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST method to handle file uploads
export async function POST(req: Request) {
  const contentType = req.headers.get("content-type");

  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 400 }
    );
  }

  const formData = await req.formData();
  const files = formData.getAll("files");
  const fileFolder = formData.get("fileFolder");

  if (!files || files.length === 0) {
    return NextResponse.json(
      { error: "No valid files uploaded" },
      { status: 400 }
    );
  }

  // Function to process each file
  const processFile = async (file: Blob, index: number) => {
    // Ensure file is a File and has a name
    if (!(file instanceof File)) {
      throw new Error(`File at index ${index} is not a valid File.`);
    }

    const fileBuffer = await file.arrayBuffer();
    let processedBuffer: Buffer;
    let fileName: string;
    let contentType = file.type;

    // If the file is an image, convert it to WebP format using sharp
    if (contentType.startsWith("image/")) {
      processedBuffer = await sharp(Buffer.from(fileBuffer)).webp().toBuffer();
      fileName = `${fileFolder}/${generateUniqueFileName("webp")}`;
      contentType = "image/webp"; // Update content type to WebP
    } else {
      processedBuffer = Buffer.from(fileBuffer);
      fileName = `${fileFolder}/${generateUniqueFileName(
        file.name.split(".").pop() || "bin"
      )}`;
    }

    const bucketName = process.env.AWS_BUCKET_NAME!;

    // Upload the file to S3
    try {
      await uploadFileToS3(processedBuffer, fileName, bucketName);
      return fileName; // Return the S3 key of the uploaded file
    } catch (uploadError) {
      console.error("File upload error:", uploadError);
      throw new Error(`Failed to upload file at index ${index}`);
    }
  };

  try {
    // If only one file is uploaded, process it as a single file
    if (files.length === 1) {
      const file = files[0] as Blob;
      const uploadedFileName = await processFile(file, 0);
      return NextResponse.json({ fileUrl: uploadedFileName });
    } else {
      // If multiple files are uploaded, process them all
      const uploadedFileNames = await Promise.all(
        files.map((file, index) => processFile(file as Blob, index))
      );
      return NextResponse.json({ fileUrls: uploadedFileNames });
    }
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { error: "Failed to upload some or all files" },
      { status: 500 }
    );
  }
}
