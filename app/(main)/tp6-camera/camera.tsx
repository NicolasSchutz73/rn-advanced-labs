import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import { useCameraPermission } from './lib/hooks/useCameraPermission';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
  const { status, isLoading, requestPermission, openSettings } = useCameraPermission();
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (status === 'denied') {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Permission to access camera was denied
        </Text>
        <TouchableOpacity onPress={openSettings} style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>Open Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Permission accordée : afficher la caméra
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        ref={cameraRef}
      >
        <View style={styles.cameraControls}>
          <View style={styles.topControls}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={async () => {
                if (cameraRef.current) {
                  // TODO: Implémenter la capture et sauvegarde de photo
                  console.log('Capture photo - à implémenter');
                }
              }}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topControls: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'flex-end',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomControls: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  settingsButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
