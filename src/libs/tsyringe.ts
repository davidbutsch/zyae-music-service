import {
  ClassConstructor,
  IocAdapter,
  useContainer,
} from "routing-controllers";
import { DependencyContainer, Lifecycle, container } from "tsyringe";
import {
  ISessionRepository,
  ISessionService,
  SessionRepository,
  SessionService,
} from "@/modules/session";
import { ITrackService, TrackService } from "@/modules/track";
import {
  IUserRepository,
  IUserService,
  UserConsumer,
  UserRepository,
  UserService,
} from "@/modules/user";
import { YTMusicRepository, YTMusicService } from "@/modules/ytmusic";

class TsyringeAdapter implements IocAdapter {
  constructor(private readonly TsyringeContainer: DependencyContainer) {}

  get<T>(someClass: ClassConstructor<T>): T {
    const childContainer = this.TsyringeContainer.createChildContainer();
    return childContainer.resolve<T>(someClass);
  }
}

// auth

container.register<IUserService>("UserService", {
  useClass: UserService,
});
container.register<IUserRepository>("UserRepository", {
  useClass: UserRepository,
});
container.register("UserConsumer", {
  useClass: UserConsumer,
});

container.register<ISessionService>("SessionService", {
  useClass: SessionService,
});
container.register<ISessionRepository>("SessionRepository", {
  useClass: SessionRepository,
});

// tracks

container.register<ITrackService>("TrackService", {
  useClass: TrackService,
});

// ytmusic

container.register("YTMusicService", {
  useClass: YTMusicService,
});
container.register(
  "YTMusicRepository",
  {
    useClass: YTMusicRepository,
  },
  { lifecycle: Lifecycle.Singleton }
);

useContainer(new TsyringeAdapter(container));
