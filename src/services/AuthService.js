import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://dummyjson.com';

export const AuthService = {
  // Login with DummyJSON API
  login: async (username, password) => {
    try {
      console.log('=== LOGIN ATTEMPT ===');
      console.log('Username:', username);
      console.log('Password:', password);
      console.log('API URL:', `${API_BASE_URL}/auth/login`);
      
      const requestBody = {
        username,
        password,
      };
      console.log('Request body:', JSON.stringify(requestBody));
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data = await response.json();
      console.log('Full API Response:', JSON.stringify(data, null, 2));

      if (!response.ok) {
        console.log('Login failed - Response not ok');
        throw new Error(data.message || 'Invalid credentials');
      }
      
      // Store tokens and user data
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      await AsyncStorage.setItem('userData', JSON.stringify({
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      }));

      return {
        success: true,
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        token: data.accessToken,
      };
    } catch (error) {
      console.log('Login error:', error); // Debug log
      return {
        success: false,
        message: error.message || 'Login failed',
      };
    }
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      return !!token;
    } catch (error) {
      return false;
    }
  },

  // Get stored user data
  getCurrentUser: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },

  // Logout
  logout: async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('userData');
      return true;
    } catch (error) {
      return false;
    }
  },

  // Get access token
  getAccessToken: async () => {
    try {
      return await AsyncStorage.getItem('accessToken');
    } catch (error) {
      return null;
    }
  },
};