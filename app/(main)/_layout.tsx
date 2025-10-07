import { Tabs } from 'expo-router';

export default function MainLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="tabs/home" options={{ title: 'Accueil' }}
      />
      <Tabs.Screen 
        name="tabs/tp1-profile-card" options={{ title: 'TP1 Profile' }}
      />
      <Tabs.Screen
        name="tp4b-robots-rtk"
        options={{
          title: 'TP4B Robots (RTK)',
          headerShown: false
        }}
      />
      <Tabs.Screen name="detail" options={{ href: null }} />
      <Tabs.Screen name="tp3-forms" options={{ href: null }} />
    </Tabs>
  );
}