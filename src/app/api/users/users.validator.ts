import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").nonempty("Name is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
});

export type TUser = z.infer<typeof userSchema>;