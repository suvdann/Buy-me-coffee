import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const HomeSidebar = () => {
  return (
    <div className=" ml-[30px]">
      <div className="flex flex-col w-[251px] h-screen">
        <Link href={"/"}>
          <Button variant={"ghost"} className="justify-start w-full ">
            Home
          </Button>
        </Link>
        <Link href={"/explore"}>
          <Button variant={"ghost"} className="justify-start w-full">
            Explore
          </Button>
        </Link>
        <Link href={"/view"}>
          <Button
            variant={"ghost"}
            className="flex justify-start w-full  items-center ml-1 "
          >
            View Page
            <ExternalLink className="w-[4px] " />
          </Button>
        </Link>
        <Link href={"/settings"}>
          <Button variant={"ghost"} className="justify-start w-[250px]">
            Account Settings
          </Button>
        </Link>
      </div>
    </div>
  );
};
