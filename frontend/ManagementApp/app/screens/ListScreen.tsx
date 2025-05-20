import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { ProductService } from '../../src/services/product.service';
import { Product } from '../../src/types/product.type';
import ProductItem from '../components/ProductItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';
import { useAuth } from '../context/AuthContext';

type ListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

const ListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ListScreenNavigationProp>();
  const { logout } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await ProductService.getAllProducts();
      console.log('Products data:', data);
      if (Array.isArray(data)) {
        const validData = data.filter(item => item && typeof item.id === 'number');
        console.log('Filtered products:', validData);
        setProducts(validData);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    navigation.navigate('ProductForm', {});
  };

  const handleViewDetails = (product: Product) => {
    navigation.navigate('ProductDetail', { product }); 
  };

  const handleDeleteProduct = async (productId: number) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa sản phẩm này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await ProductService.deleteProduct(productId); // Gọi API xóa sản phẩm
              setProducts(products.filter(product => product.id !== productId)); // Cập nhật danh sách
              Alert.alert('Thành công', 'Sản phẩm đã được xóa');
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Lỗi', 'Không thể xóa sản phẩm');
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    console.log('User logged out');
    await logout();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => (item.id ? String(item.id) : String(index))}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onPress={() => handleViewDetails(item)} // Điều hướng khi nhấn vào sản phẩm
            onDelete={() => handleDeleteProduct(item.id)} // Xử lý xóa sản phẩm
          />
        )}
        ListEmptyComponent={<Text>No products found</Text>}
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddProduct}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: 'white',
    fontSize: 24,
  },
});

export default ListScreen;