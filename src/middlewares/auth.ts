/* eslint-disable */
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import config from "../config/config";
import ApiError from "../utils/api-error";
import { Request, Response, NextFunction } from "express";

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization)
    next(new ApiError(httpStatus.UNAUTHORIZED, "Lütfen giriş yapın"));

  const authHeader: any =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  jwt.verify(authHeader, config.jwt.secret, (err: any, user: any) => {
    if (err) next(new ApiError(httpStatus.UNAUTHORIZED, "Token süresi bitti"));
    req.user = user;
    next();
  });
};

module.exports = auth;
