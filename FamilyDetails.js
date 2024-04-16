import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function FamilyDetails({ navigation }) {
  const [familyData, setFamilyData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    displayFamilyData();
  }, [isFocused]);

  const displayFamilyData = async () => {
    try {
      const formData = await AsyncStorage.getItem('familyFormData');
      if (formData) {
        const parsedData = JSON.parse(formData);
        setFamilyData(prevData => [...prevData, parsedData]);
      }
    } catch (error) {
      console.error('Error while fetching family data:', error);
    }
  };

  const clearFamilyData = async () => {
    try {
      await AsyncStorage.removeItem('familyFormData');
      await AsyncStorage.removeItem('isFamilyDetailsFilled');
      setFamilyData([]);
      Alert.alert('Data Cleared', 'Data has been cleared successfully.', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } catch (error) {
      console.error('Error clearing family data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Family Details</Text>
      {familyData.length > 0 ? (
        familyData.map((family, index) => (
          <View key={index} style={styles.familyMember}>
            <Text>Name: {family.name}</Text>
            <Text>Age: {family.age}</Text>
            <Text>Gender: {family.gender}</Text>
            <Text>Birthday: {family.birthday}</Text>
            <Text>Phone Number: {family.phoneNumber}</Text>
            <Text>Relation: {family.relation}</Text>

            {family.FamilyimageUri && (
              <Image source={{ uri: family.FamilyimageUri }} style={styles.image} />
            )}
          </View>
        ))
      ) : (
        <Text>No family data available.</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={clearFamilyData}>
        <Text>Clear Data</Text>
      </TouchableOpacity>
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
  familyMember: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
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
