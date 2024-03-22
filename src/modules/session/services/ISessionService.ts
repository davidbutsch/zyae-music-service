import { Session } from "@/modules/session";

export interface ISessionService {
  isSessionExpired(session: Session): boolean;
}
