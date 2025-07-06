"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  changeHandler: () => void;
};
export const Loading = ({ changeHandler }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className=" flex items-center min-h-screen justify-center bg-white">
      <div className="flex flex-col justify-center items-center">
        <img src="/Gif.gif" alt="gif " width={150} height={150} />
        <h1 className="font-bold text-[20px]">Loading...</h1>
      </div>
    </div>
  );
};
