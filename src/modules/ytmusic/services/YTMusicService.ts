import { IYTMusicRepository } from "../repositories";
import { IYTMusicService } from "./IYTMusicService";
import { inject, injectable } from "tsyringe";
import { YoutubeTrack, YoutubeWatchlist } from "../do";
import { validatePlain } from "@/common";
import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";

@injectable()
export class YTMusicService implements IYTMusicService {
  constructor(
    @inject("YTMusicRepository") private ytMusicRepository: IYTMusicRepository
  ) {}

  async getTrack(id: string): Promise<YoutubeTrack> {
    const response = await this.ytMusicRepository.findTrackWatchlist(id);

    const watchlist = await validatePlain(YoutubeWatchlist, response, {
      validator: { whitelist: true },
    });

    const track = watchlist.tracks[0];

    return track;
  }

  async getTrackWatchlist(id: string): Promise<YoutubeWatchlist> {
    const response = await this.ytMusicRepository.findTrackWatchlist(id, {
      retreiveFromCache: false, // don't cache so each watchlist is different
    });

    const watchlist = await validatePlain(YoutubeWatchlist, response, {
      validator: { whitelist: true },
    });

    return watchlist;
  }

  async getTrackLyrics(id: string): Promise<string> {
    const watchlist = await this.ytMusicRepository.findTrackWatchlist(id);

    if (!watchlist?.lyrics)
      throw new AppError(StatusCodes.NOT_FOUND, "Lyrics not found");

    const response = await this.ytMusicRepository.findTrackLyrics(
      watchlist.lyrics
    );

    return response.lyrics;
  }

  // TODO type later
  async getTrackRelated(id: string): Promise<any> {
    const watchlist = await this.getTrackWatchlist(id);

    const response = await this.ytMusicRepository.findTrackRelated(
      watchlist.related
    );

    return response;
  }
}
