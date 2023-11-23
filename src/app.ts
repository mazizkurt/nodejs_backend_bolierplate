import express from "express";
import path from "path";
import helmet from "helmet";
//@ts-ignore
import xss from "xss-clean";
import fileUpload from "express-fileupload";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import httpStatus from "http-status";
import config from "./config/config";
import {
  successHandler,
  errorHandler as morgonErrorHandler,
} from "./config/morgan";
import { jwtStrategy } from "./config/passport";
import authLimiter from "./middlewares/rate-middleware";
import { errorConverter, errorHandler } from "./middlewares/error";
import routes from "./routes/v1";
import ApiError from "./utils/api-error";

const app = express();

if (config.env !== "test") {
  app.use(successHandler);
  app.use(morgonErrorHandler);
}

app.set("trust proxy", true);

// enable cors
app.use(cors());
// app.options('*', cors());

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// static
app.use(express.static(path.join(__dirname, "../public")));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// express-fileupload
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "X-Frame-Options": "allow-from *",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Content-Security-Policy": "default-src 'self' 'unsafe-inline'",
    "X-Content-Security-Policy": "default-src  'self' 'unsafe-inline'",
    "X-WebKit-CSP": "default-src 'self' 'unsafe-inline'",
  });
  next();
});
// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
