// FavouritesForm.js
import React, { useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity,TextInput, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function FavouritesForm() {
  const [songName, setSongName] = useState('');
  const [songImageUri, setSongImageUri] = useState(null);
  const [artistName, setArtistName] = useState('');
  const [artistImageUri, setArtistImageUri] = useState(null);
  const [movieName, setMovieName] = useState('');
  const [movieImageUri, setMovieImageUri] = useState(null);

  const navigation = useNavigation();

  const chooseImage = async (imageStateSetter) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        imageStateSetter(result.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const saveFavouriteData = async () => {
    try {
      const newFavourite = {
        songName,
        songImageUri,
        artistName,
        artistImageUri,
        movieName,
        movieImageUri,
      };
  
      // Retrieve existing favourites data
      const existingData = await AsyncStorage.getItem('favouritesData');
      const parsedData = existingData ? JSON.parse(existingData) : [];
  
      // Add the new favourite to the existing data
      const updatedData = [...parsedData, newFavourite];
  
      // Save the updated favourites data to AsyncStorage
      await AsyncStorage.setItem('favouritesData', JSON.stringify(updatedData));
  
      // Clear form fields after saving
      setSongName('');
      setSongImageUri(null);
      setArtistName('');
      setArtistImageUri(null);
      setMovieName('');
      setMovieImageUri(null);
  
      // Redirect to FavouritesDisplay
      navigation.navigate('FavouritesDisplay');
    } catch (error) {
      console.error('Error while saving favourites data:', error);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Favourites Form</Text>
      
      <Text>Song Name</Text>
      <TextInput
        style={styles.input}
        value={songName}
        onChangeText={setSongName}
      />
      <TouchableOpacity style={styles.imageButton} onPress={() => chooseImage(setSongImageUri)}>
        <Text>Select Song Image</Text>
      </TouchableOpacity>
      {songImageUri && <Image source={{ uri: songImageUri }} style={styles.image} />}
      
      <Text>Artist Name</Text>
      <TextInput
        style={styles.input}
        value={artistName}
        onChangeText={setArtistName}
      />
      <TouchableOpacity style={styles.imageButton} onPress={() => chooseImage(setArtistImageUri)}>
        <Text>Select Artist Image</Text>
      </TouchableOpacity>
      {artistImageUri && <Image source={{ uri: artistImageUri }} style={styles.image} />}
      
      <Text>Movie Name</Text>
      <TextInput
        style={styles.input}
        value={movieName}
        onChangeText={setMovieName}
      />
      <TouchableOpacity style={styles.imageButton} onPress={() => chooseImage(setMovieImageUri)}>
        <Text>Select Movie Image</Text>
      </TouchableOpacity>
      {movieImageUri && <Image source={{ uri: movieImageUri }} style={styles.image} />}
      
      <Button title="Submit" onPress={saveFavouriteData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  imageButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

