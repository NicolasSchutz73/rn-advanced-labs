import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { RobotForm } from '@/components/tp4b-robots-rtk/RobotForm';
import { selectRobots } from '@/features/robots/selectors';
import { updateRobot } from '@/features/robots/robotsSlice';
import { RobotFormValues } from '@/validation/robotSchema';

const EditRobotScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const robots = useSelector(selectRobots);

  // Convertir id en string (useLocalSearchParams peut retourner string | string[])
  const robotId = Array.isArray(id) ? id[0] : id;

  // Trouver le robot dans la liste
  const robot = robotId ? robots.find(r => r.id === robotId) : undefined;

  if (!robotId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>❌ ID manquant</Text>
      </View>
    );
  }

  if (!robot) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>❌ Robot introuvable</Text>
      </View>
    );
  }

  const handleSubmit = async (values: RobotFormValues) => {
    dispatch(updateRobot({ id: robotId, changes: values }));
    router.replace('/tp4b-robots-rtk'); // Retour à la liste
  };

  return (
    <RobotForm
      mode="edit"
      robots={robots}
      initialValues={{ ...robot, id: robotId }}
      onSubmit={handleSubmit}
    />
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
  },
});

export default EditRobotScreen;
