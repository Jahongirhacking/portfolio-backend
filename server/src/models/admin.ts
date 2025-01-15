import mongoose from "mongoose";

export interface IAdmin {
  name: string;
  username: string;
  passwordHash: string;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
