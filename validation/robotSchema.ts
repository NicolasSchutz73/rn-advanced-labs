import { z } from 'zod';

export const robotTypes = ['industrial', 'service', 'medical', 'educational', 'other'] as const;
export type RobotType = typeof robotTypes[number];

export const robotSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').nonempty('Le nom est requis'),
  label: z.string().min(3, 'Le label doit contenir au moins 3 caractères').nonempty('Le label est requis'),
  year: z.number().int('L\'année doit être un entier').gte(1950, 'Année minimale : 1950').lte(new Date().getFullYear(), `Année maximale : ${new Date().getFullYear()}`),
  type: z.enum(robotTypes),
});

export type RobotFormValues = z.infer<typeof robotSchema>;
