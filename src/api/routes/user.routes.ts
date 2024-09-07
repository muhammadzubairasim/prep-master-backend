import express from "express";
import * as userController from "../controllers/user.controller";
import { validateData } from "../middlewares/validate.middleware";
import {
  signInSchema,
  signUpSchema,
} from "../interfaces/schemas/validation.schemas";
// make sign in and sign up routes
const userRouter = express.Router();

userRouter.post("/signin", validateData(signInSchema), userController.signIn);
userRouter.post("/signup", validateData(signUpSchema), userController.signUp);

export default userRouter;
