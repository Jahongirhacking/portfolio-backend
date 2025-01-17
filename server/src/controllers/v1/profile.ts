import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import { Admin, IAdmin } from "../../models/admin";
import { isAuthenticated } from "../../utils/auth";
import { extractToken } from "../../utils/middleware";
const profileRouter = express.Router();

profileRouter.get("/me", async (req: Request, res: Response) => {
  const profile = await isAuthenticated(extractToken(req));
  if (!profile) {
    res.status(400).json({ error: "invalid token" });
    return;
  }
  res.status(200).json(profile);
});

profileRouter.post(
  "/me",
  async (req: Request<{}, {}, IAdmin>, res: Response) => {
    const profile = await isAuthenticated(extractToken(req));
    if (!profile) {
      res.status(400).json({ error: "invalid token" });
      return;
    }
    if ("_id" in req.body) {
      delete req.body._id;
    }
    Object.assign(profile, req.body);
    await profile.save();
    res.status(200).json(profile);
  }
);

profileRouter.put(
  "/change-password",
  async (req: Request<{}, {}, { password: string }>, res: Response) => {
    const profile = await isAuthenticated(extractToken(req));
    if (!profile) {
      res.status(400).json({ error: "invalid token" });
      return;
    }
    if (!req.body.password) {
      res.status(400).json({ error: "empty password" });
      return;
    }
    profile.passwordHash = await bcrypt.hash(req.body.password, 10);
    await profile.save();
    res.status(200).json({ message: "change successful" });
  }
);

profileRouter.get(
  "/:username",
  async (req: Request<{ username: string }>, res: Response) => {
    const { username } = req.params;
    const profile = await Admin.findOne({ username });
    if (!profile) {
      res.status(404).json({ error: "profile not found" });
      return;
    }
    res.status(200).json(profile);
  }
);

export default profileRouter;
