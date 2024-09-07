import { NextFunction } from "express";
import { Request, Response } from "express";
import * as userServices from "../services/user.services";
// Sign up endpoint
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implement your sign up logic here
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Call the sign up service function
    const signUpUser = await userServices.userSignUp(req.body);

    // Generate and return a JWT token
    return res.status(200).json(signUpUser);
  } catch (error) {
    next(error);
  }
};

// Sign in endpoint
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implement your sign in logic here
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if email and password are valid
    if (email !== "example@example.com" || password !== "password") {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const signInUser = await userServices.userSignIn(email, password);

    // Generate and return a JWT token
    return res.status(200).json(signInUser);
  } catch (error) {
    next(error);
  }
};
