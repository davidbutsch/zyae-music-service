import { Logger } from "@/libs";
import Redis from "ioredis";
import { UserConsumer } from "@/modules/user";
import { config } from "@/common";

export const redis = new Redis(config.databases.redis.url, {
  lazyConnect: true,
  maxLoadingRetryTime: 1,
  maxRetriesPerRequest: null,
});

const consumers = [new UserConsumer()];

const initializeConnection = async () => {
  try {
    await redis.connect();

    Logger.info(
      `Connected to redis on address: '${redis.options.host}:${redis.options.port}'`
    );
  } catch (error) {
    Logger.error(error);
    throw new Error(
      `Error connecting to redis on address: '${redis.options.host}:${redis.options.port}'`
    );
  }
};

export const initializeConsumers = () =>
  consumers.forEach(async (consumer) => {
    await consumer.groupRegistrator();
    consumer.start();
  });

export const stopConsumers = () =>
  consumers.forEach((consumers) => consumers.stop());

(async () => {
  await initializeConnection();
  initializeConsumers();
})();
