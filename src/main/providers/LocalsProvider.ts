import * as path from "path";
import * as dotenv from "dotenv";
import { Application } from "express";

/**
 * Define Las configuraciones de la app
 */
const config = () => {
  dotenv.config({ path: path.join(__dirname, "../../../.env"), override: true }, );
  const port = process.env.PORT || 3000;
  const node_env = process.env.NODE_ENV || "dev";
  const appSecret =
    process.env.APP_SECRET ||
    "-QV.LlñvjQñÑñ8;5ñ#jyLñl;sY;jlyy8-;DjJYlDdddÑ@2Q;gd6;53d88;583@299QQ@Y3yqlÑqD+y";
  const api_prefix = process.env.API_PREFIX || "api";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION;
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

  const bucketName = process.env.BUCKET_NAME;

  const bucketUrl = process.env.BUCKET_URL;

  return {
    port,
    node_env,
    appSecret,
    api_prefix,
    accessKeyId,
    secretAccessKey,
    region,
    twilioAccountSid,
    twilioAuthToken,
    bucketName,
    bucketUrl,
  };
};

/**
 * Inyecta la configuración de las variables de entorno
 */
const init = (_express: Application) => {
  _express.locals.app = config();
  return _express;
};

export { config, init };
