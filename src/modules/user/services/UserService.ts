import { AppError } from "@/errors";
import { User, UserDTO, IUserRepository, IUserService } from "@/modules/user";
import { StatusCodes } from "http-status-codes";

import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async findById(id: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError(StatusCodes.NOT_FOUND, "User not found");

    return UserDTO.toDTO(user);
  }
  create(user: Partial<User>): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }
  updateName(id: string, update: string): Promise<UserDTO | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | Types.ObjectId | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
