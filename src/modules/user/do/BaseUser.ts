import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEmail,
  IsMongoId,
  IsNotEmptyObject,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";

import { IsISO6391 } from "@/common";
import { Type } from "class-transformer";

export class BaseUserProfile {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsEmail() email: string;
  @IsUrl() thumbnail: string;
}

export class BaseUserPreferences {
  @IsISO6391() language: string;
}

export class BaseUserFlags {
  @IsBoolean() isEmailVerified: boolean;
}

export class BaseUserMetadata {
  @IsDateString() createdAt: string;
}

export class BaseUser {
  @IsMongoId() _id: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseUserProfile)
  profile: BaseUserProfile;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseUserPreferences)
  preferences: BaseUserPreferences;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseUserFlags)
  flags: BaseUserFlags;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseUserMetadata)
  metadata: BaseUserMetadata;
}
