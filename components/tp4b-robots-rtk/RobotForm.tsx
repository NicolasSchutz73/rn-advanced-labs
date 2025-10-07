import React, { useRef } from 'react';
import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { robotSchema, RobotFormValues, robotTypes } from '@/validation/robotSchema';

interface RobotFormProps {
  initialValues?: (Partial<RobotFormValues> & { id?: string });
  onSubmit: (values: RobotFormValues) => Promise<void> | void;
  robots: { name: string; id: string }[];
  mode: 'create' | 'edit';
}

export const RobotForm: React.FC<RobotFormProps> = ({ initialValues = {}, onSubmit, robots, mode }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RobotFormValues>({
    resolver: zodResolver(robotSchema),
    defaultValues: {
      name: initialValues.name || '',
      label: initialValues.label || '',
      year: initialValues.year || new Date().getFullYear(),
      type: initialValues.type || robotTypes[0],
    },
    mode: 'onChange',
  });

  // Réfs pour navigation entre champs
  const labelRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  // Vérification unicité du nom
  const nameValue = watch('name');
  const nameExists = robots.some(
    r => r.name === nameValue && (mode === 'create' || r.id !== initialValues.id)
  );

  const submitHandler = async (data: RobotFormValues) => {
    if (nameExists) {
      Alert.alert('Erreur', 'Le nom du robot doit être unique.');
      return;
    }
    try {
      await onSubmit(data);
      Alert.alert('Succès', mode === 'create' ? 'Robot créé !' : 'Robot modifié !');
    } catch (e: any) {
      Alert.alert('Erreur', e.message || 'Une erreur est survenue');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.form}>
        {/* Champ name */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nom du robot *</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Ex: R2D2"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={() => labelRef.current?.focus()}
                style={[styles.input, (errors.name || nameExists) && styles.inputError]}
                autoCapitalize="none"
                accessibilityLabel="Nom du robot"
                accessibilityHint="Entrez le nom du robot (minimum 2 caractères)"
              />
            )}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
          {nameExists && <Text style={styles.errorText}>Ce nom existe déjà.</Text>}
        </View>

        {/* Champ label */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Label du robot *</Text>
          <Controller
            control={control}
            name="label"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={labelRef}
                placeholder="Ex: Droïde astromécano"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={() => yearRef.current?.focus()}
                style={[styles.input, errors.label && styles.inputError]}
                autoCapitalize="none"
                accessibilityLabel="Label du robot"
                accessibilityHint="Entrez le label descriptif du robot (minimum 3 caractères)"
              />
            )}
          />
          {errors.label && <Text style={styles.errorText}>{errors.label.message}</Text>}
        </View>

        {/* Champ year */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Année de fabrication *</Text>
          <Controller
            control={control}
            name="year"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={yearRef}
                placeholder={`Ex: ${new Date().getFullYear()}`}
                value={value ? String(value) : ''}
                onChangeText={text => onChange(Number(text))}
                onBlur={onBlur}
                keyboardType="number-pad"
                returnKeyType="done"
                style={[styles.input, errors.year && styles.inputError]}
                accessibilityLabel="Année de fabrication"
                accessibilityHint={`Entrez l'année entre 1950 et ${new Date().getFullYear()}`}
              />
            )}
          />
          {errors.year && <Text style={styles.errorText}>{errors.year.message}</Text>}
        </View>

        {/* Champ type (enum) */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Type de robot *</Text>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <View style={styles.typeContainer}>
                {robotTypes.map(t => (
                  <Text
                    key={t}
                    onPress={() => onChange(t)}
                    style={[
                      styles.typeOption,
                      value === t && styles.typeOptionSelected
                    ]}
                    accessibilityLabel={`Type ${t}`}
                    accessibilityRole="button"
                    accessibilityState={{ selected: value === t }}
                  >
                    {t}
                  </Text>
                ))}
              </View>
            )}
          />
          {errors.type && <Text style={styles.errorText}>{errors.type.message}</Text>}
        </View>

        {/* Bouton submit */}
        <Button
          title={mode === 'create' ? 'Créer le robot' : 'Modifier le robot'}
          onPress={handleSubmit(submitHandler)}
          disabled={!isValid || nameExists}
          accessibilityLabel={mode === 'create' ? 'Créer le robot' : 'Modifier le robot'}
          accessibilityHint={!isValid || nameExists ? 'Le formulaire contient des erreurs' : 'Appuyez pour soumettre'}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#dc3545',
    borderWidth: 2,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 4,
  },
  typeContainer: {
    gap: 8,
  },
  typeOption: {
    padding: 12,
    backgroundColor: '#eee',
    color: '#333',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  typeOptionSelected: {
    backgroundColor: '#007AFF',
    color: '#fff',
  },
});
