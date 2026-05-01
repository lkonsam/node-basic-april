// services/user.service.js
import User from '../models/user.model.js';
import config from '../config/config.js';
import bcrypt from 'bcrypt';
import ApiError from '../utils/apiError.util.js';

export const createUser = async (body) => {

    const { name, email, password, isAdmin } = body;

    const existing = await User.findOne({ email });
    if (existing) {
        throw new ApiError(400, "Invalid email or password");
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt));
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false
    });


}