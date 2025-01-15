import express, { Request, Response } from "express";
import { Admin } from "../models/admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";
import { isAuthenticated } from "../utils/auth";
import { extractToken } from "../utils/middleware";
import mongoose from "mongoose";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  async (
    req: Request<{}, {}, { name: string; username: string; password: string }>,
    res: Response
  ) => {
    if (!(await isAuthenticated(extractToken(req)))) {
      res.status(400).json({ error: "invalid token" });
      return;
    }
    const { name, username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await new Admin({ name, username, passwordHash }).save();
    res.status(201).json({ message: "admin created" });
  }
);

authRouter.put(
  "/password",
  async (req: Request<{}, {}, { password: string }>, res: Response) => {
    if (!(await isAuthenticated(extractToken(req)))) {
      res.status(400).json({ error: "invalid token" });
      return;
    }
    const { password } = req.body;
    const credentials = jwt.verify(extractToken(req), JWT_SECRET) as {
      id: mongoose.Types.ObjectId;
    };
    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await Admin.findById(credentials.id);
    if (admin) {
      admin.passwordHash = passwordHash;
      await admin.save();
    }
    res.status(201).json({ message: "password successfully changed" });
  }
);

authRouter.post(
  "/signin",
  async (
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      res.status(404).json({ error: "user not found" });
      return;
    }
    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (isValid) {
      res.status(200).json({
        token: jwt.sign(
          { id: admin._id, username: admin.username },
          JWT_SECRET
        ),
      });
    }
    res.status(400).json({ error: "login or password is incorrect" });
  }
);

export default authRouter;
