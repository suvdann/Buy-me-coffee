"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
export const CreateProfileHeader = () => {
  return (
    <div className="w-full h-[80px]">
      <Image
        src={"/Logo.png"}
        alt="logo"
        width={147}
        height={20}
        className="absolute   top-10 left-20 z-100"
      ></Image>
      <Button
        variant={"outline"}
        className="absolute top-8 right-20  rounded-md"
        onClick={() => redirect("/login")}
      >
        Logout
      </Button>
    </div>
  );
};
