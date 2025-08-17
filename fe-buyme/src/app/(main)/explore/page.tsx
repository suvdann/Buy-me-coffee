"use client";
import { useAuth } from "@/app/_components/UserProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Coffee, CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QRDialog } from "./QR";
import { toast } from "sonner";
type UserProfile = {
  id: string;
  email: string;
  name: string;
  avatarImage: string;
  about: string;
  socialMediaURL: string;
};

export default function ExplorePage() {
  const { user, token } = useAuth();
  const params = useParams();
  const router = useRouter();
  const userId = params.userId;

  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");
  const [socialURL, setSocialURL] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/user/${userId}`);
        setUserData(res.data.user);
        console.log(setUserData);
      } catch (error) {
        console.error("Алдаа гарлаа:", error);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleDonation = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/createDonation",
        {
          amount,
          specialMessage: message,
          socialURLOrBuyMeACoffee: socialURL,
          donorId: user?.userId,
          recipientId: Number(userId),
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Donation амжилттай илгээгдлээ!", {
        icon: "🎉",
        duration: 5000,
        style: { background: "#ffeb3b", color: "#222" },
      });
    } catch (err) {
      console.error("Donation алдаа:", err);
      return "";
    }
  };

  return (
    <div className="absolute top-[270px] left-1/2 transform -translate-x-1/2 flex gap-6 px-4 max-w-[1320px]">
      <div className="w-[632px] h-[625px] flex flex-col gap-5">
        <Card className="p-5">
          <div className="flex gap-3 border-b pb-4">
            <img
              src={userData?.avatarImage}
              alt="zurag"
              className="rounded-full border w-[48px] h-[48px]"
            />
            <div>
              <h1 className="text-[16px] font-bold">{userData?.name}</h1>
              <p>{userData?.email}</p>
            </div>
          </div>
          <Label>About...</Label>
          <p>{userData?.about}</p>
        </Card>
        <Card className="p-5">
          <h1 className="text-[16px] font-semibold">Social media URL</h1>
          <p>{userData?.socialMediaURL}</p>
        </Card>
        <Card className="p-5">
          <h1 className="text-[16px] font-semibold">Recent Supporters</h1>
          <p>coming soon...</p>
        </Card>
      </div>

      <div className="w-[628px]">
        <Card className="p-6 flex flex-col gap-4">
          <h1 className="text-[24px] font-semibold">
            Buy {userData?.name} a Coffee
          </h1>

          <div>
            <p>Select amount:</p>
            <div className="flex gap-3">
              {[1, 2, 5, 10].map((price) => (
                <Button
                  key={price}
                  variant="outline"
                  className={`w-[72px] h-[40px] ${
                    amount === price ? "bg-black text-white" : "bg-[#F4F4F5]"
                  }`}
                  onClick={() => setAmount(price)}
                >
                  <Coffee />
                  {price}$
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>BuyMeCoffee or social URL:</Label>
            <Input
              placeholder="buymeacoffee.com/"
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
          <QRDialog
            donorId={user?.userId}
            recipientId={Number(userId)}
            amount={amount}
            message={message}
            socialURL={socialURL}
            handleDonation={handleDonation}
          />
        </Card>
      </div>
    </div>
  );
}
