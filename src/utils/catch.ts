import { Request, Response, NextFunction } from "express";

//Async Function => used in controller
const catchAsync =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

module.exports = catchAsync;
