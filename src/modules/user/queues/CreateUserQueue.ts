import { JobOptions, JobPayload, QueueName, config } from "@/common";

import { BaseUser } from "@/modules/user";
import { Queue } from "bullmq";
import { redis } from "@/libs";

export class CreateUserQueue {
  private queue: Queue;

  constructor() {
    this.queue = new Queue(QueueName.CREATE_USER, {
      connection: redis,
    });
  }

  addJob(user: BaseUser, options?: JobOptions) {
    const payload: JobPayload = {
      data: user,
      owner: config.serviceTag,
      options,
    };

    return this.queue.add("job", payload);
  }
}
