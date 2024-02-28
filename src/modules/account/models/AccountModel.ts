import { Model, Schema, model } from "mongoose";
import { mongoRequired, validateISO6381 } from "@/common";

import { Account } from "@/modules/account";

type AccountModelType = Model<Account>;

const accountProfileSchema = new Schema<Account["profile"]>(
  {
    firstName: mongoRequired(String),
    lastName: mongoRequired(String),
    email: mongoRequired(String),
    thumbnail: mongoRequired(String),
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

export const accountSchema = new Schema<Account, AccountModelType>({
  profile: accountProfileSchema,
  security: securitySchema,
  preferences: preferencesSchema,
  flags: flagsSchema,
});

export const AccountModel = model<Account, AccountModelType>(
  "Account",
  accountSchema
);
