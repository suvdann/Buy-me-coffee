import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import QRCode from "qrcode";
export const createDonation = async (req: Request, res: Response) => {
  const donorId = res.locals.userId;
  const { amount, specialMessage, socialURLOrBuyMeACoffee, recipientId } =
    req.body;

  try {
    const donation = await prisma.donation.create({
      data: {
        amount,
        specialMessage,
        socialURLOrBuyMeACoffee,
        donor: { connect: { id: donorId } },
        recipient: { connect: { id: recipientId } },
      },
    });
    // const qrData = JSON.stringify({
    //   amount,
    //   specialMessage,
    //   socialURLOrBuyMeACoffee,
    //   donorId,
    //   recipientId,
    //   donationId: donation.id,
    // });
    // QR кодын dataURL үүсгэх
    // const qrImageUrl = await QRCode.toDataURL(qrData);
    res.status(200).json({ donation });
  } catch (err) {
    console.log(" Donation error:", err);
    res.status(500).json({ error: "Donation үүсгэж чадсангүй" });
  }
};
