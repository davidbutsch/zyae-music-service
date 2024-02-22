import * as SessionService from "@/modules/session/services";

import { AppError } from "@/errors";
import { Handler } from "express";
import { StatusCodes } from "http-status-codes";

export const checkAuthentication: Handler = (_req, res, next) => {
  try {
    const session = res.locals.session;
    if (!session)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Session not attached");

    const isExpired = SessionService.isSessionExpired(session);
    if (isExpired)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Session access expired");

    next();
  } catch (error) {
    if (error instanceof AppError) return next(error);
  }
};
