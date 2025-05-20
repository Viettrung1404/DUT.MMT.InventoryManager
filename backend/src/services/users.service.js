import UserModel from '../models/users.model.js';

export const getAllUsers = async () => {
  try {
    return await UserModel.getAllUsers();
  } catch (error) {
    console.error('Error getting all users:', error);
    throw new Error('Failed to get users');
  }
};

export const getUserById = async (id) => {
  try {
    return await UserModel.getUserById(id);
  } catch (error) {
    console.error(`Error getting user ${id}:`, error);
    throw new Error('Invalid user ID or user not found');
  }
};

export const createUser = async (userData) => {
  try {
    const result = await UserModel.createUser(userData);
    if (!result) {
      throw new Error('User already exists');
    }
    return { _id: result.insertedId, ...userData };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const updateUser = async (id, updateData) => {
  try {
    const result = await UserModel.updateUser(id, updateData);
    if (!result) {
      throw new Error('User not found');
    }
    
    return { _id: id, ...updateData };
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw new Error(error.message || 'Failed to update user');
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await UserModel.deleteUser(id);
    if (!result) {
      throw new Error('User not found');
    }
    console.log("User deleted: ", result);
    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw new Error(error.message || 'Failed to delete user');
  }
};