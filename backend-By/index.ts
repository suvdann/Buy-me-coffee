import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { prisma } from "./utils/prisma";
import { UserRouter } from "./router/user.router";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// app.get("/", async (_req: Request, res: Response) => {
//   console.log(process.env.DATABASE_URL);
//   res.json("hello");
// });

//("/user/:email") quire params

app.use(UserRouter);
// app.use(0)
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
