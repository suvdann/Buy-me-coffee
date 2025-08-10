"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setStatus("error");
        setMsg("Token олдсонгүй");
        return;
      }
      try {
        setStatus("loading");
        const res = await axios.post("http://localhost:8000/confirm", {
          token,
        });
        if (res.data?.status === "confirmed") {
          setStatus("done");
        } else {
          setStatus("error");
          setMsg("Confirm амжилтгүй");
        }
      } catch (e: any) {
        setStatus("error");
        setMsg(e?.response?.data?.error || "Confirm хийхэд алдаа");
      }
    };
    run();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="p-8 w-full max-w-md text-center">
        {status === "loading" && <p>Таны хандивыг баталгаажуулж байна...</p>}
        {status === "done" && (
          <>
            <h1 className="text-xl font-semibold mb-2">
              Donation Confirmed ✅
            </h1>
            <p className="mb-4">Баярлалаа!</p>
            <Button onClick={() => router.push("/")}>Нүүр рүү буцах</Button>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-xl font-semibold mb-2 text-red-600">
              Амжилтгүй ❌
            </h1>
            <p className="mb-4">{msg}</p>
            <Button variant="outline" onClick={() => router.push("/")}>
              Нүүр рүү
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
