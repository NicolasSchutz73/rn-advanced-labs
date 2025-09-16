import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileCard from '../components/ProfileCard';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <ProfileCard />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
});