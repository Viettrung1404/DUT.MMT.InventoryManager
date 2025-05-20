import HashProVider from '../providers/hash.provider.js';
import * as mockData from '../database/users.database.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = join(__dirname, '../../users.db.json');

class UserModel {
    async getUserById(userId) {
        try {
        const users = await mockData.readFileData(path);
        console.log('All users from DB:', users);
        const user = users.find((user) => user.id === Number(userId));
        console.log('User from DB by getUserById with id ' + userId + ':', user);
        return user;
        } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
        }
    }
    async createUser(userData) {
        try {
            const users = await mockData.readFileData(path);
            if (!userData.email || !userData.password) {
                console.error('Email and password are required');
                throw new Error('Email and password are required');
            }
            const existingUser = users.find((user) => user.email === userData.email);
            if (existingUser) {
                throw new Error('User already exists');
            }
            userData.password = await HashProVider.generateHash(userData.password);
            const lastUser = users[users.length - 1]; // Id của user sẽ tăng dần nên id của user mới sẽ là id của user cuối cùng + 1
            const newUser = { id: lastUser.id + 1, ...userData };
            users.push(newUser);
            await mockData.writeFileData(path, { users });
            return { ...newUser, password: undefined }; 
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }
    async getUserByEmail(email) {
        try {
            const users = await mockData.readFileData(path);
            const user = users.find((user) => user.email === email);
            return user;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw new Error('Failed to fetch user by email');
        }
    }
    async updateUser(userId, userData) {
        try {
            const users = await mockData.readFileData(path);
            userData.password = await HashProVider.generateHash(userData.password);
            if (!userData.email || !userData.password) {
                console.error('Email and password are required');
                throw new Error('Email and password are required');
            }
            const updatedUser = users.find((user) => user.id === Number(userId));
            if (!updatedUser) {
                throw new Error('User not found');
            }
            updatedUser.email = userData.email;
            updatedUser.password = userData.password;
            await mockData.writeFileData(path, { users });
            return { ...updatedUser, password: undefined };
        } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
        }
    }
    async deleteUser(userId) {
        try {
            const users = await mockData.readFileData(path);
            const userIndex = users.findIndex((user) => user.id === Number(userId));
            if (userIndex === -1) {
                throw new Error('User not found');
            }
            const deletedUser = users.splice(userIndex, 1); // Xóa user bằng cách tìm index của nó rồi dùng lệnh splice cắt từ vị trí đó 1 phần tử
            await mockData.writeFileData(path, { users });
            return deletedUser[0];
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Failed to delete user');
        }
    }
    async getAllUsers() {
        try {
            const users = await mockData.readFileData(path);
            console.log('All users from DB:', users);
            return users;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw new Error('Failed to fetch all users');
        }
    }

}

export default new UserModel();