import { Document, QueryOptions, Types, UpdateQuery } from "mongoose";
import { IUserRepository, User, UserModel } from "@/modules/user";

export class UserRepository implements IUserRepository {
  findById(
    id: string | Types.ObjectId | undefined,
    options?: QueryOptions<User & Document>
  ): Promise<(User & Document) | null> {
    return UserModel.findById(id, null, options);
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
