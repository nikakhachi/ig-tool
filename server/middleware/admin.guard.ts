import { NextFunction, Request, Response } from "express";
import { ForbiddenException } from "../utils/responses";

const adminGuard = async (req: Request, res: Response, next: NextFunction) => {
  const adminKey = req.headers.authorization;
  if (adminKey !== process.env.ADMIN_KEY) return new ForbiddenException(res);
  next();
};

export { adminGuard };
