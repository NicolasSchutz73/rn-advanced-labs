import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Linking, Platform } from 'react-native';

export type PermissionStatus = 'undetermined' | 'granted' | 'denied';

export interface CameraPermissionResult {
  status: PermissionStatus;
  isLoading: boolean;
  requestPermission: () => Promise<boolean>;
  openSettings: () => void;
}

export function useCameraPermission(): CameraPermissionResult {
  const [status, setStatus] = useState<PermissionStatus>('undetermined');
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier le statut au montage
  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    setIsLoading(true);
    try {
      const { status: permissionStatus } = await Camera.getCameraPermissionsAsync();
      setStatus(permissionStatus === 'granted' ? 'granted' : permissionStatus === 'denied' ? 'denied' : 'undetermined');
    } catch (error) {
      console.error('Erreur lors de la vérification de la permission:', error);
      setStatus('undetermined');
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { status: permissionStatus } = await Camera.requestCameraPermissionsAsync();
      const granted = permissionStatus === 'granted';
      setStatus(granted ? 'granted' : 'denied');
      return granted;
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
      setStatus('denied');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  return {
    status,
    isLoading,
    requestPermission,
    openSettings,
  };
}

