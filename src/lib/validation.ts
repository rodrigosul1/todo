import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Título é obrigatório!"),
  description: z.string(),
  completed: z.boolean().optional().default(false),
});

export const todoResponseSchema = todoSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
