import { IsDefined, IsNotEmptyObject, ValidateNested } from "class-validator";

import { IsObjectId } from "@/common";
import { Type } from "class-transformer";
import { UserFlags } from "./UserFlags";
import { UserMetadata } from "./UserMetadata";
import { UserPreferences } from "./UserPreferences";
import { UserProfile } from "./UserProfile";
import { UserSecurity } from "./UserSecurity";

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
