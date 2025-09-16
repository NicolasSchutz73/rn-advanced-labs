import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const getInitialRoute = async () => {
      try {
        const savedRoute = await AsyncStorage.getItem('lastRoute');
        setInitialRoute(savedRoute || 'tabs/home');
      } catch {
        setInitialRoute('tabs/home');
      }
    };
    
    getInitialRoute();
  }, []);

  if (initialRoute === null) {
    return null; // ou un écran de loading
  }

  return <Redirect href={initialRoute} />;
}

