
import * as userService from '../services/user.service.js';
import catchAsync from '../utils/catchAsync.util.js';


export const createUser = catchAsync(async (req, res) => {
    const result = await userService.createUser(req.body);
    res.status(201).json(result);
});




export const getAllUser = catchAsync(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
});

export const getProfile = catchAsync(async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized - No user ID found'
        });
    }

    const profile = await userService.getUserById(userId);
    res.status(200).json(profile);
});

export const updateUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const result = await userService.updateUser(userId, req.body);
    res.status(200).json(result); //200 update data should return
});