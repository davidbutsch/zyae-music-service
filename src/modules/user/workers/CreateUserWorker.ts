import { BaseUser, IUserRepository } from "@/modules/user";
import { BaseWorker, JobPayload, QueueName } from "@/common";
import { container, injectable } from "tsyringe";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

/**
 * Subscribes to CreateUserQueue and reflects user creation to the service store
 * Implementation: auth/user service emit create jobs consumed by other services
 */
@injectable()
export class CreateUserWorker extends BaseWorker {
  private userRepository: IUserRepository;

  constructor() {
    super(QueueName.CREATE_USER, async (job) => {
      return await this.processor(job.data);
    });

    this.userRepository = container.resolve("UserRepository");
  }

  /**
   * Replicates new user data to service store
   *
   * @param payload.data new user data will be stripped of all properties not included in BaseUser class
   */
  private async processor(payload: JobPayload) {
    const { data } = payload;

    const user = plainToClass(BaseUser, data);
    const errors = await validate(user, { whitelist: true });

    if (errors.length > 0) throw new Error(errors.toString());

    await this.userRepository?.create(user);
  }
}
