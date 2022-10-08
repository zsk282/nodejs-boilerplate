const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const fastGlob = require('fast-glob');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { routes } = require('./modules/core');
const { authLimiter } = require('./modules/core/middlewares/rateLimiter');
const { errorConverter, errorHandler } = require('./modules/core/middlewares/error');
const ApiError = require('./modules/core/utils/ApiError');

const expressConfig = async () => {
  const app = express();

  if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }

  // set security HTTP headers
  app.use(helmet());

  // parse json request body
  app.use(express.json());

  // parse urlencoded request body
  app.use(express.urlencoded({ extended: true }));

  // sanitize request data
  app.use(xss());
  app.use(mongoSanitize());

  // gzip compression
  app.use(compression());

  // enable cors
  app.use(cors());
  app.options('*', cors());

  // jwt authentication
  app.use(passport.initialize());
  passport.use('jwt', jwtStrategy);

  // limit repeated failed requests to auth endpoints
  if (config.env === 'production') {
    app.use('/auth', authLimiter);
  }

  // v1 api routes
  app.use('/v1', routes);

  // reading all module routes
  const moduleRoutes = await fastGlob(['**/modules/*.module/routes'], {
    cwd: `${process.cwd()}/src/`,
    onlyDirectories: true,
  });
  moduleRoutes.forEach((route) => {
    app.use('/v1', require(`./${route}`));
  });

  // send back a 404 error for any unknown api request
  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);

  // handle error
  app.use(errorHandler);

  return app;
};

module.exports = {
  expressConfig,
};
