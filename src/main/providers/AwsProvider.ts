import { S3Client } from "@aws-sdk/client-s3";
import { config } from "./LocalsProvider";

export const S3Provider = new S3Client({
  region: config().region,
  credentials: {
    accessKeyId: config().accessKeyId!,
    secretAccessKey: config().secretAccessKey!,
  },
});
