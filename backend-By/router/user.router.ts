// backend-By/router/user.router.ts
import { Router } from "express";
import { signUp } from "../controllers/user/signup.controller";
import { login } from "../controllers/user/login.controller";
import { verify } from "../controllers/user/verify";
import { createProfile } from "../controllers/user/createProfile";
import { tokenChecker } from "../middlewares/tokenChecker";
import { BankCardController } from "../controllers/user/BankCard.controller";
import { getUsers } from "../controllers/user/get-users";
// import { createProfile } from "../controllers/user/createProfile";

export const UserRouter = Router();

UserRouter.post("/signup", signUp);
UserRouter.post("/login", login);
UserRouter.post("/verify", verify);
UserRouter.get("/users", getUsers)

UserRouter.post("/profile", tokenChecker, createProfile);
UserRouter.post("/bankCard", tokenChecker, BankCardController);
