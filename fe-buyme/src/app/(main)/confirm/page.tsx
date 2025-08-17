// 6. ConfirmPage.tsx-г өөрчлөх:
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "done" | "error";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const [donationData, setDonationData] = useState<any>(null);

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setStatus("error");
        setMsg("Token олдсонгүй");
        return;
      }
      try {
        setStatus("loading");
        const res = await axios.post("http://localhost:8000/donation/confirm", {
          token,
        });

        if (res.data?.status === "confirmed") {
          setStatus("done");
          setDonationData(res.data.donation);

          // 3 секундын дараа success page руу шилжих
          setTimeout(() => {
            const params = new URLSearchParams({
              donationId: res.data.donation.id.toString(),
              amount: res.data.donation.amount.toString(),
              recipientName: res.data.donation.recipient.name,
              recipientId: res.data.donation.recipient.id.toString(),
            });
            router.push(`/success?${params.toString()}`);
          }, 2000);
        } else {
          setStatus("error");
          setMsg(res.data?.message || "Confirm амжилтгүй");
        }
      } catch (e: any) {
        setStatus("error");
        setMsg(e?.response?.data?.error || "Confirm хийхэд алдаа");
      }
    };
    run();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="p-8 w-full max-w-md text-center">
        {status === "loading" && (
          <div className="space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto" />
            <p>Таны хандивыг баталгаажуулж байна...</p>
          </div>
        )}

        {status === "done" && (
          <>
            <h1 className="text-xl font-semibold mb-2 text-green-600">
              Баталгаажлаа ✅
            </h1>
            <p className="mb-4">
              {donationData?.amount}$ хандив амжилттай үүслээ!
            </p>
            <p className="text-sm text-muted-foreground">
              Удахгүй success хуудас руу шилжих болно...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-xl font-semibold mb-2 text-red-600">
              Амжилтгүй ❌
            </h1>
            <p className="mb-4 text-red-600">{msg}</p>
            <Button variant="outline" onClick={() => router.push("/")}>
              Нүүр рүү буцах
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}

// 7. Package.json-д jsonwebtoken нэмэх:
/*
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
*/
