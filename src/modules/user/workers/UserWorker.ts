import { BaseUser, IUserRepository } from "@/modules/user";
import { BaseWorker, JobPayload, QueueName } from "@/common";
import { container, injectable } from "tsyringe";

import { Job } from "bullmq";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

/**
 * User worker subscribes to the user queue and reflects state change to the service db
 * The user worker and job setter should not exist in the same codebase.
 * Implementation: auth/user service emits user events which other services (this one) consume
 */
@injectable()
export class UserWorker extends BaseWorker {
  private userRepository: IUserRepository;

  constructor() {
    super(QueueName.USER, async (job: Job<JobPayload>) => {
      switch (job.name) {
        case "create":
          return await this.create(job.data);
        case "update":
          return await this.update(job.data);
        default:
          throw new Error(`"${job.name}" is not a registered method`);
      }
    });

    this.userRepository = container.resolve("UserRepository");
  }

  /**
   * replicates new user data to local service store
   *
   * @param data new user data will be stripped of all properties not included in BaseUser class
   */
  private async create(payload: JobPayload): Promise<void> {
    const { data } = payload;

    const user = plainToClass(BaseUser, data);
    const errors = await validate(user, { whitelist: true });

    if (errors.length > 0) throw new Error(errors.toString());

    await this.userRepository?.create(user);
  }

  private async update(payload: JobPayload): Promise<void> {
    const { data } = payload;

    const update: Partial<BaseUser> = plainToClass(BaseUser, data);
    const errors = await validate(update, {
      whitelist: true,
      skipMissingProperties: true,
    });

    if (errors.length > 0) throw new Error(errors.toString());

    const updatedUser = this.userRepository?.update(update._id, update);

    if (!updatedUser) throw new Error("User not found");
  }
}
