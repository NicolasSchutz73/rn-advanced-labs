import { Stack } from 'expo-router';

export default function RobotsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Liste des Robots',
          headerBackTitle: 'Retour'
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: 'Créer un Robot',
          headerBackTitle: 'Retour'
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          title: 'Modifier un Robot',
          headerBackTitle: 'Retour'
        }}
      />
    </Stack>
  );
}

