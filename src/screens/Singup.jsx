import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function Signup({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Handle signup logic here
    console.log('Signup attempted with:', { fullName, email, password, confirmPassword });
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
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            {/* Email Field */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Email</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Field */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Password</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Confirm Password Field */}
            <View className="mb-6">
              <Text className="text-gray-700 font-medium mb-2">Confirm Password</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              className="bg-green-600 rounded-xl py-4 items-center mb-4 shadow-sm"
              onPress={handleSignup}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-lg">Create Account</Text>
            </TouchableOpacity>

            {/* Social Signup Section */}
            <View className="items-center mb-4">
              <Text className="text-gray-500 mb-4">Or sign up with</Text>
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

          {/* Navigate to Login */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
              <Text className="text-green-600 font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}