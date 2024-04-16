import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity, StyleSheet , Platform, isTablet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext';

export default function Family({ navigation }) {
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
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Platform.OS === 'web' ? '#f7f7f7' : '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: Platform.OS === 'web' ? '#333' : '#007AFF',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputItem: {
    flex: 1,
    marginRight: isTablet ? 10 : 5,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  selectImageButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  selectImageButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  imagesContainer: {
    flexDirection: isTablet ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: isTablet ? 160 : 210,
    height: isTablet ? 160 : 210,
    borderRadius: 10,
    margin: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  Adressinput: {
    width: '50%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  Phoneinput: {
    width: '50%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  datePickerButton: {
    width: '48%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  datePickerText: {
    color: '#000',
    fontSize: 16,
  },
});
