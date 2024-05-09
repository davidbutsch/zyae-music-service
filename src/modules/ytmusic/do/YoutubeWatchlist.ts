import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";

import { Type } from "class-transformer";
import { YoutubeTrack } from "../do";

export class YoutubeWatchlist {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => YoutubeTrack)
  tracks: YoutubeTrack[];

  @IsString() playlistId: string;
  @IsOptional() @IsString() lyrics?: string;
  @IsString() related: string;
}
