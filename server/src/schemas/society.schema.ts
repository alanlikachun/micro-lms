import z from "zod";
import { mongoObjectIdSchema } from "../utils/mongoObjectIdSchema";

export const createSocietySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    managedBy: z.array(mongoObjectIdSchema).optional(),
  }),
});

export const getSocietySchema = z.object({
  params: z.object({
    id: mongoObjectIdSchema,
  }),
});

export const updateSocietySchema = z.object({
  params: z.object({
    id: mongoObjectIdSchema,
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    managedBy: z.array(mongoObjectIdSchema).optional(),
  }),
});

export const deleteSocietiesSchema = z.object({
  body: z.object({
    idList: z.array(mongoObjectIdSchema),
  }),
});

export const addMembersSchema = z.object({
  params: z.object({
    id: mongoObjectIdSchema,
  }),
  body: z.object({
    memberIds: z.array(mongoObjectIdSchema),
  }),
});

export type CreateSocietyInput = z.infer<typeof createSocietySchema>;
export type GetSocietyByIdInput = z.infer<typeof getSocietySchema>["params"];
export type UpdateSocietyInput = z.infer<typeof updateSocietySchema>;
export type DeleteSocietiesInput = z.infer<
  typeof deleteSocietiesSchema
>["body"];
export type AddMembersInput = z.infer<typeof addMembersSchema>;