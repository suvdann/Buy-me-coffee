"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAuth } from "../_components/UserProvider";

export const Header = () => {
  const user = useAuth();
  return (
    <div className="w-full h-[80px]">
      <div className="flex justify-between ml-[80px] mt-[16px] mr-[80px]">
        <img src={"/Logo.png"} alt="logo" className="w-[151px] h-[24px]" />

        <Popover>
          <PopoverTrigger className="w-[187px] flex justify-between">
            <div className="flex items-center  ">
              {" "}
              <img
                src={user.user?.profile?.avatarImage}
                alt="photo"
                className="rounded-full w-[40px] h-[40px]"
              />
              <h1 className="text-[14px] font-bold flex ">
                {user.user?.profile?.name ?? "No user"}
              </h1>{" "}
            </div>

            <ChevronDown />
          </PopoverTrigger>
          <PopoverContent className="">
            <Button
              variant={"outline"}
              className="w-[187px] h-[40px] bg-white mt-2"
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
