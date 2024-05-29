import Express, { Application } from "express";
import { ILogger } from "@/shared/providers/Logger/domain/ILogger";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";
import morgan from "morgan";

export const HttpMiddlewareProvider =
  (app: Application, _: ILogger) => (): Application => {
    app.all("/*", function (_, res, next) {
      res.header("access-control-allow-origin", "*");
      res.header(
        "access-control-allow-headers",
        "content-type,accept,access_token,X-Requested-With"
      );
      res.header("Access-control-allow-methods", "GET, POST, PUT, DELETE");
      res.header("Access-control-allow-credentials", "true");
      res.header("Access-control-expose-headers", "Content-Length");
      next();
    });

    app.use(Express.json());

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

    app.use(morgan("\x1b[34m[:method]\x1b[0m \x1b[32m:url\x1b[0m :response-time/ms \x1b[33m:status\x1b[0m"));

    return app;
  };
