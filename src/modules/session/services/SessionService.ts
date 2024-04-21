import { Session } from "..";
import { inject, injectable } from "tsyringe";
import { ISessionRepository, ISessionService } from "@/modules/session";

@injectable()
export class SessionService implements ISessionService {
  constructor(
    // @ts-ignore ignore noUnusedLocals for unused sessionRepository injection
    @inject("SessionRepository") private sessionRepository: ISessionRepository
  ) {}

  isSessionExpired(session: Session): boolean {
    const currentDate = new Date();
    const expiresAtDate = new Date(session.expiresAt);

    return currentDate > expiresAtDate;
  }
}
