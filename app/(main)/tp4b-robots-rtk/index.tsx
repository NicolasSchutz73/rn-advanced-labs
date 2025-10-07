import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectRobots } from '@/features/robots/selectors';
import { deleteRobot } from '@/features/robots/robotsSlice';
import { RobotListItem } from '@/components/tp4b-robots-rtk/RobotListItem';
import { Robot } from '@/model/Robot';

const RobotsListScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const robots = useSelector(selectRobots);

  // Tri par nom (ordre alphabétique)
  const sortedRobots = [...robots].sort((a, b) => a.name.localeCompare(b.name));

  const handleEdit = (id: string) => {
    router.push(`/tp4b-robots-rtk/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteRobot(id));
  };

  const handleCreate = () => {
    router.push('/tp4b-robots-rtk/create');
  };

  return (
    <View style={styles.container}>
      {/* Header avec titre et bouton + */}
      <View style={styles.header}>
        <Text style={styles.title}>Robots ({robots.length})</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleCreate}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des robots */}
      {sortedRobots.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucun robot</Text>
          <Text style={styles.emptySubtext}>Appuyez sur + pour créer un robot</Text>
        </View>
      ) : (
        <FlatList
          data={sortedRobots}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RobotListItem
              robot={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
  },
});

export default RobotsListScreen;

