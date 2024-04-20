import { Job, Processor, Worker } from "bullmq";
import { JobPayload, config, defaultJobOptions } from "@/common";

import { redis } from "@/libs";

export class BaseWorker extends Worker {
  constructor(name: string, processor: Processor) {
    super(
      name,
      async (job: Job<JobPayload>) => {
        const { owner, options } = job.data;

        const mergedOptions = { ...defaultJobOptions, ...options };

        // skip job if emitToSelf is disabled and owner matches service tag
        if (!mergedOptions.emitToSelf && owner === config.serviceTag) return;

        return await processor(job);
      },
      {
        connection: redis,
      }
    );
  }
}
