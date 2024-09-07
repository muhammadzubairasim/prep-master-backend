import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define the 'user' property on the 'Request' type
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Middleware to verify the JWT token and attach user info to req.user
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaderToken = req.headers["authorization"];

  if (!authHeaderToken) return res.status(401).send("Access Denied");

  jwt.verify(authHeaderToken, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.status(403).send("Forbidden");
    req.user = user as JwtPayload;
    console.log(user);
    next();
  });
};

const hasRole =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };

// Middleware for ADMIN role
export const adminMiddleware = hasRole("ADMIN");

// Middleware for INSTRUCTOR role
export const instructorMiddleware = hasRole("INSTRUCTOR");

// Middleware for STUDENT role
export const studentMiddleware = hasRole("STUDENT");
