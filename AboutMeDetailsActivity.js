//AboutMeDetailsActivity
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function AboutMeDetailsActivity() {
  const [userData, setUserData] = useState(null);
 
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      displayUserData();
    }
  }, [isFocused]);


  const handleGoToActivity1 = () => {
    navigation.navigate('Activity1');
  };

  
  const displayUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUserData(null);
      Alert.alert('Data Cleared', 'User data has been cleared successfully.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  const handleFavouritesButtonPress = async () => {
    // Check if favourites data is filled directly from AsyncStorage
    const isFavouritesDataFilled = await checkFavouritesDataFilled();

    if (isFavouritesDataFilled) {
      navigation.navigate('FavouritesDisplay');
    } else {
      navigation.navigate('FavouritesForm');
    }
  };

  // Helper function to check if favourites data is filled
  const checkFavouritesDataFilled = async () => {
    try {
      const storedFavouritesData = await AsyncStorage.getItem('favouritesData');
      return !!storedFavouritesData; // Returns true if data is present, otherwise false
    } catch (error) {
      console.error('Error checking if favourites data is filled:', error);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Me Details</Text>
      {userData ? (
        <View>
          <Text>Name: {userData.name}</Text>
          <Text>Age: {userData.age}</Text>
          <Text>Gender: {userData.gender}</Text>
          <Text>Birthday: {userData.birthday}</Text>
          <Text>Address: {userData.address}</Text>
          <Text>Phone Number: {userData.phoneNumber}</Text>
          <Text>Images:</Text>
          {userData.images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
          <TouchableOpacity style={styles.button} onPress={clearUserData}>
            <Text>Clear Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleFavouritesButtonPress}>
            <Text>Favourites</Text>
          </TouchableOpacity>
          
        </View>
      ) : (
        <View>
          <Text>No data available.</Text>
          <TouchableOpacity style={styles.button} onPress={handleGoToActivity1}>
            <Text>Go to Activity1</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    
  },
});
