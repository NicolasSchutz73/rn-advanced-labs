import { useEffect } from 'react';
import { Stack, usePathname } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

export default function RootLayout() {
    const pathname = usePathname();

    useEffect(() => {
        const saveCurrentRoute = async () => {
            try {
                if (pathname !== '/') {
                    await AsyncStorage.setItem('lastRoute', pathname);
                }
            } catch (error) {
                console.warn('Failed to save route:', error);
            }
        };

        saveCurrentRoute();
    }, [pathname]);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Stack>
                    <Stack.Screen name="(main)" options={{ headerShown: false }} />
                </Stack>
            </PersistGate>
        </Provider>
    );
}
