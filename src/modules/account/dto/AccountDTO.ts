import {
  Account,
  AccountFlags,
  AccountPreferences,
  AccountProfile,
} from "@/modules/account";
import {
  IsDefined,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";

export class AccountDTO implements Omit<Account, "security"> {
  @IsString() _id: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AccountProfile)
  profile: AccountProfile;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AccountPreferences)
  preferences: AccountPreferences;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AccountFlags)
  flags: AccountFlags;
}
