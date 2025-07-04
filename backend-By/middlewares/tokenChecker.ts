import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = "BuyMeCoffe"; // process.env.JWT_SECRET байвал бүр сайн

export const tokenChecker = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ message: "Please log in" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET) as { userId: number };

    if (!decoded || !decoded.userId) {
      return response.status(401).json({ message: "Invalid token payload" });
    }

    response.locals.userId = decoded.userId; // payload-аас авна
    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid or expired token" });
  }
};
