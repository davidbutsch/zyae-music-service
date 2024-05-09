import { inject, injectable } from "tsyringe";

import { ITrackService } from "@/modules/track";
import { Track } from "../do";
import { IYTMusicService } from "@/modules/ytmusic";

@injectable()
export class TrackService implements ITrackService {
  constructor(
    @inject("YTMusicService") private ytMusicService: IYTMusicService
  ) {}

  async getById(id: string): Promise<Track> {
    const track = await this.ytMusicService.getTrack(id);

    return track;
  }

  async getQueueById(id: string): Promise<Track[]> {
    const watchlist = await this.ytMusicService.getTrackWatchlist(id);

    const tracks = watchlist.tracks;

    return tracks;
  }

  async getLyricsById(id: string): Promise<string> {
    const lyrics = await this.ytMusicService.getTrackLyrics(id);

    return lyrics;
  }

  async getRelatedById(id: string): Promise<string> {
    const related = await this.ytMusicService.getTrackRelated(id);

    return related;
  }
}
