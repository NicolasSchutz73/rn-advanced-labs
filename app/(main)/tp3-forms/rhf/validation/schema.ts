import { z } from 'zod';

export const validationSchema = z.object({
    email: z.string().email('Email invalide').nonempty('Email requis'),
    password: z.string().min(8, 'Minimum 8 caractères').nonempty('Mot de passe requis'),
    confirmPassword: z.string().nonempty('Confirmation requise'),
    displayName: z.string().nonempty('Nom affiché requis'),
    termsAccepted: z.boolean().refine(val => val === true, {
        message: 'Vous devez accepter les conditions'
    })
})

export type FormData = z.infer<typeof validationSchema>;