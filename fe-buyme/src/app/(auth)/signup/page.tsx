"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignUsername } from "./_components/SignUsername";

import { useState } from "react";
import { SignupPassword } from "./_components/SignupPassword";

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
    <div className="">
      <Stepper
        changeHandler={changeHandler}
        username={username}
        setUsername={setUsername}
      />
    </div>
  );
};
export default SignUpPage;
