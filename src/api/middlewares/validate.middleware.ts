import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";

export function validateData(schema: ObjectSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("body is ", req.body);
      schema.validateSync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      next(error);
    }
  };
}
