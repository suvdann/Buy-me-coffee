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
import { useState } from "react";
import { SignupPassword } from "./SignupPassword";
type signRightProps = {
  changeHandler: () => void;
  username: string;
  setUsername: (value: string) => void;
};

export const SignUsername = ({
  changeHandler,
  setUsername,
  username,
}: signRightProps) => {
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
    setUsername(values.username);
    changeHandler();
    //  username(values.username);
  };

  return (
    <div className="gap-2">
      <h1 className="text-[24px] font-bold">Create your account</h1>
      <p className="text-[14px] text-[#71717A]">
        Choose a username for your page
      </p>

      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username here" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-[359px] h-[40px]">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
