import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./api/routes/user.routes";
import cors from "cors";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
