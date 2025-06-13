import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthService } from '../services/AuthService';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const userData = await AuthService.getCurrentUser();
    setUser(userData);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AuthService.logout();
            // The AppNavigator will automatically detect the auth change
            // and switch to the login flow
          },
        },
      ]
    );
  };

  const profileOptions = [
    { 
      id: 1, 
      title: 'Edit Profile', 
      icon: '👤', 
      subtitle: 'Update your personal information',
      color: '#FF6B35'
    },
    { 
      id: 2, 
      title: 'Growth Journey', 
      icon: '📈', 
      subtitle: 'Track your progress and milestones',
      color: '#F7931E'
    },
    { 
      id: 3, 
      title: 'My Courses', 
      icon: '🎓', 
      subtitle: '12 courses • 3 in progress',
      color: '#FFB800'
    },
    { 
      id: 4, 
      title: 'Achievements', 
      icon: '🏆', 
      subtitle: '8 badges earned this month',
      color: '#FF6B35'
    },
    { 
      id: 5, 
      title: 'Learning Goals', 
      icon: '🎯', 
      subtitle: 'Set and track your objectives',
      color: '#F7931E'
    },
    { 
      id: 6, 
      title: 'Notifications', 
      icon: '🔔', 
      subtitle: 'Manage your preferences',
      color: '#FFB800'
    },
    { 
      id: 7, 
      title: 'Help & Support', 
      icon: '❓', 
      subtitle: 'Get help when you need it',
      color: '#FF6B35'
    },
    { 
      id: 8, 
      title: 'Settings', 
      icon: '⚙️', 
      subtitle: 'Privacy, security & more',
      color: '#F7931E'
    },
  ];

  const renderOption = (option) => (
    <TouchableOpacity
      key={option.id}
      className="flex-row items-center p-5 bg-white mb-3 rounded-2xl shadow-sm border border-gray-50"
      activeOpacity={0.7}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      }}
    >
      <View 
        className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
        style={{ backgroundColor: `${option.color}15` }}
      >
        <Text className="text-xl">{option.icon}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 text-lg font-semibold mb-1">{option.title}</Text>
        <Text className="text-gray-500 text-sm">{option.subtitle}</Text>
      </View>
      <View className="bg-gray-100 w-8 h-8 rounded-full items-center justify-center">
        <Text className="text-gray-400 text-lg">›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Modern Header with Gradient */}
        <View className="relative">
          {/* Background Gradient */}
          <View className="bg-orange-600 pt-6 pb-12">
            <View className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700" />
            
            {/* Header Controls */}
            <View className="flex-row items-center justify-between px-6 mb-8">
              <Text className="text-white text-2xl font-bold">Profile</Text>
              <TouchableOpacity className="bg-white/20 w-10 h-10 rounded-full items-center justify-center">
                <Text className="text-white text-lg">⚙️</Text>
              </TouchableOpacity>
            </View>

            {/* Profile Card */}
            <View className="mx-6 bg-white rounded-3xl p-6 shadow-xl" style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
            }}>
              <View className="items-center">
                {/* Profile Picture with Ring */}
                <View className="relative mb-4">
                  <View className="w-24 h-24 bg-orange-100 rounded-full items-center justify-center p-1">
                    <Image
                      source={{ uri: user?.image || 'https://via.placeholder.com/100' }}
                      className="w-20 h-20 rounded-full"
                      defaultSource={{ uri: 'https://via.placeholder.com/100' }}
                    />
                  </View>
                  {/* Online Status */}
                  <View className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white items-center justify-center">
                    <View className="w-3 h-3 bg-green-400 rounded-full" />
                  </View>
                </View>

                {/* User Info */}
                <Text className="text-gray-900 text-2xl font-bold mb-1">
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text className="text-gray-500 text-base mb-3">
                  {user?.email}
                </Text>
                
                {/* Level Badge */}
                <View className="bg-orange-600 px-6 py-2 rounded-full">
                  <Text className="text-white text-sm font-bold">Level 5 • Growth Pro</Text>
                </View>

                {/* Quick Stats */}
                <View className="flex-row mt-6 w-full">
                  <View className="flex-1 items-center">
                    <Text className="text-2xl font-bold text-orange-600">12</Text>
                    <Text className="text-gray-500 text-xs mt-1">Courses</Text>
                  </View>
                  <View className="w-px bg-gray-200 mx-4" />
                  <View className="flex-1 items-center">
                    <Text className="text-2xl font-bold text-orange-600">45</Text>
                    <Text className="text-gray-500 text-xs mt-1">Day Streak</Text>
                  </View>
                  <View className="w-px bg-gray-200 mx-4" />
                  <View className="flex-1 items-center">
                    <Text className="text-2xl font-bold text-orange-600">2.4k</Text>
                    <Text className="text-gray-500 text-xs mt-1">XP Points</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Achievement Highlights */}
        <View className="px-6 mt-8 mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</Text>
          <View className="flex-row">
            <View className="bg-white rounded-2xl p-4 mr-3 items-center shadow-sm flex-1">
              <Text className="text-3xl mb-2">🏆</Text>
              <Text className="text-gray-900 font-semibold text-sm">Course Master</Text>
              <Text className="text-gray-500 text-xs text-center">Completed 10 courses</Text>
            </View>
            <View className="bg-white rounded-2xl p-4 mr-3 items-center shadow-sm flex-1">
              <Text className="text-3xl mb-2">🔥</Text>
              <Text className="text-gray-900 font-semibold text-sm">Streak Legend</Text>
              <Text className="text-gray-500 text-xs text-center">45 day streak</Text>
            </View>
            <View className="bg-white rounded-2xl p-4 items-center shadow-sm flex-1">
              <Text className="text-3xl mb-2">⚡</Text>
              <Text className="text-gray-900 font-semibold text-sm">Top Learner</Text>
              <Text className="text-gray-500 text-xs text-center">This month</Text>
            </View>
          </View>
        </View>

        {/* Profile Options */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">Account & Settings</Text>
          {profileOptions.map(renderOption)}
        </View>

        {/* Logout Button */}
        <View className="px-6 mb-8">
          <TouchableOpacity
            className="bg-red-500 p-5 rounded-2xl shadow-sm"
            onPress={handleLogout}
            activeOpacity={0.8}
            style={{
              shadowColor: '#EF4444',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
            }}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white text-lg font-bold mr-2">End Growth Session</Text>
              <Text className="text-white text-lg">👋</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
