import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma"; // prisma client энд байгаа бол

export const verify = async (request: Request, response: Response) => {
  const { token } = request.body;
  const tokenPassword = "BuyMeCoffe";

  try {
    const isValid = jwt.verify(token, tokenPassword);
    if (isValid) {
      const destructToken: any = jwt.decode(token);
      const userId = destructToken.userId;

      // 🔥 Prisma ашиглаж хэрэглэгчийн профайл авч байна
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: true, // профайл хүснэгт холбосон гэж үзсэн
        },
      });

      if (!user) {
        return response.status(404).send({ message: "User not found" });
      }

      // ✔️ frontend рүү буцааж байна
      response.send({
        destructToken,
        user,
      });
      return;
    } else {
      response.status(401).send({ message: "Token is not valid" });
      return;
    }
  } catch (err) {
    response.status(401).send({ message: "Token is invalid" });
    return;
  }
};
