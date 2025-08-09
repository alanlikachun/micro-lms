import { Request, Response } from "express";
import Society from "../models/society.model";

export const createSociety = async (req: Request, res: Response) => {
  const society = await Society.create({
    name: req.body.name,
    managedBy: req.body.managedBy,
  });

  res.status(201).json(society);
};

export const getSocieties = async (req: Request, res: Response) => {
  const societies = await Society.find().populate("managedBy", "name").lean();

  res.json(societies);
};

export const getSociety = async (req: Request, res: Response) => {
  const society = await Society.findById(req.params.id).populate("name");

  if (!society) {
    return res.status(404).json({ error: "Society not found" });
  }
  res.json(society);
};

export const updateSociety = async (req: Request, res: Response) => {
  const updated = await Society.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updated) {
    return res.status(404).json({ error: "Society not found" });
  }

  res.json(updated);
};

export const deleteSocieties = async (req: Request, res: Response) => {
  const { idList } = req.body;
  const count = await Society.countDocuments({ _id: { $in: idList } });

  if (count !== idList.length) {
    return res.status(404).json({ error: "Society not found" });
  }

  await Society.deleteMany({ _id: { $in: idList } });
  res.json({ message: "Society deleted" });
};
