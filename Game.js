// Activity6.js

import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Text, TextInput, Button } from 'react-native';
import { UserContext } from './UserContext';

const Game = () => {
  const { userDetails } = useContext(UserContext);
  const [nameAnswer, setNameAnswer] = useState('');
  const [ageAnswer, setAgeAnswer] = useState('');
  const [phoneNumberAnswer, setPhoneNumberAnswer] = useState('');
  const [nameCorrect, setNameCorrect] = useState(null);
  const [ageCorrect, setAgeCorrect] = useState(null);
  const [phoneNumberCorrect, setPhoneNumberCorrect] = useState(null);

  const checkAnswers = () => {
    setNameCorrect(userDetails.name === nameAnswer);
    setAgeCorrect(userDetails.age === ageAnswer);
    setPhoneNumberCorrect(userDetails.phoneNumber === phoneNumberAnswer);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.userSection}>
        <Text style={styles.heading}>Questions</Text>
        
        {userDetails.images ? (
          userDetails.images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))
        ) : (
          <Text>No images available.</Text>
        )}

        <Text style={styles.question}>1. What is the name of the person attached in the photo?</Text>
        <TextInput
          style={[styles.input, nameCorrect === false && styles.inputIncorrect]}
          value={nameAnswer}
          onChangeText={text => setNameAnswer(text)}
        />

        <Text style={styles.question}>2. What is your age?</Text>
        <TextInput
          style={[styles.input, ageCorrect === false && styles.inputIncorrect]}
          value={ageAnswer}
          onChangeText={text => setAgeAnswer(text)}
        />

        <Text style={styles.question}>3. What is your phone number?</Text>
        <TextInput
          style={[styles.input, phoneNumberCorrect === false && styles.inputIncorrect]}
          value={phoneNumberAnswer}
          onChangeText={text => setPhoneNumberAnswer(text)}
        />

        <Button title="Submit" onPress={checkAnswers} />

        <View style={styles.validationSection}>
          {nameCorrect !== null && (
            <Text style={nameCorrect ? styles.correctText : styles.incorrectText}>
              Name: {nameCorrect ? 'Correct' : 'Incorrect'}
            </Text>
          )}
          {ageCorrect !== null && (
            <Text style={ageCorrect ? styles.correctText : styles.incorrectText}>
              Age: {ageCorrect ? 'Correct' : 'Incorrect'}
            </Text>
          )}
          {phoneNumberCorrect !== null && (
            <Text style={phoneNumberCorrect ? styles.correctText : styles.incorrectText}>
              Phone Number: {phoneNumberCorrect ? 'Correct' : 'Incorrect'}
            </Text>
          )}
          
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  userSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderColor: 'gray',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
  question: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
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
  inputIncorrect: {
    borderColor: 'red',
  },
  validationSection: {
    marginTop: 20,
  },
  correctText: {
    color: 'green',
  },
  incorrectText: {
    color: 'red',
  },
});

export default Game;
