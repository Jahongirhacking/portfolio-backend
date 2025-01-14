import { Request, Response, NextFunction } from "express";

export const unknownEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ error: "unknown route" });
  next();
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError") {
    res.status(400).send({ error: err.message });
    return;
  } else if (err.name === "JsonWebTokenError") {
    res.status(400).send({ error: "Invalid token" });
    return;
  } else if (
    err?.errorResponse?.errmsg?.includes("E11000 duplicate key error")
  ) {
    res.status(400).send({ error: "username is taken or duplicate key" });
    return;
  }

  // Generic error response
  res.status(500).json({ error: "An unknown error occurred" });
};
