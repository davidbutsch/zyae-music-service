import {
  MessageOptions,
  ProducerOptions,
  config,
  defaultProducerAppendOptions,
} from "@/common";

import { redis } from "@/libs";

export class Producer {
  private options: ProducerOptions;

  constructor(options: ProducerOptions) {
    this.options = options;
  }

  public append(payload: any, messageOptions?: MessageOptions) {
    const metadata = {
      ownerServiceTag: config.serviceTag,
      ownerPid: process.pid,
    };

    const mergedOptions = {
      ...defaultProducerAppendOptions,
      ...messageOptions,
    };

    const content = {
      payload,
      metadata,
      options: mergedOptions,
    };

    redis.xadd(
      this.options.streamKey,
      "*", // auto create message id
      "content",
      JSON.stringify(content)
    );
  }
}
