import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export const verify = async (request: Request, response: Response) => {
  const { token } = request.body;
  const tokenPassword = "BuyMeCoffe";
  try {
    const isValid = jwt.verify(token, tokenPassword);
    console.log(token);
    if (isValid) {
      const destructToken = jwt.decode(token);
      //{userId:}
      response.send({ destructToken });
      console.log({ destructToken });
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
      return;
    }
  } catch (err) {
    response.status(401).send({ message: "token is not valid " });
    return;
  }
};
