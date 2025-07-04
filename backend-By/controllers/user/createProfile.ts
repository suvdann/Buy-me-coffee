// controller/profile.controller.ts
import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const createProfile = async (req: Request, res: Response) => {
  const { name, about, avatarImage, socialMediaURL } = req.body;
  try {
    const userId = req.user.userId;

    const isProfileExisted = await prisma.profile.findUnique({
      where: { userId },
    });

    if (isProfileExisted) {
      return res.status(400).send({ message: "Profile already exists" });
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        about,
        avatarImage,
        socialMediaURL,
        userId,
      },
    });

    res.status(200).send({ message: "Profile created successfully", profile });
  } catch (err) {
    console.error("Profile creation error:", err);
    res.status(500).send({ message: "Server error" });
  }
};
