import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import MoodScreen from '../screens/MoodScreen';
import CommunityScreen from '../screens/CommunityScreen';
import EventsScreen from '../screens/EventsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SupportHubScreen from '../screens/SupportHubScreen';
import QuickHelpScreen from '../screens/QuickHelpScreen';
import PlannerScreen from '../screens/PlannerScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Mood: undefined;
  Community: undefined;
  Events: undefined;
  Settings: undefined;
  SupportHub: undefined;
  QuickHelp: undefined;
  Planner: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Login */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Home */}
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* Mood */}
        <Stack.Screen name="Mood" component={MoodScreen} />

        {/* Community */}
        <Stack.Screen name="Community" component={CommunityScreen} />

        {/* Events */}
        <Stack.Screen name="Events" component={EventsScreen} />

        {/* Settings */}
        <Stack.Screen name="Settings" component={SettingsScreen} />

        {/* SupportHub */}
        <Stack.Screen name="SupportHub" component={SupportHubScreen} />

        {/* QuickHelp */}
        <Stack.Screen name="QuickHelp" component={QuickHelpScreen} />

        {/* Planner */}
        <Stack.Screen name="Planner" component={PlannerScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
