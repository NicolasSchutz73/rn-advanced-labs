import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const robotSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, 'Nom requis (min 2 caractères)'),
  label: z.string().min(3, 'Label requis (min 3 caractères)'),
  year: z.number().int().gte(1950).lte(currentYear),
  type: z.enum(['industrial', 'service', 'medical', 'educational', 'other']),
});

export type Robot = z.infer<typeof robotSchema>;