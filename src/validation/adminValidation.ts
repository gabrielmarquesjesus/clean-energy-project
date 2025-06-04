import { z } from "zod";

export const adminValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AdminInput = z.infer<typeof adminValidation>;
