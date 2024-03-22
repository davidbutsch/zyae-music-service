import { Document, QueryOptions, Types, UpdateQuery } from "mongoose";
import { IUserRepository, User, UserModel } from "@/modules/user";

import { objectToDotNotation } from "@/common";

export class UserRepository implements IUserRepository {
  findByFilter(
    filter: Partial<User>,
    options?: QueryOptions<User & Document>
  ): Promise<(User & Document) | null> {
    const filterQuery = objectToDotNotation(filter);
    return UserModel.findOne(filterQuery, null, options);
  }
  create(user: Partial<User>): Promise<User & Document> {
    return UserModel.create(user);
  }
  update(
    id: string | Types.ObjectId | undefined,
    update: UpdateQuery<User & Document>,
    options?: QueryOptions<User & Document>
  ): Promise<(User & Document) | null> {
    return UserModel.findByIdAndUpdate(id, update, options);
  }
  delete(
    id: string | Types.ObjectId | undefined,
    options?: QueryOptions<User & Document>
  ): Promise<(User & Document) | null> {
    return UserModel.findByIdAndDelete(id, options);
  }
}
