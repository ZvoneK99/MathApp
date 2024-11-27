// LoggedInTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons'; 
import LoggedInView from './LoggedInView';
import GamesScreen from './GamesScreen';
import Igrica from './Igrica';

const Tab = createBottomTabNavigator();

export default function LoggedInTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Define icons based on the route name
          if (route.name === 'Profil') {
            iconName = 'person'; // Icon name from MaterialIcons
          } else if (route.name === 'Igrice') {
            iconName = 'gamepad'; // Icon name from MaterialIcons
          } else if (route.name === "Igrica  ") {
            iconName = "calculate"; // Ikona za novu igricu
          }

          // Return the icon component
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'navy',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Profil" component={LoggedInView} />
      <Tab.Screen name="Igrice" component={GamesScreen} />
      <Tab.Screen name="Igrica" component={Igrica} />
    </Tab.Navigator>
  );
}