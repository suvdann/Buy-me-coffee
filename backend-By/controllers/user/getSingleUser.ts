import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const id = Number(userId);

    const user = await prisma.profile.findUnique({
      where: { userId: id },
      include: {
        user: true, // email, username гэх мэт авчрах
      },
    });
    console.log("User:", user); // шалгах лог

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send({ user });
  } catch (err) {
    console.error("Error getting single user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
