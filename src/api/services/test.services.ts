import { DurationType } from "@prisma/client";
import prisma from "../../prisma.client";
import { QuestionDTO, TestDTO } from "../interfaces/DTOs/DTOs";
import { testSchema } from "../interfaces/schemas/validation.schemas";

export const createTest = async (testData: TestDTO) => {
  // Implement your create test logic here
  const testSeries = await prisma.testSeries.create({
    data: {
      title: ,
      language:
    },
  });

  const test = prisma.test.create({
    data: {
      title: testData.title,
      duration: testData.duration,
      durationType: testData.durationType as DurationType, // Cast the value to DurationType
      questions: {
        createMany: {
          data: testData.questions,
        },
      },
    },
  });
  const questionsCreated = prisma.question.createMany({
    data: questions,
  });
};
