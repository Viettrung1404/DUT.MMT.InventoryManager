import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { ProductService } from '../../src/services/product.service';
import { Product } from '../../src/types/product.type';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../src/types/navigation';

type FormScreenProps = {
  route: RouteProp<RootStackParamList, 'ProductForm'>;
  navigation: StackNavigationProp<RootStackParamList, 'ProductForm'>;
};

const FormScreen = ({ route, navigation }: FormScreenProps) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    id: undefined,
    name: '',
    price: 0,
    quantity: 0,
    supplier: '',
    description: '',
    createdAt: undefined,
    updatedAt: undefined,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (route.params?.product) {
      setIsEditing(true);
      setFormData(route.params.product);
    }
  }, [route.params]);

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        formData.updatedAt = new Date();
        formData.createdAt = formData.createdAt || new Date();
        console.log('Updating product:', formData);
        await ProductService.updateProduct(formData.id!, { ...formData });
      } else {
        await ProductService.createProduct(formData as Product);
      }
      Alert.alert('Success', 'Product saved successfully');
      navigation.navigate('ProductList');
    } catch (error) {
        console.error('Error saving product:', error);
        Alert.alert('Error', 'Failed to save product');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Mã sản phẩm"
        value={formData.id?.toString()} 
        editable={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Tên sản phẩm"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Giá (nghìn đồng)"
        keyboardType="numeric"
        value={formData.price?.toString()}
        onChangeText={(text) => setFormData({ ...formData, price: Number(text) || 0 })}
      />

      <TextInput
        style={styles.input}
        placeholder="Số lượng"
        keyboardType="numeric"
        value={formData.quantity?.toString()}
        onChangeText={(text) => setFormData({ ...formData, quantity: Number(text) || 0 })}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhà cung cấp"
        value={formData.supplier}
        onChangeText={(text) => setFormData({ ...formData, supplier: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        multiline
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
      />

      {/* <TextInput
        style={styles.input}
        placeholder="Ngày tạo"
        value={formData.createAt?.toString()}
        editable={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Ngày cập nhật"
        value={formData.updateAt?.toString()}
        editable={false}
      /> */}

      <Button
        title={isEditing ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default FormScreen;