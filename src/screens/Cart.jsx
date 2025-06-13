import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Cart = () => {
  // Mock cart data - in real app, this would come from context/state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Mindfulness Mastery Course',
      price: 49,
      quantity: 1,
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop',
      instructor: 'Dr. Sarah Chen',
      duration: '6 weeks',
    },
    {
      id: 2,
      title: 'Career Growth Blueprint',
      price: 79,
      quantity: 1,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      instructor: 'Mark Johnson',
      duration: '8 weeks',
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const renderCartItem = ({ item }) => (
    <View className="bg-white p-4 mb-3 rounded-2xl shadow-sm border border-gray-100">
      <View className="flex-row">
        <Image
          source={{ uri: item.thumbnail }}
          className="w-20 h-20 rounded-2xl mr-4"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800 mb-1" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="text-sm text-gray-500 mb-1">
            by {item.instructor}
          </Text>
          <Text className="text-xs text-gray-400 mb-2">
            Duration: {item.duration}
          </Text>
          <Text className="text-orange-600 font-bold text-lg">
            ${item.price}
          </Text>
        </View>
        <View className="items-end justify-between">
          <TouchableOpacity
            onPress={() => removeItem(item.id)}
            className="p-2"
          >
            <Text className="text-red-500 text-lg">🗑️</Text>
          </TouchableOpacity>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, -1)}
              className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
            >
              <Text className="text-gray-600 font-bold">-</Text>
            </TouchableOpacity>
            <Text className="mx-3 text-lg font-semibold">{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, 1)}
              className="w-8 h-8 bg-orange-500 rounded-full items-center justify-center"
            >
              <Text className="text-white font-bold">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-6xl mb-4">📚</Text>
        <Text className="text-xl text-gray-600 mb-2">Your learning cart is empty</Text>
        <Text className="text-gray-500">Add some courses to start growing</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Learning Cart ({cartItems.length} courses)
        </Text>
        
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
          showsVerticalScrollIndicator={false}
          className="flex-1"
        />

        {/* Cart Summary */}
        <View className="bg-white p-4 rounded-2xl mt-4 shadow-sm border border-gray-100">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg text-gray-600">Course Total:</Text>
            <Text className="text-lg font-semibold">${getTotalPrice().toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg text-gray-600">Platform Access:</Text>
            <Text className="text-lg font-semibold text-green-600">Free</Text>
          </View>
          <View className="border-t border-gray-200 pt-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold">Total Investment:</Text>
              <Text className="text-xl font-bold text-orange-600">
                ${getTotalPrice().toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-orange-500 py-4 rounded-2xl"
              activeOpacity={0.8}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Start Learning Journey
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
