import { User } from "@prisma/client";
import { UserDTO } from "../interfaces/DTOs/DTOs";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import nodemailer, { SentMessageInfo } from "nodemailer";
const secretKey = process.env.JWT_SECRET ?? "defaultSecretKey";
console.log(process.env.personalEmailPw);
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Example for Gmail; use appropriate service for other providers
  auth: {
    user: "zubairasim7@gmail.com", // Your email address
    pass: process.env.personalEmailPw, // Your email password (or app password)
  },
});

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

const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<SentMessageInfo | void> => {
  try {
    if (!process.env.personalEmailPw) {
      throw new Error("Email password not found in environment variables");
    }
    const info = await transporter.sendMail({
      from: "zubairasim7@gmail.com", // Sender email address from environment variables
      to, // Recipient email address
      subject, // Subject of the email
      html, // HTML content of the email
    });

    return info;
  } catch (error) {
    return false;
  }
};

// Function to send OTP email
export const sendOtpEmail = async (to: string, otp: string): Promise<void> => {
  const htmlContent = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #007bff;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
          }
          .otp {
            font-size: 24px;
            font-weight: bold;
            color: #28a745;
            padding: 10px;
            border: 1px solid #28a745;
            border-radius: 4px;
            text-align: center;
            display: inline-block;
          }
          .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Your OTP Code</h1>
          <p>Dear User,</p>
          <p>Here is your OTP code for verification:</p>
          <div class="otp">${otp}</div>
          <p>If you did not request this, please ignore this email.</p>
          <div class="footer">
            <p>Best regards,<br>Your Company</p>
          </div>
        </div>
      </body>
      </html>
    `;

  await sendEmail(to, "Your OTP Code", htmlContent);
};
