
import { S3Provider } from "@/main/providers/AwsProvider";
import { FileRepository } from "../application/FileRepository";

const { uploadFile } = FileRepository(S3Provider);

export const FileRespositorysContainer = {
  uploadImage: uploadFile
};
