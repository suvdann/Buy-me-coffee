"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAuth } from "./UserProvider";

export const Header = () => {
  const user = useAuth();
  return (
    <div className="w-screen h-fit p-2 border">
      <div className="flex justify-between">
        <Image src={"/Logo.png"} alt="logo" width={151} height={24} />

        <Popover>
          <PopoverTrigger className="w-[187px] flex justify-between">
            <div className="flex items-center gap-1">
              {" "}
              <img src="" alt="photo" className="rounded-full" />
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
