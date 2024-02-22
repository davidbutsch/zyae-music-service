import { ObjectId } from "mongodb";
import { z } from "zod";

export const test = "Test";

export const sessionEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  userId: z.instanceof(ObjectId),
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.date(),
  updatedAt: z.date(),
});

export type SessionEntity = z.infer<typeof sessionEntitySchema>;
