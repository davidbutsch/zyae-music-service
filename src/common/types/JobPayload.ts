import { JobOptions } from ".";

export type JobPayload = {
  data: any;
  owner: string;
  options?: JobOptions;
};
