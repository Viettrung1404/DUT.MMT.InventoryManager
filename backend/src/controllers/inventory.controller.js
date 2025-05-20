import * as InventoryService from '../services/inventory.service.js';

export const getInventory = async (req, res) => {
  try {
    const inventory = await InventoryService.getInventory(req.user);
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await InventoryService.getProductById(req.user, req.params.id);
    if (product)  res.status(200).json(product)
    else res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await InventoryService.createProduct(req.user, req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    console.log("Updating product in controller with id: ", req.params.id);
    const updatedProduct = await InventoryService.updateProduct(req.user, req.params.id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.message === 'Product not found') res.status(404).json({ error: error.message })
    else res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    console.log("Delete product: ", req.params.id);
    const result = await InventoryService.deleteProduct(req.user, req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Product not found') res.status(404).json({ error: error.message })
    else res.status(400).json({ error: error.message });
  }
};