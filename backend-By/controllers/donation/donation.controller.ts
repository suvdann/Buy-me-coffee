// import { Request, Response } from "express";

// import { prisma } from "../../utils/prisma";

// export const createDonation = async (req: Request, res: Response) => {
//   const donorId = res.locals.userId;
//   const { amount, specialMessage, socialURLOrBuyMeACoffee, recipientId } =
//     req.body;
//   console.log(donorId, "DonorId");
//   try {
//     const donation = await prisma.donation.create({
//       data: {
//         amount,
//         specialMessage,
//         socialURLOrBuyMeACoffee,
//         donor: { connect: { id: donorId } },
//         recipient: { connect: { id: recipientId } },
//       },
//     });

//     res.status(200).json(donation);
//   } catch (err) {
//     console.log(" Donation error:", err);
//     res.status(500).json({ error: "Donation үүсгэж чадсангүй" });
//   }
// };
import { Request, Response } from "express";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import { prisma } from "../../utils/prisma";

type QRPayload = {
  donorId: number;
  recipientId: number;
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
};

// 1) QR үүсгэх (донорыг auth middleware-ээс авна)
export const getDonationQR = async (req: Request, res: Response) => {
  try {
    const donorId = Number(res.locals.userId); // таны auth middleware үүнийг тавьдаг
    const { amount, specialMessage, socialURLOrBuyMeACoffee, recipientId } =
      req.body as QRPayload;

    if (!donorId || !recipientId || !amount) {
      return res.status(400).json({ error: "Шаардлагатай талбар дутуу" });
    }
    if (donorId === Number(recipientId)) {
      return res.status(400).json({ error: "Өөртөө хандив өгөх боломжгүй" });
    }

    const token = jwt.sign(
      {
        donorId,
        recipientId: Number(recipientId),
        amount,
        specialMessage,
        socialURLOrBuyMeACoffee,
      },
      process.env.QR_SECRET || "default-secret-key-for-development",
      { expiresIn: "10m" } // QR 10 минут хүчинтэй
    );

    const confirmUrl = `${
      process.env.FRONTEND_BASE_URL || "http://localhost:3000"
    }/confirm?token=${encodeURIComponent(token)}`;

    const qrCode = await QRCode.toDataURL(confirmUrl);
    return res.status(200).json({ qrCode, token }); // token-оо desktop талд polling-д ашиглана
  } catch (err) {
    console.error("getDonationQR error:", err);
    return res.status(500).json({ error: "QR код үүсгэж чадсангүй" });
  }
};

// 2) Утсаар скан хийж орж ирэхэд donation-г баталгаажуулж ҮҮСГЭХ
export const confirmDonationFromQR = async (req: Request, res: Response) => {
  try {
    const { token } = req.body as { token: string };
    if (!token) return res.status(400).json({ error: "Token шаардлагатай" });

    const decoded = jwt.verify(
      token,
      process.env.QR_SECRET || "default-secret-key-for-development"
    ) as QRPayload;

    const donation = await prisma.donation.create({
      data: {
        amount: decoded.amount,
        specialMessage: decoded.specialMessage || "",
        socialURLOrBuyMeACoffee: decoded.socialURLOrBuyMeACoffee || "",
        donor: { connect: { id: decoded.donorId } },
        recipient: { connect: { id: decoded.recipientId } },
      },
    });

    return res
      .status(200)
      .json({ status: "confirmed", donationId: donation.id });
  } catch (err: any) {
    console.error("confirmDonationFromQR error:", err);
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({ error: "QR token хугацаа дууссан" });
    }
    return res.status(500).json({ error: "Confirm хийхэд алдаа гарлаа" });
  }
};

// 3) Desktop тал polling: энэ token-оор ҮҮССЭН donation байна уу шалгах
export const peekDonationByToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.query as { token?: string };
    if (!token) return res.status(400).json({ error: "Token шаардлагатай" });

    const decoded = jwt.verify(
      token,
      process.env.QR_SECRET || "default-secret-key-for-development"
    ) as QRPayload;

    // “pending” хүснэгтгүй тул яг ижил талбаруудаар хамгийн сүүлд үүссэн нэгийг хайна
    const donation = await prisma.donation.findFirst({
      where: {
        donorId: decoded.donorId,
        recipientId: decoded.recipientId,
        amount: decoded.amount,
        specialMessage: decoded.specialMessage || "",
        socialURLOrBuyMeACoffee: decoded.socialURLOrBuyMeACoffee || "",
      },
      orderBy: { createdAt: "desc" },
    });

    if (donation) {
      return res
        .status(200)
        .json({ status: "confirmed", donationId: donation.id });
    }
    return res.status(200).json({ status: "waiting" });
  } catch (err: any) {
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({ error: "QR token хугацаа дууссан" });
    }
    console.error("peekDonationByToken error:", err);
    return res.status(500).json({ error: "Статус шалгахад алдаа" });
  }
};
