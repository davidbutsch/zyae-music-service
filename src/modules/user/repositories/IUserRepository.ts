import { Document, QueryOptions, Types, UpdateQuery } from "mongoose";

import { User } from "@/modules/user";

export interface IUserRepository {
  findById(
    id: Types.ObjectId | string | undefined,
    options?: QueryOptions<User & Document>
  ): Promise<(User & Document) | null>;
  findByFilter(
    filter: Partial<User>,
    options?: QueryOptions<User & Document>
  ): Promise<(User & Document) | null>;
  create(user: Partial<User>): Promise<User & Document>;
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
