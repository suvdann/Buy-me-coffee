"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CreateProfileHeader } from "./_components/CreateProfileHeader";
import { CompleteProfileForm } from "./_components/CompleteProfileForm";
import { Payment } from "./_components/Payment";
import { useState } from "react";
import { Loading } from "./_components/Loading";

const CreateProfilePage = () => {
  const arr = [CompleteProfileForm, Payment, Loading];
  const [index, setIndex] = useState(0);
  // const [username, setUsername] = useState("");
  const changeHandler = () => {
    setIndex((prev) => prev + 1);
    // setTimeout(()=>)
  };
  const Stepper = arr[index];
  return (
    <div className="flex flex-col">
      <div>
        <CreateProfileHeader />
      </div>

      <div>
        {/* <CompleteProfileForm /> */}
        <Stepper changeHandler={changeHandler} />
      </div>
    </div>
  );
};
export default CreateProfilePage;
