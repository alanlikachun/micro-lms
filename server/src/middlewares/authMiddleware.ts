import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { wrapError } from "../utils/wrapError";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json(wrapError("No token provided"));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch {
    res.status(401).json(wrapError("Invalid token"));
  }
};

export const rbacMiddleware = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json(wrapError("Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json(wrapError("Forbidden"));
    }

    next();
  };
};
