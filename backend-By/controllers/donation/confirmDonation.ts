import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const confirmDonation = async (req: Request, res: Response) => {
  const { donationId } = req.params;

  try {
    const donation = await prisma.donation.findUnique({
      where: { id: Number(donationId) },
      include: {
        donor: true,
        recipient: true,
      },
    });

    if (!donation) return res.status(404).json({ error: "Donation олдсонгүй" });

    res.status(200).json({ donation });
  } catch (err) {
    console.error("Confirm алдаа:", err);
    res.status(500).json({ error: "Confirm хийхэд алдаа гарлаа" });
  }
};
