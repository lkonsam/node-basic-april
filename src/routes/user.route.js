import express from 'express';
import { getAllUser, getProfile } from '../controllers/user.controller.js';

const userRouter = express.Router();

// userRouter.get("/", (req, res) => {
//     res.send("We got it");
// } );


// userRouter.get("/profile", (req, res) => {
//     res.json({
//         name: "Konsam",
//         isAdmin: true
//     });
// } );

userRouter.get("/", getAllUser );


userRouter.get("/profile",  getProfile );

export default userRouter;
