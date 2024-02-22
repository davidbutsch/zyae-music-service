import { IsString } from "class-validator";

export class AccountSecurity {
  @IsString() password: string;
}
