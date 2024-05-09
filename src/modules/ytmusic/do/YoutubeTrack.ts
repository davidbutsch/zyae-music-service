import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";

import { Thumbnail } from "@/common";
import { Type } from "class-transformer";

export class YoutubeTrackAlbum {
  @IsString() name: string;
  @IsString() id: string;
}

export class YoutubeTrackArtist {
  @IsString() name: string;
  @IsOptional() @IsString() id?: string;
}

export class YoutubeTrack {
  @IsString() videoId: string;
  @IsString() title: string;
  @IsString() length: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Thumbnail)
  thumbnail: Thumbnail[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => YoutubeTrackArtist)
  artists: YoutubeTrackArtist[];

  @ValidateNested()
  @Type(() => YoutubeTrackAlbum)
  album?: YoutubeTrackAlbum[];

  @IsOptional() @IsString() year?: string;
}
