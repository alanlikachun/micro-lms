import { Request, Response } from "express";
import User, { Role } from "../models/user.model";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(409).json({ message: "User exists" });
  }

  const user = await User.create({
    name,
    email,
    password: password,
    role: role || Role.STUDENT,
  });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

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

export const deleteUsers = async (req: Request, res: Response) => {
  const { idList } = req.body;
  const count = await User.countDocuments({ _id: { $in: idList } });

  if (count !== idList.length) {
    return res.status(400).json({ message: "Not all provided IDs exist" });
  }

  await User.deleteMany({ _id: { $in: idList } });
  res.json({ message: "Deleted" });
};
