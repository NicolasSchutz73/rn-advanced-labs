import React, { useRef } from 'react';
import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
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
  const typeRef = useRef<TextInput>(null);

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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        {/* Champ name */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Nom du robot"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="next"
              onSubmitEditing={() => labelRef.current?.focus()}
              style={{ borderColor: errors.name || nameExists ? 'red' : '#ccc', borderWidth: 1, marginBottom: 8, padding: 8 }}
              autoCapitalize="none"
            />
          )}
        />
        {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
        {nameExists && <Text style={{ color: 'red' }}>Ce nom existe déjà.</Text>}

        {/* Champ label */}
        <Controller
          control={control}
          name="label"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={labelRef}
              placeholder="Label du robot"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="next"
              onSubmitEditing={() => yearRef.current?.focus()}
              style={{ borderColor: errors.label ? 'red' : '#ccc', borderWidth: 1, marginBottom: 8, padding: 8 }}
              autoCapitalize="none"
            />
          )}
        />
        {errors.label && <Text style={{ color: 'red' }}>{errors.label.message}</Text>}

        {/* Champ year */}
        <Controller
          control={control}
          name="year"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={yearRef}
              placeholder="Année"
              value={value ? String(value) : ''}
              onChangeText={text => onChange(Number(text))}
              onBlur={onBlur}
              keyboardType="number-pad"
              returnKeyType="next"
              onSubmitEditing={() => typeRef.current?.focus()}
              style={{ borderColor: errors.year ? 'red' : '#ccc', borderWidth: 1, marginBottom: 8, padding: 8 }}
            />
          )}
        />
        {errors.year && <Text style={{ color: 'red' }}>{errors.year.message}</Text>}

        {/* Champ type (enum) */}
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={{ marginBottom: 4 }}>Type :</Text>
              {robotTypes.map(t => (
                <Text
                  key={t}
                  onPress={() => onChange(t)}
                  style={{
                    padding: 8,
                    backgroundColor: value === t ? '#007AFF' : '#eee',
                    color: value === t ? 'white' : 'black',
                    marginBottom: 4,
                    borderRadius: 4,
                  }}
                >
                  {t}
                </Text>
              ))}
            </View>
          )}
        />
        {errors.type && <Text style={{ color: 'red' }}>{errors.type.message}</Text>}

        {/* Bouton submit */}
        <Button
          title={mode === 'create' ? 'Créer' : 'Modifier'}
          onPress={handleSubmit(submitHandler)}
          disabled={!isValid || nameExists}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
