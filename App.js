//App.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect } from 'react';
import { Platform, ScrollView,View, Text, Image, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext, UserProvider } from './UserContext';
import Activity1 from './Activity1';
import Activity2 from './Activity2';
import FamilyDetailsActivity from './FamilyDetailsActivity';
import AboutMeDetailsActivity from './AboutMeDetailsActivity';
import Activity4 from './Activity4';
import Activity5 from './Activity5';
import Activity6 from './Activity6';
import Activity3 from './Activity3'; 
import FavouritesForm from './FavouritesForm';
import FavouritesDisplay from './FavouritesDisplay';


const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Activity1" component={Activity1} />
          <Stack.Screen name="AboutMeDetailsActivity" component={AboutMeDetailsActivity} />
          <Stack.Screen name="Activity2" component={Activity2} />
          <Stack.Screen name="FamilyDetailsActivity" component={FamilyDetailsActivity} />
          <Stack.Screen name="Activity4" component={Activity4} />
          <Stack.Screen name="Activity5" component={Activity5} />
          <Stack.Screen name="Activity6" component={Activity6} />
          <Stack.Screen name="Activity3" component={Activity3} /> 
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
      navigation.navigate('AboutMeDetailsActivity');
    } else {
      navigation.navigate('Activity1');
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
      navigation.navigate('FamilyDetailsActivity');
    } else {
      navigation.navigate('Activity2');
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
    navigation.navigate('Activity4');
  };

  const handleActivity5_ButtonPress = () => {
    navigation.navigate('Activity5');
  };
  const handleActivity6_ButtonPress = () => {
    navigation.navigate('Activity6');
  };

  const handleActivity3_ButtonPress = async () => {
   
    navigation.navigate('Activity3');
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
        {/* Add more rows as needed */}
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