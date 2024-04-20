import { BaseUser, IUserRepository } from "@/modules/user";
import { BaseWorker, JobPayload, QueueName } from "@/common";
import { container, injectable } from "tsyringe";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

/**
 * Subscribes to UpdateUserQueue and reflects user updates to the service store
 * Implementation: auth/user service emit update jobs consumed by other services
 */
@injectable()
export class UpdateUserWorker extends BaseWorker {
  private userRepository: IUserRepository;

  constructor() {
    super(QueueName.UPDATE_USER, (job) => this.processor(job.data));

    this.userRepository = container.resolve("UserRepository");
  }

  /**
   * Replicates new user data to local service store
   *
   * @param payload.data update user data will be stripped of all properties not included in BaseUser class
   */
  private async processor(payload: JobPayload) {
    const { data } = payload;

    const update: Partial<BaseUser> = plainToClass(BaseUser, data);
    const errors = await validate(update, {
      whitelist: true,
      skipMissingProperties: true,
    });

    if (errors.length > 0) throw new Error(errors.toString());

    const updatedUser = await this.userRepository?.update(update._id, update);

    if (!updatedUser) throw new Error("User not found");
  }
}
