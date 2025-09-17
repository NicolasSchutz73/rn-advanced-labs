import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email invalide')
        .required('Email requis'),
    password: Yup.string()
        .min(8, 'Minimum 8 caractères')
        .required('Mot de passe requis'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Les mots de passe doivent correspondre')
        .required('Confirmation requise'),
    displayName: Yup.string()
        .required('Nom affiché requis'),
    termsAccepted: Yup.boolean()
        .oneOf([true], 'Vous devez accepter les conditions'),
});
