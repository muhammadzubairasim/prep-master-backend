import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";

export function validateData(schema: ObjectSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.validateSync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      next(error);
    }
  };
}
