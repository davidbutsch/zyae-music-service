import { ENV } from "./env";
import { JobOptions } from "@/common";

export const defaultEnvOptions: Partial<Record<keyof ENV, string>> = {
  NODE_ENV: "production",
  LOG_PATH: "./logs",
};

export const defaultValidationConfig = {
  whitelist: true,
  forbidNonWhitelisted: true,
};

export const defaultJobOptions: JobOptions = {
  emitToSelf: false,
};
