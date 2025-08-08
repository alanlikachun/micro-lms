import mongoose, { Schema, Document } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: Object.values(Role),
      default: Role.STUDENT,
    },
    societies: [{ type: Schema.Types.ObjectId, ref: "Society" }],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<IUser>("User", UserSchema);
