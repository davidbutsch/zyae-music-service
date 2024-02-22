import * as SessionService from "@/modules/session/services";

import { AppError } from "@/errors";
import { Handler } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Verifies and attaches session to `res.locals`, throwing unauthorized errors for expired or otherwise unauthorized sessions.
 */
export const attachSession: Handler = async (req, res, next) => {
  try {
    const accessToken = req.cookies.at;
    const session = await SessionService.getSession(accessToken);

    if (!session)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Session not found");

    const isExpired = SessionService.isSessionExpired(session);
    if (isExpired)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Session access expired");

    res.locals.session = session;

    next();
  } catch (error) {
    if (error instanceof AppError) return next(error);
  }
};
