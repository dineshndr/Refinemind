import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext';

export default function Activity1({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [images, setImages] = useState([]);
  const { setUserDetails, setUserImages } = useContext(UserContext); // Use the context functions

  const chooseImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImages(prevImages => [...prevImages, result.uri]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const saveData = async () => {
    try {
      const userData = {
        name,
        age,
        gender,
        birthday,
        address,
        phoneNumber,
        images,
      };

      await AsyncStorage.setItem('isUserDetailsFilled', 'true');
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUserDetails(userData);
      navigation.navigate('AboutMeDetailsActivity');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About Me</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputItem}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputItem}>
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputItem}>
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={(text) => setGender(text)}
          />
        </View>
        <View style={styles.inputItem}>
          <TextInput
            style={styles.input}
            placeholder="Birthday"
            value={birthday}
            onChangeText={(text) => setBirthday(text)}
          />
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.selectImageButton} onPress={chooseImage}>
        <Text style={styles.selectImageButtonText}>Select Images</Text>
      </TouchableOpacity>
      <View style={styles.imagesContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </View>
      <Button title="Submit" onPress={saveData} />
    </ScrollView>
  );
}

const isTablet = Dimensions.get('window').width > 600;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent:'center',
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputItem: {
    flex: 1,
    marginRight: 10, // Add spacing between fields
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 10, // Add spacing below fields
  },
  selectImageButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  selectImageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imagesContainer: {
    flexDirection: isTablet ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10, // Add spacing above images
  },
  image: {
    width: isTablet ? 150 : 200,
    height: isTablet ? 150 : 200,
    borderRadius: 8,
    margin: 5,
  },
});