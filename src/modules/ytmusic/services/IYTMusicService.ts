import { YoutubeTrack, YoutubeWatchlist } from "@/modules/ytmusic";

export interface IYTMusicService {
  getTrack(id: string): Promise<YoutubeTrack>;
  getTrackWatchlist(id: string): Promise<YoutubeWatchlist>;
  getTrackLyrics(id: string): Promise<string>;
  getTrackRelated(id: string): Promise<any>;
}
