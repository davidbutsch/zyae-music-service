import { Document, QueryOptions, Types, UpdateQuery } from "mongoose";
import { IUserRepository, User } from "@/modules/user";

export class UserRepository implements IUserRepository {
  findById(
    id: string | Types.ObjectId | undefined,
    options?: QueryOptions
  ): Promise<(User & Document) | null> {
    throw new Error("Method not implemented.");
  }
  create(user: Partial<User>): Promise<User & Document> {
    throw new Error("Method not implemented.");
  }
  update(
    id: string | Types.ObjectId | undefined,
    update: UpdateQuery<User & Document>,
    options?: QueryOptions<User & Document>
  ): Promise<(User & Document) | null> {
    throw new Error("Method not implemented.");
  }
  delete(
    id: string | Types.ObjectId | undefined,
    options?: QueryOptions<User & Document>
  ): Promise<(User & Document) | null> {
    throw new Error("Method not implemented.");
  }
}
