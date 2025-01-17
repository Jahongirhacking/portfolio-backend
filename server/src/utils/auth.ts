import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Admin } from "../models/admin";
import { JWT_SECRET } from "./config";

export const isAuthenticated = async (token: string) => {
  try {
    const credentials = jwt.verify(token, JWT_SECRET) as {
      id: mongoose.Types.ObjectId;
      username: string;
    };
    const admin = await Admin.findById(credentials.id);
    if (!admin) return null;
    return admin.username === credentials.username ? admin : null;
  } catch (err) {
    return null;
  }
};
