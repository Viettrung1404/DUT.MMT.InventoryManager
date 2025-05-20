import * as AuthService from '../services/auth.service.js';
import * as UserService from '../services/users.service.js';

export const registerUser = async (req, res) => {
  try {
    const newUser = await AuthService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const user = await AuthService.loginUser(req.body);
    console.log('User from service:', user);
    res.status(201).json({
      user: {
        _id: user.user._id,
        email: user.user.email,
      },
      token: user.token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getMe = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}