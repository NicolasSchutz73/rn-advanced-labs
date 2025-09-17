import { useRobotsStore } from '@/store/robotsStore';
import { Robot, robotSchema } from '@/validation/robotSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Haptics from 'expo-haptics';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

type RobotInput = Omit<Robot, 'id'>;

const types = ['industrial', 'service', 'medical', 'educational', 'other'];

export function RobotForm({
  defaultValues,
  onSubmit,
  submitLabel = 'Valider',
  excludeNameUniqueness = false,
}: {
  defaultValues?: Partial<RobotInput>;
  onSubmit: (data: RobotInput) => Promise<boolean> | boolean;
  submitLabel?: string;
  excludeNameUniqueness?: boolean; // pour édition, exclure le robot courant
}) {
  const nameRef = useRef<TextInput>(null);
  const labelRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  const robots = useRobotsStore(store => store.robots);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const { control, handleSubmit, formState: { errors, isValid }, watch } = 
  useForm<RobotInput>
  ({
    resolver: zodResolver(robotSchema.omit({ id: true })),
    defaultValues,
    mode: 'onChange'
  });  

  // Validation unicité du name
  const nameValue = watch('name');
  const isNameUnique = excludeNameUniqueness || !robots.some( robot => robot.name === nameValue && (!defaultValues?.name || robot.name !== defaultValues.name));

  const submitHandler = async (data: RobotInput) => {
    if (!isNameUnique) {
      setFeedback({ type: 'error', message: 'Nom déjà utilisé.' });
      if (Platform.OS === 'ios') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    const ok = await onSubmit(data);
    if (ok) {
      setFeedback({ type: 'success', message: 'Robot enregistré !' });
      if (Platform.OS === 'ios') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      setFeedback({ type: 'error', message: 'Erreur lors de l\'enregistrement.' });
      if (Platform.OS === 'ios') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.kav}>
      <View style={styles.container}>
        {feedback && (
          <Text style={feedback.type === 'success' ? styles.success : styles.error}>
            {feedback.message}
          </Text>
        )}

        <Text style={styles.label}>Nom</Text>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              ref={nameRef}
              style={styles.input}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              returnKeyType="next"
              onSubmitEditing={() => labelRef.current?.focus()}
              autoCapitalize="none"
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
        {!isNameUnique && <Text style={styles.error}>Nom déjà utilisé.</Text>}

        <Text style={styles.label}>Label</Text>
        <Controller
          control={control}
          name="label"
          render={({ field }) => (
            <TextInput
              ref={labelRef}
              style={styles.input}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              returnKeyType="next"
              onSubmitEditing={() => yearRef.current?.focus()}
            />
          )}
        />
        {errors.label && <Text style={styles.error}>{errors.label.message}</Text>}

        <Text style={styles.label}>Année</Text>
        <Controller
          control={control}
          name="year"
          render={({ field }) => (
            <TextInput
              ref={yearRef}
              style={styles.input}
              value={field.value ? String(field.value) : ''}
              onChangeText={v => field.onChange(Number(v.replace(/[^0-9]/g, '')))}
              onBlur={field.onBlur}
              keyboardType="numeric"
              returnKeyType="done"
            />
          )}
        />
        {errors.year && <Text style={styles.error}>{errors.year.message}</Text>}

        <Text style={styles.label}>Type</Text>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <View style={styles.typesRow}>
              {types.map(t => (
                <Button
                  key={t}
                  title={t}
                  color={field.value === t ? '#007AFF' : '#ccc'}
                  onPress={() => field.onChange(t)}
                />
              ))}
            </View>
          )}
        />
        {errors.type && <Text style={styles.error}>{errors.type.message}</Text>}

        <Button
          title={submitLabel}
          onPress={handleSubmit(submitHandler)}
          color="#007AFF"
          disabled={!isValid || !isNameUnique}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kav: { flex: 1 },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 16,
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 2,
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
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 10,
  },
});