"use client";
import { useAuth } from "@/app/_components/UserProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import Image from "next/image";

const Dashboard = () => {
  const user = useAuth();

  return (
    <div className="ml-100 w-[907px] flex flex-col gap-6">
      <Card className=" h-[257px] p-6">
        <div className=" flex justify-between border-b">
          <div className="flex gap-1">
            <img
              src=""
              alt="zurag"
              className=" rounded-full border w-[48px] h-[48px]"
            />
            <div>
              <h1 className="text-[16px] font-bold"></h1>
              <p>end link</p>
            </div>
          </div>
          <Button>
            <Copy />
            Share page link
          </Button>
        </div>
        <div>
          <h1>Earnings</h1>
          <p>120$</p>
          <select className="w-[175px] h-[40px] rounded-md">
            <option value="">last 30 days</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
          </select>
        </div>
      </Card>
      <div className="flex justify-between">
        <p className="text-[16px] font-semibold">Recent transactions</p>
        <select name="" id="">
          <option value="">A</option>
          <option value="">B</option>
          <option value="">C</option>
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
