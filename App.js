//App.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect } from 'react';
import { Platform, ScrollView,View, Text, Image, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext, UserProvider } from './UserContext';
import AboutMe from './AboutMe';
import Activity2 from './Family';
import FamilyDetails from './FamilyDetails';
import AboutMeDetails from './AboutMeDetails';
import Medications from './Medications';
import Schedule from './Schedule';
import Game from './Game';
import PreciousMoments from './PreciousMoments'; 
import FavouritesForm from './FavouritesForm';
import FavouritesDisplay from './FavouritesDisplay';
import Family from './Family';
const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RefineMind" component={HomeScreen} />
          <Stack.Screen name="AboutMe" component={AboutMe} />
          <Stack.Screen name="AboutMeDetails" component={AboutMeDetails} />
          <Stack.Screen name="Family" component={Family} />
          <Stack.Screen name="FamilyDetails" component={FamilyDetails}/>
          <Stack.Screen name="Medications" component={Medications} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="PreciousMoments" component={PreciousMoments} /> 
          <Stack.Screen name="FavouritesForm" component={FavouritesForm}/>
          <Stack.Screen name="FavouritesDisplay" component={FavouritesDisplay}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
const HomeScreen = () => {
  const navigation = useNavigation();
  const { userDetails, familyDetails } = useContext(UserContext);

  const handleActivity1_ButtonPress = async () => {
    // Check if details are filled directly from AsyncStorage
    const isUserDetailsFilled = await checkUserDetailsFilled();
    if (isUserDetailsFilled) {
      navigation.navigate('AboutMeDetails');
    } else {
      navigation.navigate('AboutMe');
    }
  };

  // Helper function to check if details are filled
  const checkUserDetailsFilled = async () => {
    try {
      const storedUserFlag = await AsyncStorage.getItem('isUserDetailsFilled');
      return storedUserFlag === 'true';
    } catch (error) {
      console.error('Error checking if details are filled:', error);
      return false;
    }
  };
 


  const handleActivity2_ButtonPress = async () => {
    // Check if details are filled directly from AsyncStorage
    const isFamilyDetailsFilled = await checkFamilyDetailsFilled();
    if (isFamilyDetailsFilled) {
      navigation.navigate('FamilyDetails');
    } else {
      navigation.navigate('Family');
    }
  };

  // Helper function to check if details are filled
  const checkFamilyDetailsFilled = async () => {
    try {
      const storedFamilyFlag = await AsyncStorage.getItem('isFamilyDetailsFilled');
      return storedFamilyFlag === 'true';
    } catch (error) {
      console.error('Error checking if details are filled:', error);
      return false;
    }
  };
  const handleActivity4_ButtonPress = () => {
    navigation.navigate('Medications');
  };

  const handleActivity5_ButtonPress = () => {
    navigation.navigate('Schedule');
  };
  const handleActivity6_ButtonPress = () => {
    navigation.navigate('Game');
  };

  const handleActivity3_ButtonPress = async () => {
   
    navigation.navigate('PreciousMoments');
  };
  return (
    <ScrollView contentContainerStyle={styles.container} style={Platform.OS === 'android' ? styles.androidScrollView : null}>
      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.gridItem} onPress={handleActivity1_ButtonPress}>
            <Image
              source={require('./assets/activity1_image.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={handleActivity2_ButtonPress}>
            <Image
              source={require('./assets/activity2_image.jpg')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.gridItem} onPress={handleActivity3_ButtonPress}>
            <Image
              source={require('./assets/activity3_image.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={handleActivity4_ButtonPress}>
            <Image
              source={require('./assets/activity4_image.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.gridItem} onPress={handleActivity5_ButtonPress}>
            <Image
              source={require('./assets/activity5_image.jpg')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem} onPress={handleActivity6_ButtonPress}>
            <Image
              source={require('./assets/activity6_image.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  buttonText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 20,
  },
  imageButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

// Determine if the device is a tablet
const isTablet = Dimensions.get('window').width > 600;

// Adjust styles based on platform and tablet
if (Platform.OS === 'ios') {
  Object.assign(styles, {
    gridRow: {
      flexDirection: isTablet ? 'column' : 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    gridItem: {
      flex: isTablet ? 0 : 1,
      marginHorizontal: isTablet ? 0 : 5,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      paddingVertical: isTablet ? 20 : 30,
      paddingHorizontal: isTablet ? 40 : 20,
      alignItems: 'center',
    },
  });
} else if (Platform.OS === 'android') {
  // Additional Android-specific styles can be added here
}