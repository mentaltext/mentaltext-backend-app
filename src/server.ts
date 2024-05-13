import { consoleLogger as ConsoleLogger } from "./shared/providers/Logger/infraestructure/ConsoleLogger";
import {
  ApplicationProvider,
  server,
} from "./main/providers/ApplicationProvider";
import { config } from "./main/providers/LocalsProvider";
import { SocketActionsProvider } from "./main/providers/SocketActions";
import { io } from "./main/providers/SocketServerProvider";

import("tsconfig-paths")
  .then(({ register }) => {
    register({
      baseUrl: __dirname,
      paths: { "@/*": ["*"] },
      addMatchAll: false,
    });
  })
  .then(() => {
    const port = config().port;
    const { logger, s3 } = ApplicationProvider(ConsoleLogger)();
    server.httpServer.listen(port, "0.0.0.0", () => {
      logger.info(`Server is running at http://localhost:${port}/`);
      logger.info(`AWS VERSION :: ${s3.config.apiVersion}`);

      SocketActionsProvider(io);
    });
  });
