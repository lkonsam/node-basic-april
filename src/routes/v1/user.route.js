import express from 'express';
import { createUser, getAllUser, getProfile } from '../../controllers/user.controller.js';

const userRouter = express.Router();

// userRouter.get("/", (req, res) => {
//     res.send("We got it");
// } );


userRouter.post("/", createUser);


userRouter.get("/", getAllUser);


userRouter.get("/profile", getProfile);

export default userRouter;
