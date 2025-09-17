import { Tabs } from 'expo-router';

export default function MainLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="tabs/home" options={{ title: 'Accueil' }}/>
      <Tabs.Screen name="tabs/tp1-profile-card" options={{ title: 'TP1 Profile' }}/>
      <Tabs.Screen name="tabs/tp4A-robots" options={{ title: 'TP4 Robots' }} />

      {/* Les écrans suivants ne sont pas des onglets, on les masque */}
      <Tabs.Screen name="detail/[id]" options={{ href: null }} />
      <Tabs.Screen name="tp3-forms/rhf/index" options={{ href: null }} />
      <Tabs.Screen name="tp3-forms/formik/index" options={{ href: null }} />
      <Tabs.Screen name="tp4A-robots/create" options={{ href: null }} />
    </Tabs>
  );
}