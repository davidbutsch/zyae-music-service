import { IsBoolean } from "class-validator";

export class AccountFlags {
  @IsBoolean() isEmailVerified: boolean;
}
