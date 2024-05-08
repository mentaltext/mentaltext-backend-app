import express, { Express } from "express";
import { ILogger } from "@/shared/providers/Logger/domain/ILogger";
import { HttpMiddlewareProvider } from "./MiddlewaresProvider";
import Router from "express-promise-router";
import { init as initLocals } from "./LocalsProvider";
import { RegisterRoutes } from "./RouterProvider";
import ErrorHandlerProvider from "./ErrorHandlerProvider";
import passport from "passport";
import http from "http";
import { S3Provider } from "./AwsProvider";
import { SocketServerProvider } from "./SocketServerProvider";

export const server = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  httpServer: null as any,
};

interface IApplicationProvider {
  app: Express;
  logger: ILogger;
  s3;
}

export const ApplicationProvider =
  (logger: ILogger) =>
  (): IApplicationProvider => {
    const app = express();
    const router = Router();

    require("./../../shared/PassportProvider/infraestructure/passportConfig");
    app.use(passport.initialize());

    initLocals(app);
    HttpMiddlewareProvider(app, logger)();

    app.use(router);
    RegisterRoutes(router);

    app.use(ErrorHandlerProvider.syntaxErrorHandler());
    app.use(ErrorHandlerProvider.notFoundHandler());
    app.use(ErrorHandlerProvider.clientErrorHandler());
    app.use(ErrorHandlerProvider.errorHandler());

    const s3 = S3Provider;

    server.httpServer = http.createServer(app);
    SocketServerProvider(server.httpServer)();

    return {
      app,
      logger,
      s3,
    };
  };

export const stopServer = async (): Promise<void> => {
  // Detener el servidor Express si está en ejecución
  if (server.httpServer) {
    await new Promise<void>((resolve, reject) => {
      server.httpServer!.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};
