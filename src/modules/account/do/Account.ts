import {
  AccountFlags,
  AccountMetadata,
  AccountPreferences,
  AccountProfile,
  AccountSecurity,
} from ".";
import { IsDefined, IsNotEmptyObject, ValidateNested } from "class-validator";

import { IsObjectId } from "@/common";
import { Type } from "class-transformer";

export class Account {
  @IsObjectId() _id: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AccountProfile)
  profile: AccountProfile;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AccountSecurity)
  security: AccountSecurity;

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

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AccountMetadata)
  metadata: AccountMetadata;
}
