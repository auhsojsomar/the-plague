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

const generateUniqueFileName = () => {
  const timestamp = Date.now();
  const uniqueId = uuidv4();
  return `${timestamp}-${uniqueId}.webp`;
};

const uploadFileToS3 = async (
  fileContent: Buffer,
  fileName: string,
  bucketName: string
) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ContentType: "image/webp",
  });
  await s3Client.send(command);
};

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

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type");

  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 400 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      { error: "No valid file uploaded" },
      { status: 400 }
    );
  }

  const fileBuffer = await file.arrayBuffer();
  const webpBuffer = await sharp(Buffer.from(fileBuffer)).webp().toBuffer();

  const fileName = `transaction/${generateUniqueFileName()}`;
  const bucketName = process.env.AWS_BUCKET_NAME!;

  try {
    await uploadFileToS3(webpBuffer, fileName, bucketName);

    const fileUrl = fileName;
    return NextResponse.json({ fileUrl });
  } catch (uploadError) {
    console.error("File upload error:", uploadError);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
