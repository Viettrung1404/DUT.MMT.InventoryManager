import InventoryModel from '../models/invetory.model.js';

export const getInventory = async (user) => {
  try {
    console.log('Fetching inventory for user:', user);
    return await InventoryModel.getInventory(user.id);
  } catch (error) {
    console.error('Error getting invetory:', error);
    throw new Error('Failed to get inventory');
  }
};

export const getProductById = async (user, id) => {
  try {
    return await InventoryModel.getProductById(user.id, id);
  } catch (error) {
    console.error(`Error getting product ${id}:`, error);
    throw new Error('Invalid product ID or product not found');
  }
};

export const createProduct = async (user, productData) => {
  try {
    const result = await InventoryModel.createProduct(user.id, productData);
    if (!result) {
      throw new Error('product already exists');
    }
    return result;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
};

export const updateProduct = async (user, id, updateData) => {
  try {
    const result = await InventoryModel.updateProduct(user.id, id, updateData);
    if (!result) {
      throw new Error('Product not found');
    }
    
    return { id: id, ...updateData };
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw new Error(error.message || 'Failed to update product');
  }
};

export const deleteProduct = async (user, id) => {
  try {
    const result = await InventoryModel.deleteProduct(user.id, id);
    if (!result) {
      throw new Error('Product not found');
    }
    console.log("Product deleted: ", result);
    return { message: 'Product deleted successfully' };
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw new Error(error.message || 'Failed to delete product');
  }
};