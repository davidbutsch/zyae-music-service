import { Model, Schema, model } from "mongoose";

import { Account } from "@/modules/account";
import { mongoRequired } from "@/common";
import { validateISO6381 } from "@/common";

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

const preferencesSchema = new Schema<Account["preferences"]>(
  {
    language: {
      type: String,
      required: true,
      validate: {
        validator: validateISO6381,
      },
    },
  },
  { _id: false }
);

const flagsSchema = new Schema<Account["flags"]>(
  {
    isEmailVerified: mongoRequired(Boolean),
  },
  { _id: false }
);

export const accountSchema = new Schema<Account, AccountModelType>({
  profile: accountProfileSchema,
  preferences: preferencesSchema,
  flags: flagsSchema,
});

export const AccountModel = model<Account, AccountModelType>(
  "Account",
  accountSchema
);
