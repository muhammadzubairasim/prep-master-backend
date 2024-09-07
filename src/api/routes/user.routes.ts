import { sendOtpEmail } from "./../helpers/user.helper";
import express from "express";
import * as userController from "../controllers/user.controllers";
import { validateData } from "../middlewares/validate.middleware";
import {
  signInSchema,
  signUpSchema,
} from "../interfaces/schemas/validation.schemas";
// make sign in and sign up routes
const userRouter = express.Router();

userRouter.post("/sendotp", userController.otpController);
userRouter.post("/verifyotp", userController.verifyOtpController);
userRouter.post("/signin", validateData(signInSchema), userController.signIn);
userRouter.post("/signup", validateData(signUpSchema), userController.signUp);

export default userRouter;
