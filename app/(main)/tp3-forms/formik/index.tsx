import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { validationSchema } from './validation/schema';

export default function TP3FormikForm() {
    const passwordRef = useRef<TextInput>(null);
    const confirmRef = useRef<TextInput>(null);
    const displayNameRef = useRef<TextInput>(null);
    const [submitted, setSubmitted] = useState(false);

    return (
        <Formik
            initialValues={{ email: '', password: '', confirmPassword: '', displayName: '', termsAccepted: false }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                setSubmitted(true);
                resetForm();
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched, isValid }) => (
                <View style={styles.container}>
                    {submitted && (
                        <Text style={styles.success}>Formulaire envoyé avec succès !</Text>
                    )}
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                    {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput
                        ref={passwordRef}
                        style={styles.input}
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        returnKeyType="next"
                        onSubmitEditing={() => confirmRef.current?.focus()}
                    />
                    {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                    <Text style={styles.label}>Confirmer le mot de passe</Text>
                    <TextInput
                        ref={confirmRef}
                        style={styles.input}
                        secureTextEntry
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        returnKeyType="next"
                        onSubmitEditing={() => displayNameRef.current?.focus()}
                    />
                    {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

                    <Text style={styles.label}>Nom affiché</Text>
                    <TextInput
                        ref={displayNameRef}
                        style={styles.input}
                        onChangeText={handleChange('displayName')}
                        onBlur={handleBlur('displayName')}
                        value={values.displayName}
                        returnKeyType="done"
                    />
                    {touched.displayName && errors.displayName && <Text style={styles.error}>{errors.displayName}</Text>}

                    <View style={styles.termsRow}>
                        <Button
                            title={values.termsAccepted ? "✓" : "☐"}
                            onPress={() => {
                                setFieldTouched('termsAccepted', true);
                                setFieldValue('termsAccepted', !values.termsAccepted);
                            }}
                        />
                        <Text style={styles.termsText}>J'accepte les conditions</Text>
                    </View>
                    {touched.termsAccepted && errors.termsAccepted && <Text style={styles.error}>{errors.termsAccepted}</Text>}

                    <Button
                        title="Envoyer"
                        onPress={() => {
                            setFieldTouched('termsAccepted', true);
                            handleSubmit();
                        }}
                        color="#007AFF"
                        disabled={!isValid}
                    />
                </View>
            )}
        </Formik>
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