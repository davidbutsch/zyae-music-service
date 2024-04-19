import { BaseUser } from "@/modules/user";
import { DeepPartial } from "@/types";
import { Queue } from "bullmq";
import { QueueName } from "@/common";
import { redis } from "@/libs";

export class UserQueue {
  private queue: Queue;

  constructor() {
    this.queue = new Queue(QueueName.USER, { connection: redis });
  }

  async create(user: BaseUser) {
    const job = await this.queue.add("create", user);
    return job;
  }

  async update(update: DeepPartial<BaseUser>) {
    const job = await this.queue.add("update", update);
    return job;
  }
}
