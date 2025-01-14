import express from "express";
import designRouter from "./design";
const mainRouter = express.Router();

mainRouter.use("/designs", designRouter);

export { mainRouter };
