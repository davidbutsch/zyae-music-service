import { Session } from "@/modules/session";

export interface ISessionService {
  findById(id: string): Promise<Session | null>;
  isSessionExpired(session: Session): boolean;
}
