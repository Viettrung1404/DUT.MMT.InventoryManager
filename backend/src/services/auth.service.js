import AuthProvider from '../providers/auth.provider.js';
import HashProVider from '../providers/hash.provider.js';
import UserModel from '../models/users.model.js';

export const registerUser = async (userData) => {
  try {
    const result = await UserModel.createUser(userData);
    console.log('User created:', result);
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


export const loginUser = async (userData) => {
  try {
    const user = await UserModel.getUserByEmail(userData.email);
    console.log('User from DB:', user);
    if (!user || !HashProVider.compareHash(userData.password, user.password)) {
      throw new Error('Invalid email or password');
    }
    const token = await AuthProvider.encodeToken(user);
    return { user: { _id: user._id, email: user.email }, token };
  } catch (error) {
    console.error('Error log in user:', error);
    throw error;
  }
};
