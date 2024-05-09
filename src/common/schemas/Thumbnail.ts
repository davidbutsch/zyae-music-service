import { IsNumber, IsString } from "class-validator";

export class Thumbnail {
  @IsString() url: string;
  @IsNumber() width: string;
  @IsNumber() height: string;
}
