import { useRobotsStore } from '@/store/robotsStore';
import { Robot } from '@/validation/robotSchema';
import { useRouter } from 'expo-router';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export function RobotListItem({ robot }: { robot: Robot }) {
  const router = useRouter();
  const remove = useRobotsStore(s => s.remove);

  const handleDelete = () => {
    Alert.alert(
      'Supprimer',
      `Supprimer le robot "${robot.name}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await remove(robot.id);
            // Optionnel : feedback haptique ou toast
          },
        },
      ]
    );
  };

  return (
    <View style={styles.item}>
      <Text style={styles.name}>{robot.name}</Text>
      <Text>{robot.type} • {robot.year}</Text>
      <View style={styles.actions}>
        <Button title="Éditer" onPress={() => router.push(`/tp4A-robots/edit/${robot.id}`)} />
        <Button title="Supprimer" color="#d00" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { padding: 12, marginBottom: 8, backgroundColor: '#fff', borderRadius: 8 },
  name: { fontWeight: 'bold', fontSize: 18 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 6 },
});