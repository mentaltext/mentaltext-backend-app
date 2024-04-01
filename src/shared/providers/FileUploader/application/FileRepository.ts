import { PutObjectCommand, type S3Client } from "@aws-sdk/client-s3";
import { IFileRepository } from "../domain/IFileRepository";
import sharp from "sharp";
import { AWS_S3_BUCKET_URL } from "@/shared/constants/CommonConstants";

export const FileRepository = (s3: S3Client): IFileRepository => ({
  async uploadFile(file, bucketName, fileName = ""): Promise<string> {
    if (!file) {
      return "";
    }
    if (typeof file === "string") {
      return file;
    }
    const redimensionedFile = await sharp(file.buffer)
      .resize({
        height: 500,
        width: 500,
        fit: "cover",
      })
      .toBuffer();
    const replacedName = `resized-${Date.now()}_${file.originalname}`;

    const params = {
      Bucket: bucketName,
      Body: redimensionedFile,
      Key: fileName || replacedName,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    try {
      await s3.send(command);

      const fileRoute = AWS_S3_BUCKET_URL + (fileName || replacedName);
      return fileRoute;
    } catch (error) {
      throw new Error("Error uploading file to S3");
    }
  },
});
