import { IsDate, IsString } from "class-validator";

import { IsObjectId } from "@/common";

export class Session {
  @IsObjectId() id: string;
  @IsObjectId() userId: string;
  @IsString() accessToken: string;
  @IsString() refreshToken: string;
  @IsDate() expiresAt: string;
  @IsDate() updatedAt: string;
}
