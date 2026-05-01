// services/user.service.js
import User from '../models/user.model.js';
import config from '../config/config.js';
import bcrypt from 'bcrypt';

export const createUser = async (body) => {

    const { name, email, password, isAdmin } = body;

    const existing = await User.findOne({ email });
    if (existing) {
        throw new Error({ message: 'Email already exists' });
    }

    console.log(config.bcrypt_salt);
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt));
    console.log(hashedPassword);
    console.log({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false
    });
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false
    });


}