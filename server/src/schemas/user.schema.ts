import { z } from "zod";
import { Role } from "../models/user.model";
import { mongoObjectIdSchema } from "../utils/mongoObjectIdSchema";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(Object.values(Role)),
    societies: z.array(mongoObjectIdSchema).optional(),
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: mongoObjectIdSchema,
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type GetUserByIdInput = z.infer<typeof getUserSchema>["params"];
