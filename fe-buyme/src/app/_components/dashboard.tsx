"use client";
import { useAuth } from "@/app/_components/UserProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import Image from "next/image";

const Dashboard = () => {
  const user = useAuth();

  return (
    <div className=" w-[907px] flex flex-col gap-6 ml-[180px]">
      <Card className=" h-[257px] p-6">
        <div className=" flex justify-between border-b">
          <div className="flex gap-1">
            <img
              src={user.user?.profile?.avatarImage}
              alt="zurag"
              className=" rounded-full border w-[48px] h-[48px]"
            />
            <div>
              <h1 className="text-[16px] font-bold">
                {user.user?.profile?.name}
              </h1>
              <p>end link</p>
            </div>
          </div>
          <Button>
            <Copy />
            Share page link
          </Button>
        </div>
        <div className="flex gap-6">
          <div>
            <h1 className="text-[20px] font-semibold">Earnings</h1>
            <p className="font-bold text-[36px]">120$</p>
          </div>
          <select className="w-[175px] h-[40px] rounded-md border text-[14px] font-semibold flex p-2">
            <option value="" className="">
              Last 30 days
            </option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
          </select>
        </div>
      </Card>
      <div className="flex justify-between">
        <p className="text-[16px] font-semibold">Recent transactions</p>
        <select
          name=""
          id=""
          className="border-2 border-dashed w-[109px] h-[36px] rounded-md"
        >
          <option>Amount</option>
          <option value="">1$</option>
          <option value="">2$</option>
          <option value="">5$</option>
          <option value="">10$</option>
        </select>
      </div>
      <Card className="w-[907px] h-fit">
        <div className="flex gap-1">
          <img
            src=""
            alt="zurag"
            className=" rounded-full border w-[48px] h-[48px]"
          />
          <div>
            <h1 className="text-[16px] font-bold">ner</h1>
            <p>end link</p>
          </div>
          <p>price</p>
        </div>
      </Card>
    </div>
  );
};
export default Dashboard;
