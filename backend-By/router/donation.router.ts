import { Router } from "express";
import { tokenChecker } from "../middlewares/tokenChecker";
import { createDonation } from "../controllers/donation/createDonation";

export const DonationRouter = Router();
DonationRouter.post("/createDonation", tokenChecker, createDonation);
