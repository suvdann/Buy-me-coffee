// import "./globals.css";
import Image from "next/image";

export default function Authlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 h-screen bg-amber-400 flex flex-col items-center justify-center">
        <div className=" ">
          <Image
            src={"/illustration.png"}
            alt="logo "
            width={240}
            height={240}
            className=""
          ></Image>
        </div>
        <div className=" flex flex-col items-center w-[455px] h-[90px]">
          {" "}
          <h1 className="text-[24px] font-bold">Fund your creative work</h1>
          <p className="text-[26px]">
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </p>
        </div>
      </div>

      <div className="w-1/2 h-screen flex items-center justify-center ">
        {children}
      </div>
    </div>
  );
}
