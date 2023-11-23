/* eslint-disable */

import app from "./app";
import logger from "./config/logger";
import config from "./config/config";
import { sequelize, models } from "./config/sequelize";

try {
  sequelize.authenticate().then((_) => {
    app.listen(config.port, async () => {
      await sequelize.sync();
      // await sequelize.sync({ force: true }); // Tüm datalar silinebilir.
      logger.info(
        `--> Database : Connection has been established successfully.`
      );
      logger.info(`--> Running : http://localhost:${config.port}/v1/docs`);
    });
  });
} catch (error) {
  logger.info(`--> Database : Unable to connect to the database:, ${error}`);
}

const exitHandler = () => {
  sequelize.close();
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// process.on("SIGTERM", () => {
//   logger.info("SIGTERM received");
//   if (server) {
//     server.close();
//   }
// });
