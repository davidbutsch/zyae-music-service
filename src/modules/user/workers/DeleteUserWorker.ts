import { BaseWorker, JobPayload, QueueName } from "@/common";
import { container, injectable } from "tsyringe";

import { IUserRepository } from "@/modules/user";

/**
 * Subscribes to DeleteUserQueue and reflects deleted user to the service store
 * Implementation: auth/user service emits delete jobs consumed by other services
 */
@injectable()
export class DeleteUserWorker extends BaseWorker {
  private userRepository: IUserRepository;

  constructor() {
    super(QueueName.DELETE_USER, async (job) => {
      return await this.processor(job.data);
    });

    this.userRepository = container.resolve("UserRepository");
  }

  /**
   * Replicates deleted users to service store
   *
   * @param payload.data deleted user id
   */
  private async processor(payload: JobPayload) {
    const { data: userId } = payload;

    await this.userRepository.delete(userId);
  }
}
