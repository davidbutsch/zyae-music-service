import { Message } from ".";

export type ConsumerProcessor = (
  error?: Error | null,
  message?: Message | null
) => any;
