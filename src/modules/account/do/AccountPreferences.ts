import { IsISO6391 } from "@/common";

export class AccountPreferences {
  @IsISO6391() language: string;
}
