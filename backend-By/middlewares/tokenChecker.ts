import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const tokenPassword = "BuyMeCoffe";

export const tokenChecker = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    response.status(401).send({ message: "Please log in" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    //  Token-г verify хийж, decoded payload буцаана
    const decoded = jwt.verify(token, tokenPassword) as { userId: number };

    // 👇 userId байхгүй байвал буцаана
    if (!decoded.userId) {
      response.status(401).send({ message: "Token is invalid" });
      return;
    }

    // ✅userId-г controller руу дамжуулж байна
    response.locals.userId = decoded.userId;
    console.log("✅ Token valid:", decoded);
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    response.status(401).send({ message: "Invalid or expired token" });
  }
};
