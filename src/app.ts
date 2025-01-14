import "express-async-errors";
import { unknownEndpoint, errorHandler } from "./utils/middleware";
import { Application } from "express";
import { mainRouter } from "./controllers/v1";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import { MONGO_DB_URI } from "./utils/config";
import cors from "cors";

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

app.get("/", (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, ".."), "index.html"));
});
app.use("/api/v1", mainRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
