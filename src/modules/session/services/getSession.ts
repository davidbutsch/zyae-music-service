import { redis } from "@/libs";
import { SessionEntity } from "@/resources/Session";

export const getSession = async (
  sessionId: string
): Promise<SessionEntity | null> => {
  const raw = await redis.get(`session:${sessionId}`);
  return raw ? JSON.parse(raw) : null;
};
