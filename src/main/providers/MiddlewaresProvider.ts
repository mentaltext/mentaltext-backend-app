import Express, { Application } from "express";
import { ILogger } from "@/shared/providers/Logger/domain/ILogger";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";
export const HttpMiddlewareProvider =
  (app: Application, _: ILogger) => (): Application => {
    app.all("/*", function (_, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type,accept,access_token,X-Requested-With"
      );
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Expose-Headers", "Content-Length");
      res.header("Content-Type", "multipart/form-data");
      next();
    });

    app.use(
      Express.json()
    );

    app.use(
      Express.urlencoded({
        extended: true,
      })
    );

    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.frameguard({ action: "deny" }));
    app.use(helmet());

    // Habilita los CORS
    app.use(cors());

    // Desactivar la cabecera x-powered-by en la respuesta
    app.disable("x-powered-by");

    // Activa el validador de la carga útil de la solicitud Activa la compresión "gzip" / "deflate" para la respuesta
    app.use(compress());

    return app;
  };
