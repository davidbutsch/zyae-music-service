import { SessionEntity } from "@shared/resources/Session";

declare global {
  namespace Express {
    interface Locals {
      session: SessionEntity;
    }
  }
}
