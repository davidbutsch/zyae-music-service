import { RedisKey, RedisValue, Result, ClientContext } from "ioredis";

interface RedisCommander {
  xadd(
    ...args: [key: RedisKey, ...args: number, callback: Callback<string | null>]
  ): Result<string | null, ClientContext>;
}
