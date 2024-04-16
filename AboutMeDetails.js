//AboutMeDetailsActivity
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function AboutMeDetails() {
  const [userData, setUserData] = useState(null);
 
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      displayUserData();
    }
  }, [isFocused]);


  const handleGoToActivity1 = () => {
    navigation.navigate('AboutMe');
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
      <Text style={styles.heading}>About Me</Text>
      {userData ? (
        <View>
          <Text style={styles.text}>Name: {userData.name}</Text>
          <Text style={styles.text}>Age: {userData.age}</Text>
          <Text style={styles.text}>Gender: {userData.gender}</Text>
          <Text style={styles.text}>Birthday: {userData.birthday}</Text>
          <Text style={styles.text}>Address: {userData.address}</Text>
          <Text style={styles.text}>Phone Number: {userData.phoneNumber}</Text>
          <Text style={styles.text}>Images:</Text>
          {userData.images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
          <TouchableOpacity style={styles.button} onPress={clearUserData}>
            <Text style={styles.buttonText}>Clear Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleFavouritesButtonPress}>
            <Text style={styles.buttonText}>Favourites</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>No data available.</Text>
          <TouchableOpacity style={styles.button} onPress={handleGoToActivity1}>
            <Text style={styles.buttonText}>Go to AboutMe Form</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    ...(Platform.OS === 'web' && {
      minHeight: '100vh',
      backgroundImage: 'none',
    }),
  },
  heading: {
    fontSize: Platform.OS === 'web' ? 28 : 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#333333',
  },
  text: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    marginVertical: 12,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
    color: '#333333',
    fontFamily: 'Arial', // Custom font style
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 12,
    marginHorizontal: 75,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  button: {
    borderWidth: 1,
    borderColor: '#3eadcf',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    backgroundColor: '#abe9cd',
    shadowColor: '#333333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});