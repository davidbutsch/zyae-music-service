import { SessionEntity } from "@/resources/Session";

export const isSessionExpired = (session: SessionEntity) => {
  const currentDate = new Date();
  const expiresAtDate = new Date(session.expiresAt);

  return currentDate > expiresAtDate;
};
