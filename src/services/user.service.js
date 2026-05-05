// services/user.service.js
import User from '../models/user.model.js';
import config from '../config/config.js';
import bcrypt from 'bcrypt';
import ApiError from '../utils/apiError.util.js';

export const createUser = async (body) => {

    console.log(body);
    const { name, email, password, isAdmin } = body;

    const existing = await User.findOne({ email });
    if (existing) {
        throw new ApiError(400, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt));
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false
    });
    return user;
    // return {
    //     success: true,
    //     data: {
    //         id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         isAdmin: user.isAdmin
    //     }
    // };
};

export const getAllUsers = async () => {
    return await User.find().select('-password');
    // const usersWithCount = await User.find().select('-password');
    // return {
    //     success: true,
    //     data: users,
    //     count: users.length
    // };
};

export const getUserById = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return {
        success: true,
        data: user
    };
};

export const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        return {
            success: false,
            data: null
        };
    }
    return {
        success: true,
        data: user
    };
};

export const updateUser = async (userId, updateData) => {
    // const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    // if (!user) {
    //     throw new ApiError(404, "User not found");
    // }
    // Update fields
    // Object.assign(user, updateData);

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    user.name = updateData.name || user.name;
    user.email = updateData.email || user.email;
    user.isAdmin = updateData.isAdmin !== undefined ? updateData.isAdmin : user.isAdmin;

    await user.save();

    return {
        success: true,
        data: user
    };
};