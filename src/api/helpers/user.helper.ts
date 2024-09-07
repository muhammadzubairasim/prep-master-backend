import { User } from "@prisma/client";
import { UserDTO } from "../interfaces/DTOs/DTOs";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET ?? "defaultSecretKey";

export function generateAccessToken(user: User) {
  console.log("Generating access token...");

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  // Sign the payload to create a JWT
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  console.log("Access token generated:", accessToken);

  return accessToken;
}
