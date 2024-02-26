import { ISessionRepository } from "./ISessionRepository";
import { Session } from "..";
import { redis } from "@/libs";

export class SessionRepository implements ISessionRepository {
  async findById(id: string): Promise<Session | null> {
    const raw = await redis.get(`session:${id}`);
    return raw ? JSON.parse(raw) : null;
  }
  findByAccessToken(at: string): Promise<Session | null> {
    throw new Error("Method not implemented.");
  }
  findByRefreshToken(rt: string): Promise<Session | null> {
    throw new Error("Method not implemented.");
  }
}
