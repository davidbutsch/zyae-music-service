import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmptyObject,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";
import { IsISO6391, IsObjectId } from "@/common";

import { Type } from "class-transformer";

export class UserProfile {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsEmail() email: string;
  @IsUrl() thumbnail: string;
}

export class UserPreferences {
  @IsISO6391() language: string;
}

export class UserSecurity {
  @IsString() password: string;
}

export class UserFlags {
  @IsBoolean() isEmailVerified: boolean;
}

export class UserMetadata {
  @IsDate() createdAt: Date;
}

export class User {
  @IsObjectId() _id: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserProfile)
  profile: UserProfile;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserPreferences)
  preferences: UserPreferences;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserSecurity)
  security: UserSecurity;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserFlags)
  flags: UserFlags;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserMetadata)
  metadata: UserMetadata;
}
