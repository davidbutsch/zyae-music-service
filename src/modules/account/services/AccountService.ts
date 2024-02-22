import { Account, AccountDTO } from "@/modules/account";

import { Types } from "mongoose";
import { injectable } from "tsyringe";

export interface IAccountService {
  findById(id: string): Promise<AccountDTO | null>;
  create(account: Partial<Account>): Promise<AccountDTO>;
  updateName(id: string, update: string): Promise<AccountDTO | null>;
  delete(id: string): Promise<void>;
}

@injectable()
export class AccountService implements IAccountService {
  async findById(id: string): Promise<AccountDTO | null> {
    return null;
  }
  create(account: Partial<Account>): Promise<AccountDTO> {
    throw new Error("Method not implemented.");
  }
  updateName(id: string, update: string): Promise<AccountDTO | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | Types.ObjectId | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
