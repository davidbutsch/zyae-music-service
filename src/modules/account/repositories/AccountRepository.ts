import { Document, QueryOptions, Types, UpdateQuery } from "mongoose";

import { Account } from "@/modules/account";
import { IAccountRepository } from "./IAccountRepository";

export class AccountRepository implements IAccountRepository {
  findById(
    id: string | Types.ObjectId | undefined,
    options?: QueryOptions
  ): Promise<Account | null> {
    throw new Error("Method not implemented.");
  }
  create(account: Partial<Account>): Promise<Account> {
    throw new Error("Method not implemented.");
  }
  update(
    id: string | Types.ObjectId | undefined,
    update: UpdateQuery<Account & Document>
  ): Promise<(Account & Document) | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | Types.ObjectId | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
