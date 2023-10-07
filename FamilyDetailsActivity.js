import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function FamilyDetailsActivity({ navigation }) {
  const [familyData, setFamilyData] = useState(null);
  const isFocused = useIsFocused(); 


  useEffect(() => {
  
    displayFamilyData();
  }, [isFocused]);

  const displayFamilyData = async () => {
    try {
      const formData = await AsyncStorage.getItem('familyFormData');
      if (formData) {
        const parsedData = JSON.parse(formData);
        setFamilyData(parsedData);
      }
    } catch (error) {
      console.error("Error while saving data");
    }
  };

  const clearFamilyData = async () => {
    try {
      await AsyncStorage.removeItem('familyFormData');
      await AsyncStorage.removeItem('isFamilyDetailsFilled');
      setFamilyData(null);
      Alert.alert('Data Cleared', 'Data has been cleared successfully.', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }, 
      ]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Family Details</Text>
      {familyData ? (
        <View>
          <Text>Name: {familyData.name}</Text>
          <Text>Age: {familyData.age}</Text>
          <Text>Gender: {familyData.gender}</Text>
          <Text>Birthday: {familyData.birthday}</Text>
          <Text>Phone Number: {familyData.phoneNumber}</Text>
          <Text>Relation: {familyData.relation}</Text>

          {familyData.FamilyimageUri && (
            <Image source={{ uri: familyData.FamilyimageUri }} style={styles.image} />
          )}
          <TouchableOpacity style={styles.button} onPress={clearFamilyData}>
            <Text>Clear Data</Text>
          </TouchableOpacity>

        </View>
      ) : (
        <Text>No data available.</Text>
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
    borderRadius: 100,
    marginVertical: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});


