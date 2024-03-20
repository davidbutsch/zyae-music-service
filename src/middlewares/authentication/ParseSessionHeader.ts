import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { ISessionService, Session } from "@/modules/session";
import { NextFunction, Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";

@injectable()
@Middleware({ type: "before" })
export class ParseSessionHeader implements ExpressMiddlewareInterface {
  private sessionService: ISessionService;

  constructor() {
    this.sessionService = container.resolve("SessionService");
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const session: Session = req.headers["session"]
      ? JSON.parse(req.headers["session"])
      : null;

    if (!session)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Session not found");

    const isExpired = this.sessionService.isSessionExpired(session);

    if (isExpired)
      throw new AppError(StatusCodes.UNAUTHORIZED, "Session access expired");

    res.locals.session = session;

    next();
  }
}
