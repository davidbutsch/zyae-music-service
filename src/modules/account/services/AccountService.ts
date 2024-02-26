import { Account, AccountDTO, IAccountRepository } from "@/modules/account";

import { IAccountService } from "./IAccountService";
import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";

@injectable()
export class AccountService implements IAccountService {
  constructor(
    @inject("AccountRepository") private accountRepository: IAccountRepository
  ) {}

  async findById(id: string): Promise<AccountDTO | null> {
    return this.accountRepository.findById(id);
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
