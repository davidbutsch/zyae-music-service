import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsMongoId,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";

import { IsISO6391 } from "@/common";
import { Type } from "class-transformer";

export class BaseUserProfile {
  @IsString() firstName: string;
  @IsOptional() @IsString() lastName?: string;
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

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseUserProfile)
  profile: BaseUserProfile;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseUserPreferences)
  preferences: BaseUserPreferences;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseUserFlags)
  flags: BaseUserFlags;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseUserMetadata)
  metadata: BaseUserMetadata;
}
