import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext';

export default function Activity2({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [relation, setRelation] = useState('');
  const [FamilyimageUri, setFamilyImageUri] = useState(null);
  const { familyDetails, setFamilyDetails } = useContext(UserContext);

  useEffect(() => {
    getPermissions();
    displaySavedData();
  }, []);

  const getPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: cameraRollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || cameraRollStatus !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera and gallery permissions to continue.');
    }
  };

  const displaySavedData = async () => {
    try {
      const formData = await AsyncStorage.getItem('familyFormData');
      if (formData) {
        const parsedData = JSON.parse(formData);
        setName(parsedData.name);
        setAge(parsedData.age);
        setGender(parsedData.gender);
        setBirthday(parsedData.birthday);
        setAddress(parsedData.address);
        setPhoneNumber(parsedData.phoneNumber);
        setRelation(parsedData.relation);
        setFamilyImageUri(parsedData.FamilyimageUri);
      }
    } catch (error) {
      console.error("Error while saving Data");
    }
  };

  const chooseImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setFamilyImageUri(result.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const saveFormData = async () => {
    try {
      const formData = {
        name,
        age,
        gender,
        birthday,
        address,
        phoneNumber,
        relation,
        FamilyimageUri,
      };
      await AsyncStorage.setItem('familyFormData', JSON.stringify(formData));
      await AsyncStorage.setItem('isFamilyDetailsFilled', 'true');
      Alert.alert('Data Saved', 'Data has been saved successfully.');
      setFamilyDetails(formData);
      navigation.navigate('FamilyDetailsActivity');
    } catch (error) {
      console.error("Error while saving Data");
      Alert.alert('Error', 'An error occurred while saving data.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Family Form</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="Gender"
          value={gender}
          onChangeText={(text) => setGender(text)}
        />
        <TextInput
          style={[styles.input, styles.halfWidth]}
          placeholder="Birthday"
          value={birthday}
          onChangeText={(text) => setBirthday(text)}
        />
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
      <TextInput
        style={styles.input}
        placeholder="Relation"
        value={relation}
        onChangeText={(text) => setRelation(text)}
      />
      <TouchableOpacity style={styles.imageButton} onPress={chooseImage}>
        <Text style={styles.selectImageButtonText}>Select Image</Text>
      </TouchableOpacity>
      {FamilyimageUri && <Image source={{ uri: FamilyimageUri }} style={styles.image} />}
      <Button title="Submit" onPress={saveFormData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 20,
  },
  imageButton: {
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
});
