import express, { Request, Response } from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
