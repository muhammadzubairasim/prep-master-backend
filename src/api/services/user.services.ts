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

export const userSignUp = async (userRegistrationObject: UserDTO) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userRegistrationObject.email,
    },
  });

  if (existingUser) {
    throw new CustomError(
      400,
      "Email already exists. Please choose a different email."
    );
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(
    userRegistrationObject.passwordHash,
    saltRounds
  );

  if (
    ["STUDENT", "INSTRUCTOR", "ADMIN"].includes(userRegistrationObject.role) ===
    false
  ) {
    throw new CustomError(400, "Invalid role. Please specify a valid role.");
  }

  const newUser = await prisma.user.create({
    data: {
      email: userRegistrationObject.email,
      passwordHash: passwordHash,
      firstName: userRegistrationObject.firstName,
      lastName: userRegistrationObject.lastName,
      role: userRegistrationObject.role,

      // Add any other properties you want to save for the user
    },
  });

  console.log("User registered successfully:", newUser);

  const accessToken = generateAccessToken(newUser);
  console.log("Access token generated:", accessToken);

  return {
    user: newUser,
    accessToken: accessToken,
  };
};
