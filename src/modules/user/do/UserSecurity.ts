import { IsNullable } from "@/common";
import { IsString } from "class-validator";

export class UserSecurity {
  @IsString()
  @IsNullable()
  password: string | null;
}
