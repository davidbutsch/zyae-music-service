import { Document, QueryOptions, Types, UpdateQuery } from "mongoose";

import { Account } from "@/modules/account";

export interface IAccountRepository {
  findById(
    id: Types.ObjectId | string | undefined,
    options?: QueryOptions
  ): Promise<(Account & Document) | null>;
  create(account: Partial<Account>): Promise<Account & Document>;
  update(
    id: Types.ObjectId | string | undefined,
    update: UpdateQuery<Account & Document>
  ): Promise<(Account & Document) | null>;
  delete(id: Types.ObjectId | string | undefined): Promise<void>;
}
