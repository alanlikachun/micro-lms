import mongoose, { Schema, Document } from "mongoose";

export interface Society extends Document {
  name: string;
  managedBy: mongoose.Types.ObjectId[];
}

const SocietySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    managedBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<Society>("Society", SocietySchema);
