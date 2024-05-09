import { Track } from "../do";

export interface ITrackService {
  getById(id: string): Promise<Track>;
  getQueueById(id: string): Promise<Track[]>;
  getLyricsById(id: string): Promise<string>;
  getRelatedById(id: string): Promise<string>;
}
