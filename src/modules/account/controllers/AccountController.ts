import { Body, Get, JsonController, Post } from "routing-controllers";

import { IAccountService, AccountDTO } from "@/modules/account";
import { inject, injectable } from "tsyringe";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";

@injectable()
@JsonController("/accounts")
export class AccountController {
  constructor(
    @inject("AccountService") private accountService: IAccountService
  ) {}

  @Get("/me")
  getMe() {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Route not implemented.");
  }

  @Post("/")
  create(@Body() account: AccountDTO) {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Route not implemented.");
  }
}
