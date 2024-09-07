import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import CustomError from "../shared/exceptions/CustomError";
import NotFoundException from "../shared/exceptions/NotFoundException";
import { ValidationError as YupError } from "yup";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof YupError) {
    // YupError also can contain multiple errors, but we'll only send one at a time
    if (error.errors[0].includes("required"))
      return res.status(400).json({
        message: `Missing required field: ${error.path}`,
      });

    return res.status(400).json({ message: error.errors[0] });
  }

  if (error instanceof NotFoundException)
    return res.status(error.statusCode).json({ message: error.message });

  if (error instanceof CustomError)
    return res.status(error.statusCode).json({ message: error.message });

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2003")
      return res.status(400).json({
        message: `The provided id(s) needed to create ${error.meta?.modelName} was not found`,
      });

    if (error.code === "P2002")
      return res.status(400).json({
        message: `The following field(s) used to create ${error.meta?.modelName} is/are already taken: ${error.meta?.target}`,
      });

    return res.status(400).json({
      message: error.meta ? error.meta.cause : error.message,
    });
  }

  if (
    error instanceof Prisma.PrismaClientValidationError ||
    error instanceof Prisma.PrismaClientUnknownRequestError
  ) {
    const errorMessage = getErrorMessageFromPrismaError(error.message);
    return res.status(400).json({ message: errorMessage });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      message: "Unable to reach the database server",
    });
  }

  // For all remaining errors
  return res.status(500).json({
    message: "Something went wrong",
    error: error.message,
  });
}

/**
 * Extracts the most relevant error message from a Prisma error
 *
 * @param error - The error message from Prisma
 *
 * @returns The most relevant error message
 */
function getErrorMessageFromPrismaError(error: string) {
  const errorMessageParts = error.split("\n");
  return errorMessageParts[errorMessageParts.length - 1];
}
