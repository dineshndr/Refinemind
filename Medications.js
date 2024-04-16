import React, { useState, useEffect,useContext } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext';

export default function Medications() {
  const [morningMedications, setMorningMedications] = useState([]);
  const [noonMedications, setNoonMedications] = useState([]);
  const [nightMedications, setNightMedications] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const { medicineDetails, setMedicineDetails } = useContext(UserContext);

  
  useEffect(() => {
    const loadMedications = async () => {
      try {
        const morningMeds = await AsyncStorage.getItem('morningMedications');
        const noonMeds = await AsyncStorage.getItem('noonMedications');
        const nightMeds = await AsyncStorage.getItem('nightMedications');

        if (morningMeds) setMorningMedications(JSON.parse(morningMeds));
        if (noonMeds) setNoonMedications(JSON.parse(noonMeds));
        if (nightMeds) setNightMedications(JSON.parse(nightMeds));
      } catch (error) {
        console.log('Error loading medications from AsyncStorage:', error);
      }
    };

    loadMedications();
  }, []);

  
  useEffect(() => {
    const saveMedications = async () => {
      try {
        await AsyncStorage.setItem('morningMedications', JSON.stringify(morningMedications));
        await AsyncStorage.setItem('noonMedications', JSON.stringify(noonMedications));
        await AsyncStorage.setItem('nightMedications', JSON.stringify(nightMedications));
        setMedicineDetails({
          morningMedications: morningMedications,
          noonMedications: noonMedications,
          nightMedications: nightMedications,
        });
      } catch (error) {
        console.log('Error saving medications to AsyncStorage:', error);
      }
    };

    if (submitted) {
      saveMedications();
    }
  }, [morningMedications, noonMedications, nightMedications, submitted]);

  const addMedication = (timing) => {
    if (timing === 'Morning') {
      setMorningMedications((prevMedications) => [...prevMedications, { name: '' }]);
    } else if (timing === 'Noon') {
      setNoonMedications((prevMedications) => [...prevMedications, { name: '' }]);
    } else if (timing === 'Night') {
      setNightMedications((prevMedications) => [...prevMedications, { name: '' }]);
    }
  };

  const handleMedicationChange = (timing, index, name) => {
    if (timing === 'Morning') {
      setMorningMedications((prevMedications) => {
        const updatedMedications = [...prevMedications];
        updatedMedications[index].name = name;
        return updatedMedications;
      });
    } else if (timing === 'Noon') {
      setNoonMedications((prevMedications) => {
        const updatedMedications = [...prevMedications];
        updatedMedications[index].name = name;
        return updatedMedications;
      });
    } else if (timing === 'Night') {
      setNightMedications((prevMedications) => {
        const updatedMedications = [...prevMedications];
        updatedMedications[index].name = name;
        return updatedMedications;
      });
    }
  };

  const renderMedications = (timing, medications, setMedications) => {
    return medications.map((medication, index) => (
      <View key={index} style={styles.medicationRow}>
        <TextInput
          style={styles.input}
          placeholder={`Medication ${timing} ${index + 1}`}
          value={medication.name}
          onChangeText={(text) => handleMedicationChange(timing, index, text)}
        />
      </View>
    ));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setMedicineDetails({
      morningMedications: morningMedications,
      noonMedications: noonMedications,
      nightMedications: nightMedications,
    });
  };

  const handleClear = async () => {
    try {
      await AsyncStorage.removeItem('morningMedications');
      await AsyncStorage.removeItem('noonMedications');
      await AsyncStorage.removeItem('nightMedications');
      setMorningMedications([]);
      setNoonMedications([]);
      setNightMedications([]);
      setSubmitted(false);
    } catch (error) {
      console.log('Error clearing medications from AsyncStorage:', error);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Medications</Text>
      <Text style={styles.subHeading}>Morning</Text>
      {renderMedications('Morning', morningMedications, setMorningMedications)}
      <TouchableOpacity style={styles.addButton} onPress={() => addMedication('Morning')}>
        <Text>Add More Morning Medications</Text>
      </TouchableOpacity>

      <Text style={styles.subHeading}>Noon</Text>
      {renderMedications('Noon', noonMedications, setNoonMedications)}
      <TouchableOpacity style={styles.addButton} onPress={() => addMedication('Noon')}>
        <Text>Add More Noon Medications</Text>
      </TouchableOpacity>

      <Text style={styles.subHeading}>Night</Text>
      {renderMedications('Night', nightMedications, setNightMedications)}
      <TouchableOpacity style={styles.addButton} onPress={() => addMedication('Night')}>
        <Text>Add More Night Medications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>

      {submitted && (
        <View style={styles.submittedMedicationsContainer}>
          <Text style={styles.subHeading}>Submitted Medications:</Text>
          <Text style={styles.subHeading}>Morning:</Text>
          {morningMedications.map((medication, index) => (
            <Text key={`morning_${index}`}>{medication.name}</Text>
          ))}

          <Text style={styles.subHeading}>Noon:</Text>
          {noonMedications.map((medication, index) => (
            <Text key={`noon_${index}`}>{medication.name}</Text>
          ))}

          <Text style={styles.subHeading}>Night:</Text>
          {nightMedications.map((medication, index) => (
            <Text key={`night_${index}`}>{medication.name}</Text>
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
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
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
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
  medicationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  submittedMedicationsContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingTop: 10,
  },
  clearButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
});