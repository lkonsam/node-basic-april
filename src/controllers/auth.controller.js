// controllers/auth.controller.js
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';
import catchAsync from '../utils/catchAsync.util.js';
import ApiError from '../utils/apiError.util.js';

const SALT_ROUNDS = 10;

// Register
export const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  // Check duplicate
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(400, 'Email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
    // isAdmin defaults to false
  });

  const token = generateToken(user);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    }
  });
});

// Login
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, 'Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(400, 'Invalid credentials');
  }

  const token = generateToken(user);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    }
  });
});