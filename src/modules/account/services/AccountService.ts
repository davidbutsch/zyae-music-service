import { Account, AccountDTO } from "@/modules/account";

import { IAccountService } from "./IAccountService";
import { Types } from "mongoose";
import { injectable } from "tsyringe";

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
