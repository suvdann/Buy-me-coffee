import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
export const checkUsername = async (req: Request, res: Response) => {
  const { username } = req.body;
  console.log(username, "username");
  try {
    const checkUsername = await prisma.user.findUnique({ where: { username } });
    if (checkUsername) {
      return res.status(400).send({ message: "username already in use" });
    }

    return res.status(200).send({ message: "Username available" });
  } catch (err) {
    console.log(err, "  username ERROR");
    res.status(500).send({ message: "server error" });
  }
};
