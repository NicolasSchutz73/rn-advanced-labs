import { useEffect } from 'react';
import { Stack, usePathname } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <Stack>
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
    );
}
