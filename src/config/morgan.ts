import morgan from "morgan";
import logger from "./logger";
import { Request, Response } from "express";

morgan.token(
  "message",
  (req: Request, res: Response) => res.locals.errorMessage || ""
);

const successResponseFormat = `:remote-addr - :method :url :status - :response-time ms`;
const errorResponseFormat = `:remote-addr - :method - :url - :status - :response-time ms - :message - :date[iso] - :http-version - :total-time ms - :user-agent`;

const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: {
    write: (message: string) => {
      return logger.error(message.trim());
    },
  },
});
export { successHandler, errorHandler };
