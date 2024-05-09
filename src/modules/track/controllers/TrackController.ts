import { Length } from "class-validator";
import { Get, JsonController, Params } from "routing-controllers";
import { inject, injectable } from "tsyringe";
import { ITrackService } from "../services";

class GetTrackInfoParams {
  @Length(11, 11, { message: "trackId must be equal to 11 characters" })
  trackId: string;
}

@injectable()
@JsonController("/tracks")
export class TrackController {
  constructor(@inject("TrackService") private trackService: ITrackService) {}

  @Get("/:trackId")
  async getTrack(@Params({ validate: true }) { trackId }: GetTrackInfoParams) {
    const track = await this.trackService.getById(trackId);

    return {
      data: {
        track,
      },
    };
  }

  @Get("/:trackId/queue")
  async getTrackQueue(
    @Params({ validate: true }) { trackId }: GetTrackInfoParams
  ) {
    const tracks = await this.trackService.getQueueById(trackId);

    return {
      data: {
        tracks,
      },
    };
  }

  @Get("/:trackId/lyrics")
  async getTrackLyrics(
    @Params({ validate: true }) { trackId }: GetTrackInfoParams
  ) {
    const lyrics = await this.trackService.getLyricsById(trackId);

    return {
      data: {
        lyrics,
      },
    };
  }

  @Get("/:trackId/related")
  async getTrackRelated(
    @Params({ validate: true }) { trackId }: GetTrackInfoParams
  ) {
    const related = await this.trackService.getRelatedById(trackId);

    return {
      data: {
        related,
      },
    };
  }
}
