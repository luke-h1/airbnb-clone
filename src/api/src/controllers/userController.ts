import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import genToken from '../utils/genToken';
import User from '../models/userModel';

/*
@desc    Auth user & get token
@route   POST /api/users/login
@access  Public
*/
const login = asyncHandler(async (req, res) => {
  const { email, password }: { email: string; password: string } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      errors: {
        field: 'email',
        message: 'That email doesnt exist',
      },
    });
  }
  const valid = await bcrypt.compare(user.password, password);
  if (!valid) {
    res.status(400).json({
      errors: {
        field: 'password',
        message: 'incorrect creds',
      },
    });
  }
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: genToken(user._id),
  });
});

/*
@desc    Register a new user
@route   POST /api/users
@access  Public
*/
const register = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400).json({
      errors: {
        field: 'email',
        message: 'User already exists',
      },
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  } else {
    res.status(400).json({
      errors: {
        field: 'email',
        message: 'Invalid credentials',
      },
    });
  }
});

/*
@desc    Get user profile
@route   GET /api/users/profile
@access  Private
*/
const getProfile = asyncHandler(async (req: any, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('user not found1');
  }
});

/*
@desc    Update user profile
@route   PUT /api/users/profile
@access  Private
*/
const updateProfile = asyncHandler(async (req: any, res: Response) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/*
@desc    Get all users
@route   GET /api/users
@access  Private/Admin
*/
const getUsers = asyncHandler(async (_, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

/*
@desc    Delete user
@route   DELETE /api/users/:id
@access  Private/Admin
*/

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/*
@desc    Get user by ID
@route   GET /api/users/:id
@access  Private/Admin
*/
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
/*
@desc    Update user
@route   PUT /api/users/:id
@access  Private/Admin
*/
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
export {
  login,
  register,
  getProfile,
  updateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
