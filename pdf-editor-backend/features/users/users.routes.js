import express from 'express';
import UserController from './user.controller.js';
import Authentication from '../../config/authentication.js';

//initializing router and controller
const userRouter = express.Router();
const userController = new UserController;


//assigning proper controlers for API calls
userRouter.post("/register",userController.signUp);
userRouter.post("/login",userController.signIn);
userRouter.get("/validate",Authentication.verifyToken,(req,res)=>{res.send(req.payload)});
// userRouter.post("/forgot-password",userController.forgotPassword);
// userRouter.post("/reset-password", Authentication.verifyToken , userController.resetPassword);


export default userRouter;