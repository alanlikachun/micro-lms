import { Request, Response } from "express";
import User, { Role } from "../models/user.model";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(409).json({ message: "User exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
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
  const { page, limit, ...filters } = req.query;

  const queryConditions: Record<string, any> = {};
  for (const key in filters) {
    if (filters[key] !== undefined) {
      queryConditions[key] = filters[key];
    }
  }

  let query = User.find(queryConditions).sort({ _id: 1 });

  let currentPage: number | undefined;
  let pageSize: number | undefined;
  let total: number | undefined;
  let totalPages: number | undefined;

  if (page && limit) {
    currentPage = Math.max(parseInt(page as string) || 1, 1);
    pageSize = Math.max(parseInt(limit as string) || 10, 1);

    const skip = (currentPage - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);

    total = await User.countDocuments(queryConditions);
    totalPages = Math.ceil(total / pageSize);
  }

  const users = await query.select({ password: 0 }).lean();
  res.json({
    data: users,
    ...(currentPage && { page: currentPage }),
    ...(pageSize && { limit: pageSize }),
    ...(total && { total }),
    ...(totalPages && { totalPages }),
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).select({ password: 0 });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select({ password: 0 });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
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
