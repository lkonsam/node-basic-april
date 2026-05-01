// middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = header.split(' ')[1];

    const decoded = jwt.verify(token, config.jwt_secret);

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};