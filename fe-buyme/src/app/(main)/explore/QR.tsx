"use client";

import { useState } from "react";
import QRCode from "qrcode";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface QRDialogProps {
  donorId: string | null | undefined;
  recipientId: number;
  amount: number;
  message: string;
  socialURL: string;
  handleDonation: () => void;
}

export const QRDialog = ({
  donorId,
  recipientId,
  amount,
  message,
  socialURL,
  handleDonation,
}: QRDialogProps) => {
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState("");

  // QR код үүсгэх
  const handleGenerateQR = async () => {
    const qrPayload = {
      donorId,
      recipientId,
      amount,
      specialMessage: message,
      socialURLOrBuyMeACoffee: socialURL,
    };
    const dataUrl = await QRCode.toDataURL(JSON.stringify(qrPayload));
    setQr(dataUrl);
  };

  // Donation үүсгэх

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="mt-4"
          onClick={() => {
            setOpen(true);
            handleGenerateQR();
          }}
        >
          Support
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
          <DialogDescription>
            {qr ? (
              <img src={qr} alt="qr code" className="mx-auto" />
            ) : (
              <p>Generating QR...</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            onClick={async () => {
              await handleDonation();
              setOpen(false);
            }}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
