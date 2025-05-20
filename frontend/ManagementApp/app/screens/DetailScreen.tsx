import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Product } from '../../src/types/product.type';
import ConfirmDialog from '../components/ConfirmDialog';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../src/types/navigation';
import { ProductService } from '@/src/services/product.service';

type DetailScreenProps = StackScreenProps<RootStackParamList, 'ProductDetail'>;

const DetailScreen = ({ route, navigation }: DetailScreenProps) => {
  const product: Product = route.params.product;
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const handleEdit = () => {
    navigation.navigate('ProductForm', { product });
  };

  const handleDelete = async () => {
    try {
      await ProductService.deleteProduct(product.id);
      navigation.navigate('ProductList');
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text>Code: {product.id}</Text>
      <Text>Price: ${product.price}</Text>
      <Text>Quantity: {product.quantity}</Text>
      <Text>Supplier: {product.supplier}</Text>
      <Text>Description: {product.description}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={handleEdit} />
        <Button
          title="Delete"
          color="red"
          onPress={() => setShowDeleteDialog(true)}
        />
        <Button color="gray" title="Back" onPress={() => navigation.navigate('ProductList')} />
      </View>

      <ConfirmDialog
        visible={showDeleteDialog}
        message="Are you sure to delete this product?"
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
});

export default DetailScreen;