import { JobOptions, JobPayload, QueueName, config } from "@/common";

import { Queue } from "bullmq";
import { Types } from "mongoose";
import { redis } from "@/libs";

export class DeleteUserQueue {
  private queue: Queue;

  constructor() {
    this.queue = new Queue(QueueName.DELETE_USER, {
      connection: redis,
    });
  }

  addJob(id: string | Types.ObjectId, options?: JobOptions) {
    const payload: JobPayload = {
      data: id,
      owner: config.serviceTag,
      options,
    };

    return this.queue.add("job", payload);
  }
}
