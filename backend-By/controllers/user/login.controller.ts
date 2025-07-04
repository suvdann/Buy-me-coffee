import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   try {
   

    const isEmailExisted = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
    //user oldohgui nuuts ug taarahgui bol
    if (!isEmailExisted) {
      return res
        .status(400)
        .send({ message: "Email эсвэл password буруу байна" });
    } else {
      const hashedPAssword = await bcrypt.compareSync(
        password,
        isEmailExisted?.password
      );

      //token uusgeh, tokendoo userid gaa damjuulsn
      if (hashedPAssword) {
        const tokenPassword = "BuyMeCoffe";
        const token = jwt.sign(
          {
            userId: isEmailExisted.id,
          },
          tokenPassword
        );
        const hasProfile = isEmailExisted.profile ? true : false;
        res.send({
          message: "Successfully logged in",
          token: token,
          hasProfile,
        });
        return;
      } else {
        res.status(404).send({ message: "email or password not matching " });
        return;
      }
    }
  } catch (err) {
    res.status(401).send({
      message: "login server error",
    });
    console.log(err);
  }
};
