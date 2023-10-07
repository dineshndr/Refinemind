import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Activity3() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [occasionName, setOccasionName] = useState('');
  const [occasionDate, setOccasionDate] = useState('');
  const [birthdayNumber, setBirthdayNumber] = useState('');
  const [anniversaryNumber, setAnniversaryNumber] = useState('');
  const [isDataFilled, setIsDataFilled] = useState(false);
  const [showSpecialMomentsData, setShowSpecialMomentsData] = useState(false);
  const [specialMomentsData, setSpecialMomentsData] = useState([]);

  // Check if all the data is filled or not
  useEffect(() => {
    if (occasionName && occasionDate && birthdayNumber && anniversaryNumber) {
      setIsDataFilled(true);
    } else {
      setIsDataFilled(false);
    }
  }, [occasionName, occasionDate, birthdayNumber, anniversaryNumber]);

  const handleChooseImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImages([...selectedImages, result.uri]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleSubmitSpecialEvent = () => {
    if (!occasionName || !occasionDate) {
      alert('Please fill in the occasion name and date.');
      return;
    }

    // Handle saving the special event data here, you can use AsyncStorage or any other data storage mechanism.

    // Add the submitted data to the specialMomentsData state
    const newData = {
      type: 'Special Event',
      occasionName: occasionName,
      occasionDate: occasionDate,
      images: selectedImages,
    };
    setSpecialMomentsData([...specialMomentsData, newData]);

    // Reset the form after submission
    setSelectedImages([]);
    setOccasionName('');
    setOccasionDate('');
    setIsDataFilled(false); // Reset data filled state

    alert('Special Event Data saved successfully!');
  };

  const handleSubmitBirthday = () => {
    if (!birthdayNumber || !occasionDate) {
      alert('Please fill in the birthday number and date.');
      return;
    }

    // Handle saving the birthday data here, you can use AsyncStorage or any other data storage mechanism.

    // Add the submitted data to the specialMomentsData state
    const newData = {
      type: 'Birthday',
      birthdayNumber: birthdayNumber,
      occasionDate: occasionDate,
      images: selectedImages,
    };
    setSpecialMomentsData([...specialMomentsData, newData]);

    // Reset the form after submission
    setSelectedImages([]);
    setBirthdayNumber('');
    setOccasionDate('');
    setIsDataFilled(false); // Reset data filled state

    alert('Birthday Data saved successfully!');
  };

  const handleSubmitAnniversary = () => {
    if (!anniversaryNumber || !occasionDate) {
      alert('Please fill in the anniversary number and date.');
      return;
    }

    // Handle saving the anniversary data here, you can use AsyncStorage or any other data storage mechanism.

    // Add the submitted data to the specialMomentsData state
    const newData = {
      type: 'Anniversary',
      anniversaryNumber: anniversaryNumber,
      occasionDate: occasionDate,
      images: selectedImages,
    };
    setSpecialMomentsData([...specialMomentsData, newData]);

    // Reset the form after submission
    setSelectedImages([]);
    setAnniversaryNumber('');
    setOccasionDate('');
    setIsDataFilled(false); // Reset data filled state

    alert('Anniversary Data saved successfully!');
  };

  const handleViewSpecialMoments = () => {
    setShowSpecialMomentsData(!showSpecialMomentsData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Special Moments</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'Events' && styles.selectedOption]}
          onPress={() => setSelectedOption('Events')}
        >
          <Text>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'Birthday' && styles.selectedOption]}
          onPress={() => setSelectedOption('Birthday')}
        >
          <Text>Birthday</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'Anniversaries' && styles.selectedOption]}
          onPress={() => setSelectedOption('Anniversaries')}
        >
          <Text>Anniversaries</Text>
        </TouchableOpacity>
      </View>

      {/* Image Upload */}
      {selectedOption && (
        <View style={styles.imageUploadContainer}>
          <Button title="Choose Image" onPress={handleChooseImage} />
          {selectedImages.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.uploadedImage} />
          ))}
        </View>
      )}

      {/* Occasion Details */}
      {selectedOption === 'Events' && !isDataFilled && (
        <View style={styles.occasionDetailsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Occasion Name"
            value={occasionName}
            onChangeText={setOccasionName}
          />
          <TextInput
            style={styles.input}
            placeholder="Occasion Date"
            value={occasionDate}
            onChangeText={setOccasionDate}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitSpecialEvent}>
            <Text>Submit Special Event</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedOption === 'Birthday' && !isDataFilled && (
        <View style={styles.occasionDetailsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Birthday Number"
            value={birthdayNumber}
            onChangeText={setBirthdayNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Occasion Date"
            value={occasionDate}
            onChangeText={setOccasionDate}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitBirthday}>
            <Text>Submit Birthday</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedOption === 'Anniversaries' && !isDataFilled && (
        <View style={styles.occasionDetailsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Anniversary Number"
            value={anniversaryNumber}
            onChangeText={setAnniversaryNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Occasion Date"
            value={occasionDate}
            onChangeText={setOccasionDate}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAnniversary}>
            <Text>Submit Anniversary</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Special Moments Button */}
      {isDataFilled && selectedOption !== null ? (
        <TouchableOpacity style={styles.specialMomentsButton} onPress={handleViewSpecialMoments}>
          <Text style={styles.specialMomentsButtonText}>
            {showSpecialMomentsData ? 'Hide Special Moments' : 'View Special Moments'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.specialMomentsButton} onPress={handleViewSpecialMoments}>
          <Text style={styles.specialMomentsButtonText}>Special Moments</Text>
        </TouchableOpacity>
      )}

      {/* Display Data */}
      {showSpecialMomentsData && (
        <View style={styles.filledDataContainer}>
          {specialMomentsData.map((data, index) => (
            <View key={index} style={styles.dataItem}>
              <Text style={styles.filledDataText}>Type: {data.type}</Text>
              {data.type === 'Special Event' && (
                <Text style={styles.filledDataText}>Occasion Name: {data.occasionName}</Text>
              )}
              {data.type === 'Birthday' && (
                <Text style={styles.filledDataText}>Birthday Number: {data.birthdayNumber}</Text>
              )}
              {data.type === 'Anniversary' && (
                <Text style={styles.filledDataText}>Anniversary Number: {data.anniversaryNumber}</Text>
              )}
              <Text style={styles.filledDataText}>Occasion Date: {data.occasionDate}</Text>
              {data.images.map((imageUri, imageIndex) => (
                <Image key={imageIndex} source={{ uri: imageUri }} style={styles.uploadedImage} />
              ))}
            </View>
          ))}
        </View>
      )}

      {/* ... (previous code remains unchanged) ... */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
  },
  imageUploadContainer: {
    marginBottom: 20,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  occasionDetailsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  specialMomentsButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  specialMomentsButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  filledDataContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  filledDataText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dataItem: {
    marginBottom: 20,
  },
});
