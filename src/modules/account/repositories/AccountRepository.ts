import { Document, QueryOptions, Types, UpdateQuery } from "mongoose";

import { Account } from "@/modules/account";

export interface IAccountRepository {
  findById(
    id: Types.ObjectId | string | undefined,
    options?: QueryOptions
  ): Promise<Account | null>;
  create(account: Partial<Account>): Promise<Account>;
  update(
    id: Types.ObjectId | string | undefined,
    update: UpdateQuery<Account & Document>
  ): Promise<(Account & Document) | null>;
  delete(id: Types.ObjectId | string | undefined): Promise<void>;
}

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
