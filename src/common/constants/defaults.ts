import { ConsumerOptions, MessageOptions } from "@/common";

import { ENV } from "./env";
import { StreamKeys } from ".";

export const defaultEnvOptions: Partial<Record<keyof ENV, string>> = {
  NODE_ENV: "production",
  LOG_PATH: "./logs",
};

export const defaultValidationConfig = {
  whitelist: true,
  forbidNonWhitelisted: true,
};

export const defaultConsumerOptions: ConsumerOptions = {
  streamKey: StreamKeys.DEFAULT,
  ms: 5000,
  adaptiveInterval: true,
  stopOnProcessError: false,
};

export const defaultProducerAppendOptions: MessageOptions = {
  emitToSelf: false,
};
