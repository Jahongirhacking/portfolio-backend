import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { Admin } from "../models/admin";
import mongoose from "mongoose";

export const isAuthenticated = async (token: string) => {
  try {
    const credentials = jwt.verify(token, JWT_SECRET) as {
      id: mongoose.Types.ObjectId;
      username: string;
    };
    const admin = await Admin.findById(credentials.id);
    return admin && admin.username === credentials.username;
  } catch (err) {
    return false;
  }
};
