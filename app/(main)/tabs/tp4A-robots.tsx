import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Exemple de données robots
const initialRobots = [
  { id: '1', name: 'R2-D2', type: 'Astromech', year: 1977 },
  { id: '2', name: 'Wall-E', type: 'Waste Allocation', year: 2008 },
  { id: '3', name: 'C-3PO', type: 'Protocol', year: 1977 },
  { id: '4', name: 'T-800', type: 'Terminator', year: 1984 },
];

export default function RobotsListScreen() {
  const [robots, setRobots] = useState(initialRobots);
  const router = useRouter();

  // Suppression avec confirmation
  const remove = (id: string) => {
    Alert.alert(
      'Supprimer le robot',
      'Êtes-vous sûr de vouloir supprimer ce robot ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setRobots(prev => prev.filter(r => r.id !== id));
            Alert.alert('Robot supprimé');
          },
        },
      ]
    );
  };

  // Tri par nom
  const sortedRobots = [...robots].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des robots</Text>
      <FlatList
        data={sortedRobots}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.robotItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.robotName}>{item.name}</Text>
              <Text style={styles.robotType}>{item.type}</Text>
              <Text style={styles.robotYear}>Année : {item.year}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => router.push(`/tp4A-robots/edit/${item.id}`)}
              >
                <Ionicons name="create-outline" size={22} color="#1B73E8" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => remove(item.id)}
              >
                <Ionicons name="trash-outline" size={22} color="#E81B1B" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>Aucun robot</Text>}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/tp4A-robots/create')}
        accessibilityLabel="Ajouter un robot"
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  robotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  robotName: { fontSize: 18, fontWeight: '500' },
  robotType: { fontSize: 14, color: '#555' },
  robotYear: { fontSize: 14, color: '#666' },
  actions: { flexDirection: 'row', marginLeft: 8 },
  actionBtn: { marginHorizontal: 4, padding: 4 },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#1B73E8',
    borderRadius: 32,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});