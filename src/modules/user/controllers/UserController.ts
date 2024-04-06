import {
  Body,
  Get,
  JsonController,
  Patch,
  Res,
  UseBefore,
} from "routing-controllers";
import { IUserService, UpdateUserDTO } from "@/modules/user";
import { inject, injectable } from "tsyringe";
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

    return {
      data: { user },
    };
  }

  @UseBefore(AttachSession)
  @Patch("/me")
  async updateMe(@Res() res: Response, @Body() update: UpdateUserDTO) {
    const session = res.locals.session;

    const user = await this.userService.update(session.userId, update);

    return {
      data: { user },
    };
  }
}
