import { Request, Response } from "express";
import Society from "../models/society.model";
import User from "../models/user.model";
import { wrap } from "module";
import { wrapError } from "../utils/wrapError";

export const createSociety = async (req: Request, res: Response) => {
  const society = await Society.create({
    name: req.body.name,
    managedBy: req.body.managedBy,
  });

  res.status(201).json(society);
};

export const getSocieties = async (req: Request, res: Response) => {
  const societies = await Society.find()
    .populate("managedBy", "name")
    .populate("members", "name")
    .lean();

  res.json(societies);
};

export const getSociety = async (req: Request, res: Response) => {
  const society = await Society.findById(req.params.id)
    .populate("managedBy", "name")
    .populate("members", "name")
    .lean();

  if (!society) {
    return res.status(404).json(wrapError("Society not found"));
  }
  res.json(society);
};

export const updateSociety = async (req: Request, res: Response) => {
  const { id } = req.params;
  const managedBy = req.body.managedBy;

  const count = await User.countDocuments({ _id: { $in: managedBy } });

  if (count !== managedBy.length) {
    return res.status(404).json(wrapError("Managed user not found"));
  }

  const updated = await Society.findByIdAndUpdate(id, req.body, {
    new: true,
  })
    .populate("managedBy", "name")
    .populate("members", "name")
    .lean();

  if (!updated) {
    return res.status(404).json(wrapError("Society not found"));
  }

  res.json(updated);
};

export const deleteSocieties = async (req: Request, res: Response) => {
  const { idList } = req.body;
  const count = await Society.countDocuments({ _id: { $in: idList } });

  if (count !== idList.length) {
    return res.status(404).json(wrapError("Society not found"));
  }

  await Society.deleteMany({ _id: { $in: idList } });
  res.json({ message: "Society deleted" });
};

export const addMembers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { memberIds } = req.body;

  if (!Array.isArray(memberIds) || memberIds.length === 0) {
    return res
      .status(400)
      .json(wrapError("memberIds must be a non-empty array"));
  }

  const society = await Society.findById(id);
  if (!society) {
    return res.status(404).json(wrapError("Society not found"));
  }

  const users = await User.find({ _id: { $in: memberIds } });
  const validIds = users.map((u) => u._id.toString());
  const notFound = memberIds.filter((id) => !validIds.includes(id));

  if (notFound.length > 0) {
    return res
      .status(404)
      .json(wrapError(`Users not found: ${notFound.join(", ")}`));
  }

  const newMembers = memberIds.filter((id) => !society.members.includes(id));
  society.members.push(...newMembers);
  await society.save();

  await User.updateMany(
    { _id: { $in: newMembers } },
    { $addToSet: { societies: society._id } }
  );

  res.json({
    message: "Members added successfully",
    added: newMembers,
    alreadyMembers: memberIds.filter(
      (id) => society.members.includes(id) && !newMembers.includes(id)
    ),
  });
};
