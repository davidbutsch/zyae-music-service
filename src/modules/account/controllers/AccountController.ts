import {
  Body,
  Get,
  JsonController,
  Post,
  UseBefore,
} from "routing-controllers";

import { IAccountService, AccountDTO } from "@/modules/account";
import { inject, injectable } from "tsyringe";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";
import { ParseSessionHeader } from "@/middlewares";

@injectable()
@JsonController("/accounts")
export class AccountController {
  constructor(
    @inject("AccountService") private accountService: IAccountService
  ) {}

  @UseBefore(ParseSessionHeader)
  @Get("/me")
  getMe() {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Route not implemented.");
  }

  @Post("/")
  create(@Body() account: AccountDTO) {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Route not implemented.");
  }
}
