import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

// Initialize S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Upload file function
export const uploadFileToS3 = async (fileBuffer, fileName, fileType) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Body: fileBuffer,
    ContentType: fileType,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  // Construct CloudFront URL if used, otherwise return S3 URL
  // const cloudfrontUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/uploads/${fileName}`;
  // return cloudfrontUrl; // Replace with S3 URL if CloudFront is not used
};
