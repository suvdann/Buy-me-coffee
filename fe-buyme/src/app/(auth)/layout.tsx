// import "./globals.css";
import Image from "next/image";
import { LoginHome } from "./page";

export default function Authlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex ">
      <div className="relative w-1/2 h-screen bg-amber-400 flex flex-col items-center justify-center">
        <Image
          src={"/Logo.png"}
          alt="logo"
          width={147}
          height={20}
          className="absolute   top-10 left-20 z-100"
        ></Image>

        <div className=" flex flex-col items-center justify-center">
          <Image
            src={"/illustration.png"}
            alt="logo "
            width={240}
            height={240}
            className=""
          ></Image>

          <h1 className="text-[24px] font-bold ">Fund your creative work</h1>
          <p className="text-[16px] text-center">
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </p>
        </div>
      </div>

      <div className="relative w-1/2 h-screen flex items-center justify-center ">
        {children}
      </div>
    </div>
  );
}
