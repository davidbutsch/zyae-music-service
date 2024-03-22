import { UpdateUserDTO, UserDTO } from "@/modules/user";

export interface IUserService {
  findById(id: string): Promise<UserDTO>;
  update(id: string, update: UpdateUserDTO): Promise<UserDTO>;
}
