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

export const updateUserSchema = z.object({
  params: z.object({
    id: mongoObjectIdSchema,
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(Object.values(Role)).optional(),
    societies: z.array(mongoObjectIdSchema).optional(),
  }),
});

export const deleteUsersSchema = z.object({
  body: z.object({
    idList: z.array(mongoObjectIdSchema),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type GetUserByIdInput = z.infer<typeof getUserSchema>["params"];
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type DeleteUsersInput = z.infer<typeof deleteUsersSchema>["body"];
