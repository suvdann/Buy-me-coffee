import { Request, Response } from "express";
import QRCode from "qrcode";

export const generateQR = async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text шаардлагатай" });
  }

  try {
    const qrCode = await QRCode.toDataURL(text); // base64 QR зураг
    res.status(200).json({ qrCode });
  } catch (err) {
    console.error("QR код үүсгэхэд алдаа:", err);
    res.status(500).json({ error: "QR код үүсгэж чадсангүй" });
  }
};
