import { YTMusicRepositoryFetchOptions } from "../types";

export interface IYTMusicRepository {
  findTrackInfo(
    videoId: string,
    options?: YTMusicRepositoryFetchOptions
  ): Promise<any>;
  findTrackWatchlist(
    videoId: string,
    options?: YTMusicRepositoryFetchOptions
  ): Promise<any>;
  findTrackLyrics(
    browseId: string,
    options?: YTMusicRepositoryFetchOptions
  ): Promise<any>;
  findTrackRelated(
    browseId: string,
    options?: YTMusicRepositoryFetchOptions
  ): Promise<any>;
}
