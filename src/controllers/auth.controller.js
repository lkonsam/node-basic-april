// controllers/auth.controller.js
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';

const SALT_ROUNDS = 10;

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check duplicate
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
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
      message: 'User created',
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};