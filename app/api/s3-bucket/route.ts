"use server";

import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let key = searchParams.get("key");

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

  // Prepend "image/" to the key if not already included
  if (!key.startsWith("image/")) {
    key = `image/${key}`;
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
