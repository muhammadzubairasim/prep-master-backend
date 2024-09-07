import express from "express";
import * as userController from "../controllers/user.controller";
import { validateData } from "../middlewares/validate.middleware";
import {
  signInSchema,
  userSchema,
} from "../interfaces/schemas/validation.schemas";
// make sign in and sign up routes
const router = express.Router();

router.post("/signin", validateData(signInSchema), userController.signIn);
router.post("/signup", validateData(userSchema), userController.signUp);

export default router;
