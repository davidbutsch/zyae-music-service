import { UpdateUserDTO, User, UserDTO } from "@/modules/user";

export interface IUserService {
  findById(id: string): Promise<UserDTO>;
  create(user: Partial<User>): Promise<UserDTO>;
  update(id: string, update: UpdateUserDTO): Promise<UserDTO>;
  delete(id: string): Promise<void>;
}
