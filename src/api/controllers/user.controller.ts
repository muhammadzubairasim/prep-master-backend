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
    console.log(req.body);
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
    const signInUser = await userServices.userSignIn(email, password);

    // Generate and return a JWT token
    return res.status(200).json(signInUser);
  } catch (error) {
    next(error);
  }
};

export const otpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req);
    const userId = req.query.userId as string;
    // const userId = "1234";
    if (!userId)
      return res.status(400).json({ message: "User ID is required" });
    const otpSent = await userServices.otpSendingService(userId);
    if (otpSent)
      return res.status(200).json({ message: "OTP sent successfully" });
    else return res.status(400).json({ message: "OTP sending failed" });
  } catch (error) {
    next(error);
  }
};
