import {
  Body,
  Get,
  JsonController,
  Post,
  UseBefore,
} from "routing-controllers";

import { IUserService, UserDTO } from "@/modules/user";
import { inject, injectable } from "tsyringe";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";
import { AttachSession } from "@/middlewares";

@injectable()
@JsonController("/users")
export class UserController {
  constructor(@inject("UserService") private userService: IUserService) {}

  @UseBefore(AttachSession)
  @Get("/me")
  getMe() {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Route not implemented.");
  }

  @Post("/")
  create(@Body() user: UserDTO) {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Route not implemented.");
  }
}
