import prisma from "../../prisma.client";
import { generateAccessToken } from "../helpers/user.helper";
import { UserDTO } from "../interfaces/DTOs/DTOs";
import CustomError from "../shared/exceptions/CustomError";
import bcrypt from "bcrypt";
export const userSignIn = async (email: string, password: string) => {
  // Implement your sign in logic here
  // Check if email and password are valid

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
    },
  });
  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    throw new CustomError(
      401,
      "Password does not match. Please specify a correct password."
    );
  }

  const accessToken = generateAccessToken(user);
  return {
    user: user,
    accessToken: accessToken,
  };
};

export const userSignUp = async (userRegistrationObject: UserDTO) => {};
