import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
export const UploadFileHandler = upload.single("file");
