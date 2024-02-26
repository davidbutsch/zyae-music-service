import { Account, AccountDTO } from "@/modules/account";

export interface IAccountService {
  findById(id: string): Promise<AccountDTO | null>;
  create(account: Partial<Account>): Promise<AccountDTO>;
  updateName(id: string, update: string): Promise<AccountDTO | null>;
  delete(id: string): Promise<void>;
}
