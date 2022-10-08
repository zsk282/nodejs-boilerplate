const mongoose = require('mongoose');
const { expressConfig } = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;

const startMongoServer = () => {
  return mongoose.connect(config.mongoose.url, config.mongoose.options);
};

const startServer = async () => {
  await startMongoServer();
  logger.info('Connected to MongoDB');

  const app = await expressConfig();
  server = await app.listen(config.port);
  logger.info(`Listening to port ${config.port}`);
};

const exitHandler = async () => {
  if (server) {
    await server.close();
    logger.info('Server closed');
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = async (error) => {
  logger.error(error);
  await exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

startServer();
