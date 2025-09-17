import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileCard() {
  const [followers, setFollowers] = useState(1000);
  const [isFollowing, setIsFollowing] = useState(false);

  const incrementFollowers = () => {
    setFollowers((prevFollowers) => prevFollowers + 1);
  };

  useEffect(() => {
    const interval = setInterval(incrementFollowers, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowers(followers - 1);
    } else {
      setFollowers(followers + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/99.jpg' }}
        style={styles.image}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.title}>React Native Developer</Text>
      <TouchableOpacity style={styles.button} onPress={handleFollow}>
        <Text style={styles.buttonText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
      </TouchableOpacity>
      <Text style={styles.followers}>{followers.toLocaleString()} followers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  followers: {
    fontSize: 16,
    color: 'gray',
  },
});
