import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { FormData, validationSchema } from './validation/schema';

export default function SimpleForm() {
    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            displayName: '',
            termsAccepted: false,
        },
        mode: 'onChange',
    });

    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (data: FormData) => {
        setSubmitted(true);
        reset();
    };

    return (
        <View style={styles.container}>
            {submitted && (
                <Text style={styles.success}>Formulaire envoyé avec succès !</Text>
            )}
            <Text style={styles.label}>Email</Text>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Text style={styles.label}>Mot de passe</Text>
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
            />
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

            <Text style={styles.label}>Nom affiché</Text>
            <Controller
                control={control}
                name="displayName"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
            />
            {errors.displayName && <Text style={styles.error}>{errors.displayName.message}</Text>}

            <Controller
                control={control}
                name="termsAccepted"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.termsRow}>
                        <Button
                            title={value ? "✓" : "☐"}
                            onPress={() => onChange(!value)}
                        />
                        <Text style={styles.termsText}>J'accepte les conditions</Text>
                    </View>
                )}
            />
            {errors.termsAccepted && <Text style={styles.error}>{errors.termsAccepted.message}</Text>}

            <Button title="Envoyer" onPress={handleSubmit(onSubmit)} color="#007AFF" disabled={!isValid} />
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        color: '#007AFF',
        fontWeight: 'bold',
        marginBottom: 4,
        marginLeft: 2,
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    error: {
        color: '#d00',
        marginBottom: 8,
    },
    success: {
        color: '#007A33',
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    termsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    termsText: {
        marginLeft: 8,
    },
});