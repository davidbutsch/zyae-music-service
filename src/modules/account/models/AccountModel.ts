import { Model, Schema, model } from "mongoose";

import { Account } from "@/modules/account";
import { validateISO6381 } from "@/common";

type AccountModelType = Model<Account>;

const accountProfileSchema = new Schema<Account["profile"]>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { _id: false }
);

const securitySchema = new Schema<Account["security"]>(
  {
    password: { type: String, default: null },
  },
  { _id: false }
);

const preferencesSchema = new Schema<Account["preferences"]>(
  {
    language: {
      type: String,
      required: true,
      default: "en",
      validate: {
        validator: validateISO6381,
      },
    },
  },
  { _id: false }
);

const flagsSchema = new Schema<Account["flags"]>(
  {
    isEmailVerified: { type: Boolean, required: true, default: false },
  },
  { _id: false }
);

const metadataSchema = new Schema<Account["metadata"]>(
  {
    createdAt: {
      type: String,
      required: true,
      default: () => new Date().toISOString(),
    },
  },
  { _id: false }
);

export const accountSchema = new Schema<Account, AccountModelType>({
  profile: { type: accountProfileSchema, required: true },
  security: { type: securitySchema, required: true },
  preferences: { type: preferencesSchema, required: true },
  flags: { type: flagsSchema, required: true },
  metadata: { type: metadataSchema, required: true },
});

export const AccountModel = model<Account, AccountModelType>(
  "Account",
  accountSchema
);
