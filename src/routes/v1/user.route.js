import express from 'express';
import { createUser, getAllUser, getProfile, updateUser } from '../../controllers/user.controller.js';
import { validate } from '../../middlewares/validation.middleware.js';
import { registerSchema, updateUserSchema } from '../../validations/user.validation.js';
import { auth } from '../../middlewares/auth.middleware.js';

const userRouter = express.Router();

// userRouter.get("/", (req, res) => {
//     res.send("We got it");
// } );


userRouter.post("/", validate(registerSchema), createUser);

userRouter.get("/", getAllUser);


userRouter.get("/profile/:id", getProfile);
userRouter.put("/profile/:id", validate(updateUserSchema), updateUser);




export default userRouter;
