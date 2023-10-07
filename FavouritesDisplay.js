// FavouritesDisplay.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavouritesDisplay() {
  const [favouritesData, setFavouritesData] = useState([]);

  useEffect(() => {
    displayFavouritesData();
  }, []);

  const displayFavouritesData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('favouritesData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setFavouritesData(parsedData);
      }
    } catch (error) {
      console.error('Error while getting favourites data:', error);
    }
  };

  const clearFavouritesData = async () => {
    try {
      await AsyncStorage.removeItem('favouritesData');
      setFavouritesData([]);
      Alert.alert('Data Cleared', 'Favourites data has been cleared successfully.');
    } catch (error) {
      console.error('Error clearing favourites data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Favourites Display</Text>
      {favouritesData.length > 0 ? (
        <View>
          {favouritesData.map((item, index) => (
            <View key={index} style={styles.favouriteItem}>
              <Text>Song Name: {item.songName}</Text>
              {item.songImageUri && <Image source={{ uri: item.songImageUri }} style={styles.image} />}
              <Text>Artist Name: {item.artistName}</Text>
              {item.artistImageUri && <Image source={{ uri: item.artistImageUri }} style={styles.image} />}
              <Text>Movie Name: {item.movieName}</Text>
              {item.movieImageUri && <Image source={{ uri: item.movieImageUri }} style={styles.image} />}
            </View>
          ))}
          <TouchableOpacity style={styles.clearButton} onPress={clearFavouritesData}>
            <Text>Clear Data</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>No favourites data available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  favouriteItem: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  clearButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
