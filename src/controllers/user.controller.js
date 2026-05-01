
import * as userService from '../services/user.service.js';
import catchAsync from '../utils/catchAsync.util.js';


export const createUser = catchAsync(async (req, res) => {
    const result = await userService.createUser(req.body);
    res.status(201).json(result);
});








export const getAllUser = (req, res) => {
    res.send("We got it");
};

export const getProfile = (req, res) => {
    res.json({
        name: "Konsam",
        isAdmin: false
    });
};