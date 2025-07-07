import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const tokenChecker = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "Please log in" });
  }

  const token = authorization.split(" ")[1];
  const tokenPassword = "BuyMeCoffe";

  try {
    const decoded = jwt.verify(token, tokenPassword) as {
      userId: string;
      isAdmin?: boolean;
    };

    req.user = decoded; // ✅ одоо controller дотор req.user.userId гэж ашиглаж болно

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).send({ message: "Invalid or expired token" });
  }
};
