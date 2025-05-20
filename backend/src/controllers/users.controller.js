import * as UserService from '../services/users.service.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (user)  res.status(200).json(user)
    else res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === 'User not found') res.status(404).json({ error: error.message })
    else res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await UserService.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'User not found') res.status(404).json({ error: error.message })
    else res.status(400).json({ error: error.message });
  }
};