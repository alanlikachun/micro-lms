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

export type CreateUserInput = z.infer<typeof createUserSchema>;
