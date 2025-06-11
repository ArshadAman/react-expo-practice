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
import { signupSchema } from '../utils/validationSchema';

export default function Signup({ navigation }) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateField = async (field) => {
    try {
      await signupSchema.validateAt(field, formData);
      setErrors(prev => ({ ...prev, [field]: '' }));
    } catch (error) {
      setErrors(prev => ({ ...prev, [field]: error.message }));
    }
  };

  const handleSignup = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate all fields
      await signupSchema.validate(formData, { abortEarly: false });
      setErrors({});
    
      console.log('Signup successful with:', formData);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
      
    } catch (error) {
      const validationErrors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      }
      setErrors(validationErrors);
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-green-50 to-emerald-100">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">Join Outgrow to Grow</Text>
            <Text className="text-gray-600 text-center">
              Sign up to get started with your account
            </Text>
          </View>

          {/* Signup Form */}
          <View className="bg-white rounded-3xl shadow-lg p-6 mb-6">
            {/* Full Name Field */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
              <TextInput
                className={`bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 ${
                  errors.fullname ? 'border-red-500 bg-red-50' : 'border-gray-200'
                } ${isSubmitting ? 'opacity-50' : ''}`}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={formData.fullname}
                onChangeText={(text) => handleInputChange('fullname', text)}
                onBlur={() => validateField('fullname')}
                autoCapitalize="words"
                editable={!isSubmitting}
              />
              {errors.fullname && (
                <Text className="text-red-500 text-xs mt-1">{errors.fullname}</Text>
              )}
            </View>

            {/* Email Field */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Email</Text>
              <TextInput
                className={`bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                } ${isSubmitting ? 'opacity-50' : ''}`}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                onBlur={() => validateField('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isSubmitting}
              />
              {errors.email && (
                <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
              )}
            </View>

            {/* Password Field */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Password</Text>
              <TextInput
                className={`bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'
                } ${isSubmitting ? 'opacity-50' : ''}`}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                onBlur={() => validateField('password')}
                secureTextEntry
                editable={!isSubmitting}
              />
              {errors.password && (
                <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password Field */}
            <View className="mb-6">
              <Text className="text-gray-700 font-medium mb-2">Confirm Password</Text>
              <TextInput
                className={`bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 ${
                  errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-200'
                } ${isSubmitting ? 'opacity-50' : ''}`}
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                onBlur={() => validateField('confirmPassword')}
                secureTextEntry
                editable={!isSubmitting}
              />
              {errors.confirmPassword && (
                <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              className={`rounded-xl py-4 items-center mb-4 shadow-sm ${
                isSubmitting ? 'bg-green-400' : 'bg-green-600'
              }`}
              onPress={handleSignup}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center">
                {isSubmitting && (
                  <ActivityIndicator color="white" size="small" className="mr-2" />
                )}
                <Text className="text-white font-semibold text-lg">
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Social Signup Section */}
            <View className="items-center mb-4">
              <Text className="text-gray-500 mb-4">Or sign up with</Text>
              <View className="flex-row space-x-4">
                <TouchableOpacity 
                  className={`bg-gray-100 rounded-xl p-3 flex-1 items-center mr-2 ${
                    isSubmitting ? 'opacity-50' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  <Text className="text-gray-700 font-medium">Google</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className={`bg-gray-100 rounded-xl p-3 flex-1 items-center ml-2 ${
                    isSubmitting ? 'opacity-50' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  <Text className="text-gray-700 font-medium">Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Navigate to Login */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity 
              onPress={() => navigation?.navigate('Login')}
              disabled={isSubmitting}
            >
              <Text className={`font-semibold ${isSubmitting ? 'text-gray-400' : 'text-green-600'}`}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}