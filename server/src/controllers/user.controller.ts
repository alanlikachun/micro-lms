import { Request, Response } from "express";
import User from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().select({ password: 0 }).lean();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).select({ password: 0 });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};
