import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from "class-transformer";
import { ValidatorOptions, validate } from "class-validator";

export interface TransformValidationOptions {
  validator?: ValidatorOptions;
  transformer?: ClassTransformOptions;
}

export const validatePlain = async <T extends object>(
  cls: ClassConstructor<T>,
  plain: object,
  options?: TransformValidationOptions
) => {
  const instance = plainToInstance(cls, plain, options?.transformer);

  const errors = await validate(instance, options?.validator);

  if (errors.length > 0) throw new Error(errors.toString());

  return instance;
};
