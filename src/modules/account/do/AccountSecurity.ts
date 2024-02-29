import { IsNullable } from "@/common";
import { IsString } from "class-validator";

export class AccountSecurity {
  @IsString()
  @IsNullable()
  password: string | null;
}
