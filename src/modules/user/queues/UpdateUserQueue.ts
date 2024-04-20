import { JobOptions, JobPayload, QueueName, config } from "@/common";

import { BaseUser } from "@/modules/user";
import { DeepPartial } from "@/types";
import { Queue } from "bullmq";
import { redis } from "@/libs";

export class UpdateUserQueue {
  private queue: Queue;

  constructor() {
    this.queue = new Queue(QueueName.UPDATE_USER, {
      connection: redis,
    });
  }

  addJob(update: DeepPartial<BaseUser>, options?: JobOptions) {
    const payload: JobPayload = {
      data: update,
      owner: config.serviceTag,
      options,
    };

    return this.queue.add("job", payload);
  }
}
