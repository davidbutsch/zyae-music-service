import { ZodObject, ZodRawShape, z } from "zod";

import { AppError } from "@/errors";
import { StatusCodes } from "http-status-codes";

export const validate = <T extends ZodRawShape>(
  value: any,
  validator: ZodObject<T>,
  statusCode?: StatusCodes
): z.infer<typeof validator> => {
  const result = validator.safeParse(value);

  if (!result.success) {
    const { error } = result;

    throw new AppError(statusCode || StatusCodes.BAD_REQUEST, error.message, [
      error,
    ]);
  }

  return value;
};
