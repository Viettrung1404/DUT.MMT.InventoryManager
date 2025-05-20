import * as mockData from '../database/inventory.database.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = join(__dirname, '../../inventory.db.json');

class InventoryModel {
    // Helper method để tránh lặp code
    async #getUserInventory(id) {
        const db = await mockData.readFileData(path);
        const user = db.find(user => user.userId === Number(id));
        if (!user) {
            console.error('User not found in getUserInventory:', id);
            throw new Error('User not found');
        }
        console.log('User found in getUserInventory:', user);
        return { db, inventory: user.inventory, user };
    }

    async getProductById(userId, productId) {
        try {
            const { inventory } = await this.#getUserInventory(userId); // Sử dụng helper
            const product = inventory.find(p => p.id === Number(productId));
            
            if (!product) {
                throw new Error('Product not found'); // Thống nhất message lỗi
            }
            
            console.log('Retrieved product:', product);
            return product;
        } catch (error) {
            console.error(`Error getting product ${productId}:`, error);
            throw new Error(error.message || 'Failed to get product'); // Giữ nguyên message gốc
        }
    }

    async getProductByName(name) {
        try {
            const { inventory } = await this.#getUserInventory();
            const product = inventory.find((product) => product.name === name);
            return product || null;
        } catch (error) {
            console.error('Error fetching product by name:', error);
            throw new Error('Failed to fetch product by name');
        }
    }

    async createProduct(userId, productData) {
        try {
            const { db, inventory, user } = await this.#getUserInventory(userId);
            
            // Check trùng tên
            const nameExists = inventory.some(p => p.name === productData.name);
            if (nameExists) {
                throw new Error('Product name must be unique');
            }
            
            // Tạo ID
            const newId = inventory.length 
                ? Math.max(...inventory.map(p => p.id)) + 1 
                : 1;
            
            // Thêm metadata
            const newProduct = {
                id: newId,
                ...productData,
                createdAt: new Date().toISOString(),
                updatedAt: null
            };
            
            user.inventory.push(newProduct);
            await mockData.writeFileData(path, { db }); // Ghi đúng cấu trúc
            
            console.log('Created product:', newProduct);
            return newProduct;
        } catch (error) {
            console.error('Create failed:', error);
            throw new Error(error.message || 'Product creation failed'); 
        }
    }

    async updateProduct(userId, productId, productData) {
        try {
            const { db, inventory, user } = await this.#getUserInventory(userId);
            console.log('Updating product:', productId, productData);

            const productIndex = inventory.findIndex(
                (product) => product.id === Number(productId)
            );
            
            if (productIndex === -1) {
                console.error('Product not found:', productId);
                throw new Error('Product not found');
            }

            // Kiểm tra trùng tên với sản phẩm khác
            const existingProduct = inventory.find(
                (product, index) => 
                    product.name === productData.name && 
                    index !== productIndex
            );
            if (existingProduct) {
                console.error('Product name already exists:', productData.name);
                throw new Error('Product name already exists');
            }

            // Cập nhật thông tin
            const updatedProduct = {
                ...inventory[productIndex],
                ...productData,
                id: Number(productId) // Đảm bảo không thay đổi ID
            };

            user.inventory[productIndex] = updatedProduct;
            
            await mockData.writeFileData(path, { db });
            return updatedProduct;
        } catch (error) {
            console.error('Error updating product:', error);
            throw new Error('Failed to update product');
        }
    }

    async deleteProduct(userId, productId) {
        try {
            const { db, inventory, user } = await this.#getUserInventory(userId);
            
            const productIndex = inventory.findIndex(
                (product) => product.id === Number(productId)
            );
            
            if (productIndex === -1) {
                throw new Error('Product not found');
            }

            const [deletedProduct] = user.inventory.splice(productIndex, 1);
            await mockData.writeFileData(path, { db });
            return deletedProduct;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw new Error('Failed to delete product');
        }
    }

    async getInventory(userId) {
        try {
            const { inventory } = await this.#getUserInventory(userId);
            return inventory;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            throw new Error('Failed to fetch inventory');
        }
    }

    // Thêm phương thức mới
    async getProductsBySupplier(supplier) {
        try {
            const { inventory } = await this.#getUserInventory();
            return inventory.filter(product => product.supplier === supplier);
        } catch (error) {
            console.error('Error fetching products by supplier:', error);
            throw new Error('Failed to fetch products by supplier');
        }
    }
}

export default new InventoryModel();