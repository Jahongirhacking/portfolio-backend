import cors from "cors";
import express, { Application } from "express";
import "express-async-errors";
import mongoose from "mongoose";
import path from "path";
import authRouter from "./controllers/auth";
import { mainRouter } from "./controllers/v1";
import { MONGO_DB_URI } from "./utils/config";
import { errorHandler, unknownEndpoint } from "./utils/middleware";

const app: Application = express();

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(path.resolve(__dirname, ".."), "view")));

app.use("/api/v1", mainRouter);
app.use("/api/auth", authRouter);

// Handle unknown routes (must come after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname, ".."), "view", "index.html"));
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
