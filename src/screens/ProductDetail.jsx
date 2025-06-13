import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;

  const addToCart = () => {
    // TODO: Implement add to cart functionality
    alert('Added to cart!');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-100">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center"
          >
            <Text className="text-orange-600 text-lg mr-2">←</Text>
            <Text className="text-orange-600 text-base font-medium">Back</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-800">Course Details</Text>
          <TouchableOpacity className="p-2">
            <Text className="text-2xl">🔗</Text>
          </TouchableOpacity>
        </View>

        {/* Course Image */}
        <View className="bg-white">
          <Image
            source={{ uri: product.thumbnail }}
            style={{ width, height: 250 }}
            resizeMode="cover"
          />
          {/* Level Badge */}
          <View className="absolute top-4 left-4 bg-orange-500 px-3 py-1 rounded-full">
            <Text className="text-white text-sm font-bold">
              {product.level || 'Intermediate'}
            </Text>
          </View>
          {/* Rating Badge */}
          <View className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
            <Text className="text-gray-800 text-sm font-bold">
              ⭐ {product.rating}
            </Text>
          </View>
        </View>

        <View className="px-4 bg-white">
          {/* Course Info */}
          <View className="mb-6 pt-6">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              {product.title}
            </Text>
            <View className="flex-row items-center mb-3">
              <Text className="text-gray-600 mr-4">👨‍🏫 Dr. Sarah Chen</Text>
              <Text className="text-gray-600">⏱️ {product.duration || '8 weeks'}</Text>
            </View>
            <Text className="text-gray-600 mb-4 leading-6">
              Transform your mindset and unlock your potential with this comprehensive personal growth course. Learn evidence-based techniques to build resilience, improve focus, and achieve your goals.
            </Text>
            
            {/* Price and Rating */}
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-3xl font-bold text-orange-600">
                  ${product.price}
                </Text>
                <Text className="text-gray-500 text-sm">
                  One-time payment • Lifetime access
                </Text>
              </View>
              <View className="items-end">
                <View className="flex-row items-center mb-1">
                  <Text className="text-yellow-500 mr-1 text-lg">⭐</Text>
                  <Text className="text-gray-800 text-lg font-semibold">{product.rating}</Text>
                </View>
                <Text className="text-gray-500 text-sm">
                  {product.students || '2,847'} students
                </Text>
              </View>
            </View>

            {/* Course Stats */}
            <View className="flex-row justify-between mb-6 bg-gray-50 p-4 rounded-2xl">
              <View className="items-center">
                <Text className="text-gray-500 text-sm">Skill Level</Text>
                <Text className="text-gray-800 font-medium">
                  {product.level || 'Intermediate'}
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-500 text-sm">Language</Text>
                <Text className="text-gray-800 font-medium">English</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-500 text-sm">Certificate</Text>
                <Text className="text-gray-800 font-medium">✓ Included</Text>
              </View>
            </View>

            {/* What You'll Learn Section */}
            <View className="mb-6">
              <Text className="text-xl font-bold text-gray-800 mb-4">What You'll Learn</Text>
              <View className="space-y-3">
                <View className="flex-row items-start">
                  <Text className="text-orange-600 mr-3 text-lg">✓</Text>
                  <Text className="text-gray-600 flex-1">Master mindfulness and meditation techniques</Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-600 mr-3 text-lg">✓</Text>
                  <Text className="text-gray-600 flex-1">Develop emotional intelligence and resilience</Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-600 mr-3 text-lg">✓</Text>
                  <Text className="text-gray-600 flex-1">Create and achieve meaningful personal goals</Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-orange-600 mr-3 text-lg">✓</Text>
                  <Text className="text-gray-600 flex-1">Build healthy habits that stick</Text>
                </View>
              </View>
            </View>

            {/* Enrollment Info */}
            <View className="mb-6 bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <Text className="text-gray-500 text-sm mb-1">Enrollment Status</Text>
              <Text className={`font-medium text-lg ${
                product.stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.stock > 0 ? `Open (${product.stock} spots left)` : 'Waitlist Only'}
              </Text>
              {product.stock > 0 && (
                <Text className="text-orange-600 text-sm mt-1">🔥 Limited time offer - Save 30%</Text>
              )}
            </View>
          </View>

          {/* Add to Learning Cart Button */}
          <View className="px-4 pb-6">
            <TouchableOpacity
              className={`py-4 rounded-2xl mb-3 ${
                product.stock > 0 ? 'bg-orange-600' : 'bg-gray-400'
              }`}
              onPress={addToCart}
              disabled={product.stock === 0}
              activeOpacity={0.8}
            >
              <Text className="text-white text-center text-lg font-bold">
                {product.stock > 0 ? 'Add to Learning Cart' : 'Join Waitlist'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="py-3 border-2 border-orange-600 rounded-2xl">
              <Text className="text-orange-600 text-center text-lg font-semibold">
                Preview Course
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
