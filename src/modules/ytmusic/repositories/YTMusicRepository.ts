import {
  IYTMusicRepository,
  YTMusicRepositoryFetchOptions,
} from "@/modules/ytmusic";
import { injectable, singleton } from "tsyringe";

import { Logger } from "@/libs";
import { PythonShell } from "python-shell";
import { defaultYTMusicRepositoryFetchOptions } from "../constants";

type Request = {
  action: string;
  payload: any;
};

type Response = {
  token: string;
  data: any;
};

@singleton()
@injectable()
export class YTMusicRepository implements IYTMusicRepository {
  private shell: PythonShell;
  private cached: Response[] = [];

  constructor() {
    this.init();
  }

  private init() {
    this.shell = new PythonShell("ytmusic.py", {
      scriptPath: "./src/modules/ytmusic/scripts/",
      pythonOptions: ["-u"],
    });

    this.shell.on("stderr", (err) => {
      Logger.error(err);
    });

    this.shell.on("close", () => {
      Logger.info("Restarting ytmusicapi shell...");
      this.init();
    });
  }

  private getCacheEntry(token: string) {
    const cached = this.cached.find((entry) => entry.token == token);
    return cached;
  }

  private addCacheEntry(response: Response) {
    this.cached.push(response);
    if (this.cached.length > 50) this.cached.shift();
  }

  private fetch = (
    request: Request,
    _options?: YTMusicRepositoryFetchOptions
  ) =>
    new Promise<any>((resolve, reject) => {
      // merge default options
      const options = { ...defaultYTMusicRepositoryFetchOptions, ..._options };

      // stringified requests identify messages
      const requestToken = JSON.stringify(request);

      if (options.retreiveFromCache) {
        const cached = this.getCacheEntry(requestToken);
        if (cached) return resolve(cached.data);
      }

      this.shell.send(requestToken);

      // TODO implement request timeout
      const onMessage = async (raw: any) => {
        try {
          const response = JSON.parse(raw);
          if ((response.token = requestToken)) {
            resolve(response.data);
            this.addCacheEntry(response);
            this.shell.off("message", onMessage);
          }
        } catch (err) {
          this.shell.off("message", onMessage);
          reject(err);
        }
      };

      this.shell.on("message", onMessage);
      // TODO pull error messages from shell (if possible??)
      this.shell.on("close", () => reject(new Error("Shell exception")));
    });

  findTrackInfo(videoId: string, options?: YTMusicRepositoryFetchOptions) {
    const request: Request = {
      action: "getSong",
      payload: { videoId },
    };

    return this.fetch(request, options);
  }

  findTrackWatchlist(videoId: string, options?: YTMusicRepositoryFetchOptions) {
    const request: Request = {
      action: "getWatchlist",
      payload: { videoId },
    };

    return this.fetch(request, options);
  }

  findTrackLyrics(browseId: string, options?: YTMusicRepositoryFetchOptions) {
    const request: Request = {
      action: "getLyrics",
      payload: { browseId },
    };

    return this.fetch(request, options);
  }

  findTrackRelated(
    browseId: string,
    options?: YTMusicRepositoryFetchOptions
  ): Promise<any> {
    const request: Request = {
      action: "getSongRelated",
      payload: { browseId },
    };

    return this.fetch(request, options);
  }
}
