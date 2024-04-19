import { Logger } from "./winston";
import { UserWorker } from "@/modules/user";
import { Worker } from "bullmq";

const workers: Worker[] = [new UserWorker()];

export const initializeWorkers = () =>
  workers.forEach((worker) => {
    worker.on("failed", (job, error) => {
      if (job)
        Logger.error(
          `Job ${job.queueName}.${job.name}#${job.id} failed with error: ${error.message}`
        );
      else Logger.error(`Stalled job failed with error: ${error.message}`);
    });
  });
initializeWorkers();

export const closeWorkers = async () =>
  await Promise.all(workers.map((worker) => worker.close()));
