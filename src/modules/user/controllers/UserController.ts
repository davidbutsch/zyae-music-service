import {
  Body,
  Get,
  JsonController,
  Post,
  Res,
  UseBefore,
} from "routing-controllers";
import { IUserService, UserDTO } from "@/modules/user";
import { inject, injectable } from "tsyringe";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";
import { AttachSession } from "@/middlewares";

import { Response } from "express";

@injectable()
@JsonController("/users")
export class UserController {
  constructor(@inject("UserService") private userService: IUserService) {}

  @UseBefore(AttachSession)
  @Get("/me")
  async getMe(@Res() res: Response) {
    const session = res.locals.session;

    const user = await this.userService.findById(session.userId);

    return user;
  }
}
