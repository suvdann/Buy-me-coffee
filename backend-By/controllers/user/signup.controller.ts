// backend-By/controllers/user/signup.controller.ts
import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcrypt";
export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // if (!username || !email || !password) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }
  console.log(email,"email")

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
console.log(email,"email")
    if (existingUser) {
      return res.status(400).send({ message: "Email already in use" });
    }
    if (!existingUser) {
      const hashedPAssword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: { username, email, password: hashedPAssword },
      });
      res.status(200).send({ message: "Successfully registered" });
      return;
    }

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(" Signup error:", err);
    return res.status(500).json({ message: "Signup failed" });
  }
};
