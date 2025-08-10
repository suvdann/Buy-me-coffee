import { Router } from "express";
import {
  confirmDonationFromQR,
  getDonationQR,
  peekDonationByToken,
} from "../controllers/donation/donation.controller";
import { tokenChecker } from "../middlewares/tokenChecker";
import { generateQR } from "../controllers/donation/generateQR";
import { confirmDonation } from "../controllers/donation/confirmDonation";
import { createDonation } from "../controllers/donation/createDonation";

export const DonationRouter = Router();
DonationRouter.post("/createDonation", tokenChecker, createDonation);
DonationRouter.get("/generateQR", generateQR);
DonationRouter.get("/confirmDonation/:donationId", confirmDonation);
DonationRouter.post("/qr", tokenChecker, getDonationQR);

// Утасны confirm хуудсаас дуудагдана (donation-г ҮҮСГЭНЭ)
DonationRouter.post("/confirm", confirmDonationFromQR);

// Desktop тал polling (donation үүслээ юу?)
DonationRouter.get("/peek", peekDonationByToken);
