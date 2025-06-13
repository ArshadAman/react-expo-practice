import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { loginSchema } from '../utils/validationSchema';
import { AuthService } from '../services/AuthService';

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '', // Using username for DummyJSON API (accepts email)
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value)=>{
    setFormData({
      ...formData,
      [field]: value,
    });

    if(errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  }

  const validateField = async(field)=>{
    try {
      await loginSchema.validateAt(field, formData);
      setErrors(prev => ({ ...prev, [field]: '' }));
    } catch (error) {
      setErrors(prev => ({ ...prev, [field]: error.message }));
    }
  }

  const handleLogin = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate fields
      await loginSchema.validate({ username: formData.username, password: formData.password }, { abortEarly: false });
      setErrors({});

      // Call login API
      const result = await AuthService.login(formData.username, formData.password);
      
      if (result.success) {
        Alert.alert('Success', 'Login successful!', [
          { 
            text: 'OK', 
            onPress: () => {
              // The AppNavigator will automatically detect the auth change
              // and switch to the authenticated flow
            }
          },
        ]);
      } else {
        Alert.alert('Error', result.message || 'Login failed');
      }
      
    } catch (error) {
      const validationErrors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }
      setErrors(validationErrors);
    }
    
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6 py-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="bg-orange-500 w-20 h-20 rounded-3xl items-center justify-center mb-4">
              <Text className="text-white text-3xl font-bold">O</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-2">Welcome to Outgrow</Text>
            <Text className="text-gray-600 text-center">
              Transform your life through personal growth
            </Text>
          </View>

          {/* Login Form */}
          <View className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
            {/* Username Field */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Username</Text>
              <TextInput
                className={`bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 ${
                  errors.username ? 'border-red-500 bg-red-50' : 'border-gray-200'
                } ${isSubmitting ? 'opacity-50' : ''}`}
                placeholder="Enter your username"
                placeholderTextColor="#9CA3AF"
                value={formData.username}
                onChangeText={(value) => handleInputChange('username', value)}
                onBlur={() => validateField('username')}
                autoCapitalize="none"
                editable={!isSubmitting}
              />
              {errors.username && (
                <Text className="text-red-500 text-xs mt-1">{errors.username}</Text>
              )}
            </View>

            {/* Password Field */}
            <View className="mb-6">
              <Text className="text-gray-700 font-medium mb-2">Password</Text>
              <TextInput
                className={`bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'
                } ${isSubmitting ? 'opacity-50' : ''}`}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                onBlur={() => validateField('password')}
                secureTextEntry
                editable={!isSubmitting}
              />
              {errors.password && (
                <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
              )}
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className={`rounded-xl py-4 items-center mb-4 ${
                isSubmitting ? 'bg-orange-400' : 'bg-orange-500'
              }`}
              onPress={handleLogin}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center">
                {isSubmitting && (
                  <ActivityIndicator color="white" size="small" style={{ marginRight: 8 }} />
                )}
                <Text className="text-white font-semibold text-lg">
                  {isSubmitting ? 'Starting Your Journey...' : 'Begin Growth'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Navigate to Signup */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">New to growth? </Text>
            <TouchableOpacity 
              onPress={() => navigation?.navigate('Signup')}
              disabled={isSubmitting}
            >
              <Text className={`font-semibold ${isSubmitting ? 'text-gray-400' : 'text-orange-600'}`}>
                Start Your Journey
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;