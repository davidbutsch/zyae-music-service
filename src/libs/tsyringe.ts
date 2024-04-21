import {
  ClassConstructor,
  IocAdapter,
  useContainer,
} from "routing-controllers";
import {
  CreateUserQueue,
  DeleteUserQueue,
  IUserRepository,
  IUserService,
  UpdateUserQueue,
  UserRepository,
  UserService,
} from "@/modules/user";
import { DependencyContainer, container } from "tsyringe";
import {
  ISessionRepository,
  ISessionService,
  SessionRepository,
  SessionService,
} from "@/modules/session";

class TsyringeAdapter implements IocAdapter {
  constructor(private readonly TsyringeContainer: DependencyContainer) {}

  get<T>(someClass: ClassConstructor<T>): T {
    const childContainer = this.TsyringeContainer.createChildContainer();
    return childContainer.resolve<T>(someClass);
  }
}

container.register<IUserService>("UserService", {
  useClass: UserService,
});
container.register<IUserRepository>("UserRepository", {
  useClass: UserRepository,
});
container.register<ISessionService>("SessionService", {
  useClass: SessionService,
});
container.register<ISessionRepository>("SessionRepository", {
  useClass: SessionRepository,
});

container.register("CreateUserQueue", {
  useClass: CreateUserQueue,
});
container.register("UpdateUserQueue", {
  useClass: UpdateUserQueue,
});
container.register("DeleteUserQueue", {
  useClass: DeleteUserQueue,
});

useContainer(new TsyringeAdapter(container));
