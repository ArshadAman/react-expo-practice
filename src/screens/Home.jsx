import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=200&fit=crop',
      title: 'Transform Your Life Today',
      subtitle: 'Start your growth journey',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=200&fit=crop',
      title: 'Mindfulness & Meditation',
      subtitle: 'Find inner peace',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=200&fit=crop',
      title: 'Career Development',
      subtitle: 'Level up your skills',
    },
  ];

  const growthCategories = [
    { id: 1, name: 'Mindfulness', icon: '🧘‍♀️', color: '#FF6B35' },
    { id: 2, name: 'Career', icon: '💼', color: '#F7931E' },
    { id: 3, name: 'Health', icon: '💪', color: '#FFB800' },
    { id: 4, name: 'Skills', icon: '🎯', color: '#FF6B35' },
    { id: 5, name: 'Money', icon: '💰', color: '#F7931E' },
    { id: 6, name: 'Relations', icon: '❤️', color: '#FFB800' },
    { id: 7, name: 'Habits', icon: '⚡', color: '#FF6B35' },
    { id: 8, name: 'Learning', icon: '📚', color: '#F7931E' },
  ];

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      // Create authentic personal growth courses instead of using DummyJSON products
      const personalGrowthCourses = [
        {
          id: 1,
          title: "Mindful Leadership: Transform Your Management Style",
          price: 149,
          rating: 4.8,
          thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
          duration: "8 weeks",
          students: Math.floor(Math.random() * 3000) + 1000,
          level: "Intermediate",
          description: "Develop mindful leadership skills to inspire and guide your team effectively."
        },
        {
          id: 2,
          title: "Emotional Intelligence Mastery",
          price: 129,
          rating: 4.9,
          thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
          duration: "6 weeks",
          students: Math.floor(Math.random() * 3000) + 1000,
          level: "Beginner",
          description: "Master your emotions and improve your relationships with this comprehensive course."
        },
        {
          id: 3,
          title: "Goal Setting & Achievement Blueprint",
          price: 99,
          rating: 4.7,
          thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
          duration: "4 weeks",
          students: Math.floor(Math.random() * 3000) + 1000,
          level: "Beginner",
          description: "Learn proven strategies to set and achieve your most important goals."
        },
        {
          id: 4,
          title: "Stress Management & Resilience Building",
          price: 119,
          rating: 4.6,
          thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          duration: "5 weeks",
          students: Math.floor(Math.random() * 3000) + 1000,
          level: "Intermediate",
          description: "Build mental resilience and manage stress effectively in your daily life."
        },
        {
          id: 5,
          title: "Communication Skills for Success",
          price: 139,
          rating: 4.8,
          thumbnail: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop",
          duration: "7 weeks",
          students: Math.floor(Math.random() * 3000) + 1000,
          level: "Intermediate",
          description: "Enhance your communication skills for better relationships and career success."
        },
        {
          id: 6,
          title: "Building Healthy Habits That Stick",
          price: 89,
          rating: 4.5,
          thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
          duration: "6 weeks",
          students: Math.floor(Math.random() * 3000) + 1000,
          level: "Beginner",
          description: "Create lasting positive changes with science-backed habit formation techniques."
        },
        {
          id: 7,
          title: "Financial Freedom Fundamentals",
          price: 179,
          rating: 4.7,
          thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
          duration: "10 weeks",
          students: Math.floor(Math.random() * 3000) + 1000,
          level: "Advanced",
          description: "Master personal finance and build wealth with proven investment strategies."
        },
        {
          id: 8,
          title: "Time Management & Productivity Hacks",
          price: 109,
          rating: 4.6,
          thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          duration: "5 weeks",
          students: Math.floor(Math.random() * 3000) + 1000,
          level: "Intermediate",
          description: "Optimize your time and boost productivity with proven techniques."
        },
        {
          id: 9,
          title: "Confidence & Self-Esteem Bootcamp",
          price: 129,
          rating: 4.8,
          thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
          duration: "6 weeks",
          students: Math.floor(Math.random() * 3000) + 1000,
          level: "Beginner",
          description: "Build unshakeable confidence and develop a positive self-image."
        },
        {
          id: 10,
          title: "Mindfulness & Meditation for Beginners",
          price: 79,
          rating: 4.9,
          thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
          duration: "4 weeks",
          students: Math.floor(Math.random() * 3000) + 1000,
          level: "Beginner",
          description: "Learn meditation techniques to reduce stress and increase mindfulness."
        }
      ];
      
      setCourses(personalGrowthCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // Use our custom growth categories instead of DummyJSON categories
      const growthCategoryNames = [
        'Mindfulness', 'Career', 'Health', 'Skills', 
        'Money', 'Relations', 'Habits', 'Learning'
      ];
      setCategories(growthCategoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCourses();
    fetchCategories();
  };

  const renderBanner = ({ item }) => (
    <TouchableOpacity className="mr-4 shadow-lg" activeOpacity={0.8}>
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-80 h-44 rounded-3xl"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 rounded-3xl" />
        <View className="absolute bottom-6 left-6 right-6">
          <Text className="text-white font-bold text-2xl mb-2 leading-tight">
            {item.title}
          </Text>
          <Text className="text-white/90 text-base">
            {item.subtitle}
          </Text>
          <TouchableOpacity className="bg-white/20 backdrop-blur-sm self-start px-4 py-2 rounded-full mt-3">
            <Text className="text-white font-semibold text-sm">Start Now →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item, index }) => (
    <TouchableOpacity 
      className="items-center mb-6"
      style={{ width: (width - 64) / 4 }}
      activeOpacity={0.7}
    >
      <View 
        className="w-16 h-16 rounded-2xl items-center justify-center mb-3 shadow-sm"
        style={{ 
          backgroundColor: growthCategories[index]?.color || '#F3F4F6',
          shadowColor: growthCategories[index]?.color || '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <Text className="text-2xl">
          {growthCategories[index]?.icon || '📦'}
        </Text>
      </View>
      <Text className="text-sm font-semibold text-gray-800 text-center leading-tight" numberOfLines={2}>
        {growthCategories[index]?.name || item.name || item}
      </Text>
    </TouchableOpacity>
  );

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden"
      style={{ width: (width - 64) / 2 }}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.7}
    >
      <View className="relative">
        <Image
          source={{ uri: item.thumbnail }}
          className="w-full h-36"
          resizeMode="cover"
        />
        
        {/* Level Badge */}
        <View className="absolute top-3 left-3 bg-orange-600 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">
            {item.level}
          </Text>
        </View>

        {/* Rating Badge */}
        <View className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Text className="text-gray-800 text-xs font-semibold">⭐ {item.rating}</Text>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-base font-bold text-gray-900 mb-2 leading-tight" numberOfLines={2}>
          {item.title}
        </Text>
        
        <View className="flex-row items-center mb-3">
          <Text className="text-xs text-gray-500 flex-1">👥 {item.students} enrolled</Text>
          <Text className="text-xs text-orange-600 font-medium">• {item.duration}</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-bold text-orange-600">
              ${item.price}
            </Text>
            <Text className="text-xs text-gray-400">One-time</Text>
          </View>
          
          <TouchableOpacity className="bg-orange-600 px-4 py-2.5 rounded-full shadow-sm">
            <Text className="text-white text-xs font-bold">ENROLL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <View className="bg-orange-100 w-20 h-20 rounded-full items-center justify-center mb-6">
          <ActivityIndicator size="large" color="#FF6B35" />
        </View>
        <Text className="text-gray-800 text-lg font-semibold mb-2">Loading your courses</Text>
        <Text className="text-gray-500 text-center px-8">
          Preparing personalized growth content just for you...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="bg-white px-6 py-6 border-b border-gray-100">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                Good morning! 👋
              </Text>
              <Text className="text-base text-gray-600">
                Continue your growth journey
              </Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <TouchableOpacity className="bg-orange-100 w-12 h-12 rounded-full items-center justify-center">
                <Text className="text-xl">🔔</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-100 w-12 h-12 rounded-full items-center justify-center">
                <Text className="text-xl">👤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="bg-white px-6 py-4">
          <TouchableOpacity className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex-row items-center shadow-sm">
            <Text className="text-gray-400 mr-3 text-lg">🔍</Text>
            <Text className="text-gray-500 flex-1 text-base">Search courses, skills, mentors...</Text>
            <TouchableOpacity className="bg-orange-100 p-2 rounded-lg">
              <Text className="text-orange-600 text-xs font-semibold">FILTER</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Growth Stats Banner */}
        <View className="bg-orange-600 mx-4 my-3 p-5 rounded-2xl shadow-lg">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white font-bold text-xl mb-1">Your Growth Journey</Text>
              <Text className="text-white/90 text-base">3 courses completed this month</Text>
              <View className="flex-row items-center mt-2">
                <View className="flex-row mr-4">
                  <Text className="text-white/80 text-sm">🔥 5 day streak</Text>
                </View>
                <View className="flex-row">
                  <Text className="text-white/80 text-sm">⚡ 127 XP this week</Text>
                </View>
              </View>
            </View>
            <View className="bg-white/20 px-4 py-3 rounded-xl backdrop-blur-sm">
              <Text className="text-white font-bold text-lg">Level 5</Text>
              <Text className="text-white/80 text-xs text-center">Pro</Text>
            </View>
          </View>
        </View>

        {/* Banners */}
        <View className="py-5">
          <Text className="text-xl font-bold text-gray-900 px-6 mb-4">
            Trending Now
          </Text>
          <FlatList
            data={banners}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderBanner}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
        </View>

        {/* Quick Categories */}
        <View className="bg-white py-6 mb-3">
          <Text className="text-xl font-bold text-gray-900 px-6 mb-5">
            Explore Growth Areas
          </Text>
          <FlatList
            data={categories}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCategory}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
        </View>

        {/* Featured Courses Section */}
        <View className="bg-white pt-6 pb-6">
          <View className="flex-row justify-between items-center px-6 mb-5">
            <Text className="text-xl font-bold text-gray-900">
              Featured Courses
            </Text>
            <TouchableOpacity className="bg-orange-100 px-4 py-2 rounded-full">
              <Text className="text-orange-600 font-bold text-sm">See All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row flex-wrap justify-between px-6">
            {courses.slice(0, 6).map((item, index) => (
              <View key={item.id} style={{ width: (width - 64) / 2, marginBottom: 16 }}>
                {renderCourse({ item })}
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
