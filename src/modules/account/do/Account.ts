import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmptyObject,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";
import { IsISO6391, IsObjectId } from "@/common";

import { Type } from "class-transformer";

export class AccountProfile {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsEmail() email: string;
  @IsUrl() thumbnail: string;
}

export class AccountPreferences {
  @IsISO6391() language: string;
}

export class AccountSecurity {
  @IsString() password: string;
}

export class AccountFlags {
  @IsBoolean() isEmailVerified: boolean;
}

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
}
