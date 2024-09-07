import express from "express";
import {
  adminMiddleware,
  authenticateToken,
  instructorMiddleware,
} from "../middlewares/authentication.middleware";
import * as testService from "../controllers/test.controllers";

const testRouter = express.Router();

testRouter.post(
  "/",
  authenticateToken,
  adminMiddleware,
  testService.createTest
);

export default testRouter;
