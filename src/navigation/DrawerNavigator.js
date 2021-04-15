import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Albums from '../pages/Albums';
import Photos from '../pages/Photos';
import ImagePicker from '../pages/ImagePicker'
import DrawerContent from '../navigation/DrawerContent'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const PMS = (props) => {

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#000000",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
     
      <Stack.Screen name="Albums"
        component={Albums}
        options={{
          title: "Gallery",
          headerShown: false,
    
        }}
      />
      
      <Stack.Screen name="Photos"
        component={Photos}
        options={{
          title: "Photos",
         headerShown: false
        }}
      />

        <Stack.Screen name="ImagePicker"
        component={ImagePicker}
        options={{
          title: "ImagePicker",
         headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="PMS" component={PMS} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;