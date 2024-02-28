import {
  Account,
  AccountFlags,
  AccountMetadata,
  AccountModel,
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

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AccountMetadata)
  metadata: AccountMetadata;

  static toDTO(domain: Account): AccountDTO {
    if (domain instanceof AccountModel) domain = domain.toObject();

    const { security, ...DTO } = domain;

    return DTO;
  }
}
