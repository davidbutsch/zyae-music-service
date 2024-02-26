import {
  AccountRepository,
  AccountService,
  IAccountRepository,
} from "@/modules/account";
import { ClassConstructor, IocAdapter } from "routing-controllers";
import { DependencyContainer, container } from "tsyringe";
import {
  ISessionService,
  SessionRepository,
  SessionService,
} from "@/modules/session";

import { IAccountService } from "@/modules/account";
import { ISessionRepository } from "@/modules/session/repositories/ISessionRepository";
import { useContainer } from "routing-controllers";

class TsyringeAdapter implements IocAdapter {
  constructor(private readonly TsyringeContainer: DependencyContainer) {}

  get<T>(someClass: ClassConstructor<T>): T {
    const childContainer = this.TsyringeContainer.createChildContainer();
    return childContainer.resolve<T>(someClass);
  }
}

container.register<IAccountService>("AccountService", {
  useClass: AccountService,
});
container.register<IAccountRepository>("AccountRepository", {
  useClass: AccountRepository,
});
container.register<ISessionService>("SessionService", {
  useClass: SessionService,
});
container.register<ISessionRepository>("SessionRepository", {
  useClass: SessionRepository,
});

useContainer(new TsyringeAdapter(container));
