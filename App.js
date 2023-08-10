import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import TabNavigation from './app/navigations/TabNavigation';
import * as Location from 'expo-location';
import {useEffect,useState} from 'react'
import UserLocationContext from './app/context/UserLocationContext';
import { useFonts } from 'expo-font';
import NameContext from './app/context/NameContext';


export default function App() {
  
  // const [fontsLoaded] = useFonts({
  //   'raleway-bold': require('./assets/fonts/Raleway-SemiBold.ttf'),
  //   //'raleway': require('./assets/fonts/Raleway-Regular.ttf'),

  // });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Category, setCategory] = useState('');

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <UserLocationContext.Provider value={{location,setLocation}}>
        <NameContext.Provider value={{Category,setCategory}}>
            <NavigationContainer>
              <TabNavigation/>
            </NavigationContainer>
        </NameContext.Provider>
      </UserLocationContext.Provider>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
});
