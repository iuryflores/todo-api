import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    todos: { type: Schema.Types.ObjectId, ref: "Todo", required: true },
  },
  { timestamps: true }
);

const User = mode("User", todoSchema);
export default User;
