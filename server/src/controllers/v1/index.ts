import express from "express";
import designRouter from "./design";
import profileRouter from "./profile";
const mainRouter = express.Router();

mainRouter.use("/design", designRouter);
mainRouter.use("/profile", profileRouter);

export { mainRouter };
