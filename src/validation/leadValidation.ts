import { z } from "zod";

export const leadValidation = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  cpf: z.string().min(11).max(14),
  contacted: z.boolean(),
  billValue: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(2).max(2),
  supplyType: z.string().min(1),
});

export type LeadInput = z.infer<typeof leadValidation>;
