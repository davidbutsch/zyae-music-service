import { QueueName } from "@/common";
import { BaseUser, IUserRepository } from "@/modules/user";
import { Worker } from "bullmq";
import { inject, injectable } from "tsyringe";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { redis } from "@/libs";

/**
 * User worker subscribes to the user queue and reflects state change to the service db
 * The user worker and job setter should not exist in the same codebase.
 * Implementation: auth/user service emits user events which other services (this one) consume
 */
@injectable()
export class UserWorker extends Worker {
  constructor(
    @inject("UserRepository") private userRepository?: IUserRepository
  ) {
    super(
      QueueName.USER,
      async (job) => {
        switch (job.name) {
          case "create":
            return await this.create(job.data);
          case "update":
            return await this.update(job.data);
          default:
            throw new Error(`"${job.name}" is not a registered method`);
        }
      },
      {
        connection: redis,
      }
    );
  }

  /**
   * replicates new user data to local service store
   *
   * @param data new user data will be stripped of all properties not included in BaseUser class
   */
  private async create(data: unknown): Promise<void> {
    const user = plainToClass(BaseUser, data);
    const errors = await validate(user, { whitelist: true });
    if (errors.length > 0) throw new Error(errors.toString());

    console.log("create user!!");
    console.log(user);
  }

  private async update(data: unknown): Promise<void> {
    const update: Partial<BaseUser> = plainToClass(BaseUser, data);
    const errors = await validate(update, {
      whitelist: true,
      skipMissingProperties: true,
    });

    if (errors.length > 0) throw new Error(errors.toString());

    this.userRepository?.update(update._id, update);
  }
}
