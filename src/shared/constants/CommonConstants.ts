import { config } from "@/main/providers/LocalsProvider";

export const AWS_S3_BUCKET_NAME = config().bucketName!;
export const AWS_S3_BUCKET_URL = config().bucketUrl!;

export const IP_SERVER = "localhost";
