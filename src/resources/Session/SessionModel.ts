import { Model, Schema, Types, model } from "mongoose";

import { SessionEntity } from "./SessionEntity";
import { mongoRequired } from "@/common";

type SessionModelType = Model<SessionEntity>;

export const sessionSchema = new Schema<SessionEntity, SessionModelType>({
  userId: mongoRequired(Types.ObjectId),
  accessToken: mongoRequired(String),
  refreshToken: mongoRequired(String),
  expiresAt: mongoRequired(Date),
  updatedAt: mongoRequired(Date),
});

export const SessionModel = model<SessionEntity, SessionModelType>(
  "Session",
  sessionSchema
);
