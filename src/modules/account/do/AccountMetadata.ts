import { IsDateString } from "class-validator";

export class AccountMetadata {
  @IsDateString() createdAt: string;
}
