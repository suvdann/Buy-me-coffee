"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Coffee } from "lucide-react";
import { useAuth } from "../_components/UserProvider";

const Donationpage = () => {
  const user = useAuth();
  return (
    <div className="relative ">
      {/* cover */}
      <div className=" w-full h-[319px] bg-[#F4F4F5] flex items-center justify-center cursor-pointer  overflow-hidden ">
        {/* <img src="" alt="" className="object-cover w-full h-full" /> */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <button className=" flex items-center justify-center w-[181px] h-[40px] bg-black rounded-md">
            {" "}
            <Camera className="w-5 h-5 " />
            <p>Add cover image</p>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="absolute top-[270px] left-1/2 transform -translate-x-1/2 flex gap-6 px-4 max-w-[1320px] ">
        <div className="w-[632px] h-[625px] flex flex-col  gap-5">
          <Card className="p-5">
            <div className=" flex justify-between border-b pb-4">
              <div className="flex gap-3">
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
              <Button variant={"outline"}>Edit page</Button>
            </div>
            <Label>About...</Label>
            <p className="">{user.user?.profile?.about}</p>
          </Card>
          <Card className="p-5">
            <h1 className="text-[16px] font-semibold">Social media URL</h1>
            <p>{user.user?.profile?.socialMediaURL}</p>
          </Card>
          <Card className="p-5">
            <h1 className="text-[16px] font-semibold">Recent Supporters</h1>
            <p></p>
          </Card>
        </div>
        <div className="w-[628px] ">
          <Card className="p-6">
            <h1 className="text-[24px] font-semibold">Buy __ a Coffee</h1>
            <div className="">
              <p>Select amount:</p>
              <div className="flex gap-3">
                <Button
                  variant={"outline"}
                  className="w-[72px] h-[40px] bg-[#F4F4F5]"
                >
                  <Coffee />
                  1$
                </Button>
                <Button
                  variant={"outline"}
                  className="w-[72px] h-[40px] bg-[#F4F4F5]"
                >
                  <Coffee />
                  2$
                </Button>
                <Button
                  variant={"outline"}
                  className="w-[72px] h-[40px] bg-[#F4F4F5]"
                >
                  <Coffee />
                  5$
                </Button>
                <Button
                  variant={"outline"}
                  className="w-[72px] h-[40px] bg-[#F4F4F5]"
                >
                  <Coffee />
                  10$
                </Button>
              </div>
            </div>
            <div>
              {" "}
              <p className="text-base">
                Enter BuyMeCoffee or social acount URL:
              </p>
              <Input placeholder="buymeacoffee.com/" className="" />
            </div>
            <div>
              <p>Special message:</p>
              <Input placeholder="Please write your message here"></Input>
            </div>
            <Button disabled={true}> Support</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Donationpage;
