import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppState } from 'react-native';
import Login from '../screens/Login';
import Signup from '../screens/Singup';
import TabNavigator from './TabNavigator';
import { AuthService } from '../services/AuthService';
import * as SplashScreen from 'expo-splash-screen';
import Home from '../screens/Home';

const Stack = createStackNavigator();

// Keep the splash screen visible while we check auth
SplashScreen.preventAutoHideAsync();

// Auth Navigator (Login/Signup)
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Prevent swipe back
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={Login}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="Signup" 
        component={Signup}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

// Main App Navigator
const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
    
    // Listen for app state changes to re-check auth
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        checkAuthStatus();
      }
    };

    // Set up a periodic check for auth status changes
    const authCheckInterval = setInterval(() => {
      checkAuthStatus();
    }, 1000); // Check every second

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription?.remove();
      clearInterval(authCheckInterval);
    };
  }, []);

  const checkAuthStatus = async () => {
    try {
      const loggedIn = await AuthService.isLoggedIn();
      console.log('Auth check result:', loggedIn); // Debug log
      setIsAuthenticated(loggedIn);
    } catch (error) {
      console.log('Auth check failed:', error);
    } finally {
      if (isLoading) {
        setIsLoading(false);
        SplashScreen.hideAsync();
      }
    }
  };

  // Show nothing while loading (Expo splash screen will be visible)
  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen 
            name="MainApp" 
            component={TabNavigator}
            options={{
              gestureEnabled: false,
            }}
          />
        ) : (
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator}
            options={{
              gestureEnabled: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function AppNavigator() {
  return <AppContent />;
}
