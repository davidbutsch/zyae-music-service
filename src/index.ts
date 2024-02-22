process.title = "microservice-template";
Error.stackTraceLimit = process.env.NODE_ENV === "production" ? -1 : 10;

import "module-alias/register";
import "reflect-metadata";
import "./handleExit";

import * as libs from "@/libs";

import { QueueUtils } from "./queue";
import { env } from "@/common";

libs.Logger.info(
  `microservice-template with process id of ${process.pid} starting in ${env.NODE_ENV} mode`
);

QueueUtils.initializeWorkers();
