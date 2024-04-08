import { Document, QueryOptions, Types, UpdateQuery } from "mongoose";

import { DeepPartial } from "@/types";
import { User } from "@/modules/user";

export interface IUserRepository {
  findByFilter(
    filter: DeepPartial<User>,
    options?: QueryOptions<User & Document>
  ): Promise<(User & Document) | null>;
  create(user: DeepPartial<User>): Promise<User & Document>;
  update(
    id: Types.ObjectId | string | undefined,
    update: UpdateQuery<User & Document>,
    options?: QueryOptions<User & Document>
  ): Promise<(User & Document) | null>;
  delete(
    id: string | Types.ObjectId | undefined,
    options?: QueryOptions<User & Document>
  ): Promise<(User & Document) | null>;
}
