import { AppError } from "@/errors";
import {
  Account,
  AccountDTO,
  IAccountRepository,
  IAccountService,
} from "@/modules/account";
import { StatusCodes } from "http-status-codes";

import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";

@injectable()
export class AccountService implements IAccountService {
  constructor(
    @inject("AccountRepository") private accountRepository: IAccountRepository
  ) {}

  async findById(id: string): Promise<AccountDTO> {
    const account = await this.accountRepository.findById(id);

    if (!account)
      throw new AppError(StatusCodes.NOT_FOUND, "Account not found");

    return AccountDTO.toDTO(account);
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
