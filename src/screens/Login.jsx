import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { loginSchema } from '../utils/validationSchema';

const Login = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
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
      // Validate all fields
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({});

      console.log('Login successful with:', formData);
      
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
    <SafeAreaView className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">Outgrow Login</Text>
            <Text className="text-gray-600 text-center">
              Sign in to your account to continue
            </Text>
          </View>

          {/* Login Form */}
          <View className="bg-white rounded-3xl shadow-lg p-6 mb-6">
            {/* Email Field */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Email</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
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
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                onBlur={() => validateField('password')}
                secureTextEntry
              />
              {errors.password && (
                <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
              )}
            </View>

            {/* Remember Me & Forgot Password */}
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-row items-center">
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  thumbColor={rememberMe ? '#3B82F6' : '#9CA3AF'}
                  trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
                />
                <Text className="ml-2 text-gray-700">Remember Me</Text>
              </View>
              <TouchableOpacity>
                <Text className="text-blue-600 font-medium">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-blue-600 rounded-xl py-4 items-center mb-4 shadow-sm"
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-lg">Login</Text>
            </TouchableOpacity>

            {/* Social Login Section */}
            <View className="items-center mb-4">
              <Text className="text-gray-500 mb-4">Or continue with</Text>
              <View className="flex-row space-x-4">
                <TouchableOpacity className="bg-gray-100 rounded-xl p-3 flex-1 items-center mr-2">
                  <Text className="text-gray-700 font-medium">Google</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-100 rounded-xl p-3 flex-1 items-center ml-2">
                  <Text className="text-gray-700 font-medium">Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Navigate to Signup */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Signup')}>
              <Text className="text-blue-600 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;