import { JobOptions, JobPayload, QueueName, config } from "@/common";

import { BaseUser } from "@/modules/user";
import { DeepPartial } from "@/types";
import { Queue } from "bullmq";
import { redis } from "@/libs";

export class UserQueue {
  private queue: Queue;

  constructor() {
    this.queue = new Queue(QueueName.USER, {
      connection: redis,
    });
  }

  create(user: BaseUser, options?: JobOptions) {
    const payload: JobPayload = {
      data: user,
      owner: config.serviceTag,
      options,
    };

    return this.queue.add("create", payload);
  }

  update(update: DeepPartial<BaseUser>, options?: JobOptions) {
    const payload: JobPayload = {
      data: update,
      owner: config.serviceTag,
      options,
    };

    return this.queue.add("update", payload);
  }
}
