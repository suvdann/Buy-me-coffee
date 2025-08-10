"use client";

import { useAuth } from "@/app/_components/UserProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Coffee } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type UserProfile = {
  id: string;
  email: string;
  name: string;
  avatarImage: string;
  about: string;
  socialMediaURL: string;
};

function QRCodeImage({ base64 }: { base64: string }) {
  // backend зөвхөн base64 буцаадаг бол data URI prefix нэмнэ
  const src = base64?.startsWith("data:image")
    ? base64
    : `data:image/png;base64,${base64}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <img src={src} alt="QR Code" className="w-56 h-56 border rounded" />
      <p className="text-xs text-muted-foreground">
        Утсаараа скан хийгээд хандив баталгаажуулна.
      </p>
    </div>
  );
}

const UserProfilePage = () => {
  const { user, token } = useAuth();
  const params = useParams();
  const router = useRouter();

  // useParams төрлийн баталгаажуулалт
  const userId = useMemo(() => {
    const raw = (params as Record<string, string | string[]>).userId;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");
  const [socialURL, setSocialURL] = useState("");
  const [qrCode, setQrCode] = useState<string>("");
  const [donationComplete, setDonationComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:8000/user/${userId}`);
        setUserData(res.data.user);
      } catch (error: any) {
        console.error("Алдаа гарлаа:", error);
        setErr(error?.response?.data?.message || "Хэрэглэгчийн мэдээлэл татахад алдаа гарлаа");
      }
    };
    fetchUser();
  }, [userId]);

  // Cleanup polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const handleDonation = async () => {
    try {
      setLoading(true);
      setErr("");

      if (!token) {
        router.push("/login");
        return;
      }
      if (!userId) {
        setErr("Хүлээн авагчийн ID буруу байна.");
        return;
      }
      if (String(user?.userId) === String(userId)) {
        setErr("Өөртөө хандив өгөх боломжгүй.");
        return;
      }

      // QR үүсгэх
      const qrRes = await axios.post(
        "http://localhost:8000/qr",
        {
          amount,
          specialMessage: message,
          socialURLOrBuyMeACoffee: socialURL,
          recipientId: Number(userId),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { qrCode: base64, token: qrToken } = qrRes.data;
      if (!base64) {
        setErr("QR код үүсгэхэд алдаа гарлаа.");
        return;
      }

      setQrCode(base64);
      setDonationComplete(true);

      // Polling to check if donation was confirmed
      const interval = setInterval(async () => {
        try {
          const pollRes = await axios.get(
            `http://localhost:8000/peek?token=${encodeURIComponent(qrToken)}`
          );
          
          if (pollRes.data?.status === "confirmed") {
            clearInterval(interval);
            setPollingInterval(null);
            setDonationComplete(false);
            setQrCode("");
            setAmount(1);
            setMessage("");
            setSocialURL("");
            setSuccessMessage("Хандив амжилттай үүслээ! 🎉");
            // Clear success message after 5 seconds
            setTimeout(() => setSuccessMessage(""), 5000);
          }
        } catch (error) {
          console.error("Polling error:", error);
        }
      }, 2000); // Check every 2 seconds

      setPollingInterval(interval);

      // Stop polling after 10 minutes (QR token expires)
      setTimeout(() => {
        clearInterval(interval);
        setPollingInterval(null);
      }, 10 * 60 * 1000);

    } catch (e: any) {
      console.error("Donation алдаа:", e);
      setErr(e?.response?.data?.error || "Хандив үүсгэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-[270px] left-1/2 transform -translate-x-1/2 flex gap-6 px-4 max-w-[1320px]">
      <div className="w-[632px] h-[625px] flex flex-col gap-5">
        <Card className="p-5">
          <div className="flex gap-3 border-b pb-4">
            <img
              src={userData?.avatarImage}
              alt="avatar"
              className="rounded-full border w-[48px] h-[48px] object-cover"
            />
            <div>
              <h1 className="text-[16px] font-bold">{userData?.name}</h1>
              <p className="text-sm text-muted-foreground">{userData?.email}</p>
            </div>
          </div>
          <Label className="mt-4 mb-1">About</Label>
          <p className="text-sm">{userData?.about}</p>
        </Card>
        <Card className="p-5">
          <h1 className="text-[16px] font-semibold">Social media URL</h1>
          <p className="text-sm break-all">{userData?.socialMediaURL}</p>
        </Card>
        <Card className="p-5">
          <h1 className="text-[16px] font-semibold">Recent Supporters</h1>
          <p className="text-sm">coming soon...</p>
        </Card>
      </div>

      <div className="w-[628px]">
        <Card className="p-6 flex flex-col gap-4">
          <h1 className="text-[24px] font-semibold">
            Buy {userData?.name} a Coffee
          </h1>

          {err && (
            <div className="text-red-600 text-sm border border-red-200 bg-red-50 p-2 rounded">
              {err}
            </div>
          )}

          {successMessage && (
            <div className="text-green-600 text-sm border border-green-200 bg-green-50 p-2 rounded">
              {successMessage}
            </div>
          )}

          {!donationComplete ? (
            <>
              <div>
                <p className="mb-2">Select amount:</p>
                <div className="flex gap-3 flex-wrap">
                  {[1, 2, 5, 10].map((price) => (
                    <Button
                      key={price}
                      type="button"
                      variant={amount === price ? "default" : "outline"}
                      className="w-[72px] h-[40px] justify-center gap-1"
                      onClick={() => setAmount(price)}
                    >
                      <Coffee size={16} />
                      {price}$
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>BuyMeCoffee or social URL:</Label>
                <Input
                  placeholder="buymeacoffee.com/username"
                  value={socialURL}
                  onChange={(e) => setSocialURL(e.target.value)}
                />
              </div>

              <div>
                <Label>Special message:</Label>
                <Input
                  placeholder="Please write your message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Button
                type="button"
                onClick={handleDonation}
                disabled={loading || !token || String(user?.userId) === String(userId)}
              >
                {loading ? "Processing..." : "Support"}
              </Button>
              {!token && (
                <p className="text-xs text-muted-foreground">
                  Хандив өгөхийн өмнө нэвтэрнэ үү.
                </p>
              )}
            </>
          ) : (
            // ✅ SUPPORT дарахад энд QR харагдана
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-lg font-semibold">Scan this QR to confirm</h2>
              <QRCodeImage base64={qrCode} />
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    if (pollingInterval) {
                      clearInterval(pollingInterval);
                      setPollingInterval(null);
                    }
                    setDonationComplete(false);
                    setQrCode("");
                  }}
                >
                  Cancel
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/")}>
                  Back to Home
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserProfilePage;
