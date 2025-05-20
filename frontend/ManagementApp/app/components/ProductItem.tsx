import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../../src/types/product.type';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  product: Product;
  onPress?: () => void;
  onDelete?: () => void;
};

const ProductItem = ({ product, onPress, onDelete }: Props) => {
  const formattedPrice = (product.price * 1000).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.code}>Mã: {product.id}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>Giá: {formattedPrice}</Text>
          <Text style={styles.quantity}>Tồn kho: {product.quantity}</Text>
        </View>
      </View>

      {onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  code: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    color: '#2ecc71',
    fontWeight: '500',
  },
  quantity: {
    color: '#e67e22',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 16,
  },
});

export default ProductItem;