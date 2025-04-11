import { z } from "zod";

export const todosSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long").nonempty("Title is required"),
  completed: z.boolean().default(false),
  user: z.number(),
});

export type TTodos = z.infer<typeof todosSchema>;

export const updateTodoSchema = todosSchema.partial();
