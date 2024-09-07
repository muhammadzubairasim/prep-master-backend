import { NextFunction, Request, Response } from "express";
import { QuestionDTO, TestDTO } from "../interfaces/DTOs/DTOs";
import * as testServices from "../services/test.services";
export const createTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Implement your create test logic her
    // const questions = req.body.questions as QuestionDTO[] | null;
    const test = req.body as TestDTO | null;
    const user = req.user;
    const testCreated = await testServices.createTest(test);
    return res.status(200).json({ message: "Test created successfully" });
  } catch (error) {
    next(error);
  }
};
