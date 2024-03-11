export type TUploadFile = (file: Express.Multer.File, bucketName: string, fileName?: string) => Promise<string>;

export interface IFileRepository {
  uploadFile: TUploadFile;
}
