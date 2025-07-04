"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUsername } from "./_components/SignUsername";

import { useState } from "react";
import { SignupPassword } from "./_components/SignupPassword";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const SignUpPage = () => {
  const signUpSchema = z.object({
    username: z.string().min(2, "username is too short").max(20),
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
    },
  });
  const handleSubmit = (values: z.infer<typeof signUpSchema>) => {
    console.log(values);
  };
  const arr = [SignUsername, SignupPassword];
  const [index, setIndex] = useState(0);
  const [username, setUsername] = useState("");
  const changeHandler = () => {
    setIndex((prev) => prev + 1);
  };
  const Stepper = arr[index];

  return (
    <div className=" flex  flex-col">
      <Button
        variant={"outline"}
        className="absolute top-8 right-20  rounded-md"
        onClick={() => redirect("/login")}
      >
        Login
      </Button>
      <div className="  flex items-center justify-center">
        <Stepper
          changeHandler={changeHandler}
          username={username}
          setUsername={setUsername}
        />
      </div>
    </div>
  );
};
export default SignUpPage;
