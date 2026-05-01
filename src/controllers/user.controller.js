
import * as userService from '../services/user.service.js';


export const createUser = async (req, res) => {
    try {
        // console.log(req);
        const result = await userService.createUser(req.body);
        res.status(201).json(result);

    }
    catch (error) {
        res.status(400).json(error);
    }
};








export const getAllUser = (req, res) => {
    res.send("We got it");
};

export const getProfile = (req, res) => {
    res.json({
        name: "Konsam",
        isAdmin: false
    });
};