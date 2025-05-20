import axios from 'axios';
import { Product } from '../types/product.type';
import Constants from 'expo-constants';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProductService = {
  getAllProducts: async (): Promise<Product[]> => {
    if (!Constants.expoConfig?.extra?.IP_LOCAL) {
      Alert.alert(
        'Cấu hình lỗi',
        'Thiếu IP_LOCAL trong cấu hình ứng dụng. Kiểm tra app.config.js'
      );
      return [];
    }

    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập lại');
      return [];
    }

    const response = await axios.get(
      `http://${Constants.expoConfig.extra.IP_LOCAL}:3000/inventory`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  createProduct: async (product: Omit<Product, '_id'>): Promise<Product> => {
    if (!Constants.expoConfig?.extra?.IP_LOCAL) {
      Alert.alert(
        'Cấu hình lỗi',
        'Thiếu IP_LOCAL trong cấu hình ứng dụng. Kiểm tra app.config.js'
      );
      const emptyProduct = {
        id: 0,
        name: '',
        price: 0,
        quantity: 0,
        supplier: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return emptyProduct;
    }

    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập lại');
      const emptyProduct = {
        id: 0,
        name: '',
        price: 0,
        quantity: 0,
        supplier: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return emptyProduct;
    }

    const response = await axios.post(
      `http://${Constants.expoConfig.extra.IP_LOCAL}:3000/inventory`,
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    console.log("Updating product with ID:", id);
    if (!Constants.expoConfig?.extra?.IP_LOCAL) {
      Alert.alert(
        'Cấu hình lỗi',
        'Thiếu IP_LOCAL trong cấu hình ứng dụng. Kiểm tra app.config.js'
      );
      const emptyProduct = {
        id: 0,
        name: '',
        price: 0,
        quantity: 0,
        supplier: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return emptyProduct;
    }

    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập lại');
      const emptyProduct = {
        id: 0,
        name: '',
        price: 0,
        quantity: 0,
        supplier: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return emptyProduct;
    }
    const { id: _, ...productData } = product;
    console.log("Connecting to server at:", `http://${Constants.expoConfig.extra.IP_LOCAL}:3000/inventory/${id}`)
    console.log("Product data:", productData)
    console.log("Authorization token:", token)
    const response = await axios.put(
      `http://${Constants.expoConfig.extra.IP_LOCAL}:3000/inventory/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    if (!Constants.expoConfig?.extra?.IP_LOCAL) {
      Alert.alert(
        'Cấu hình lỗi',
        'Thiếu IP_LOCAL trong cấu hình ứng dụng. Kiểm tra app.config.js'
      );
      return;
    }

    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập lại');
      return;
    }

    await axios.delete(`http://${Constants.expoConfig.extra.IP_LOCAL}:3000/inventory/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};