import { MessageOptions, Producer, StreamKeys } from "@/common";

import { BaseUser } from "@/modules/user";
import { DeepPartial } from "@/types";
import { Types } from "mongoose";

export class UserProducer extends Producer {
  constructor() {
    super({
      streamKey: StreamKeys.USER,
    });
  }

  public create(user: BaseUser, options?: MessageOptions) {
    this.append({ method: "create", user }, options);
  }
  public update(update: DeepPartial<BaseUser>, options?: MessageOptions) {
    this.append({ method: "update", update }, options);
  }
  public delete(id: string | Types.ObjectId, options?: MessageOptions) {
    this.append({ method: "delete", id }, options);
  }
}
