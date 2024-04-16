import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

export default function AboutMe({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [images, setImages] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control visibility of date picker
  const { setUserDetails, setUserImages } = useContext(UserContext);

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
      navigation.navigate('AboutMeDetails');
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
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerText}>{birthday.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false); // Close the date picker
            if (selectedDate) {
              setBirthday(selectedDate);
            }
          }}
        />
      )}
      <TextInput
        style={styles.Adressinput}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.Phoneinput}
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
      <Button style={styles.button} title="Submit" type="submit" onPress={saveData} />
    </ScrollView>
  );
}

const isTablet = Dimensions.get('window').width > 600;

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
