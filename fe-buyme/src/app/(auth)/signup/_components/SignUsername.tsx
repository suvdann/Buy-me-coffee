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
import { useEffect, useState } from "react";

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
  const takenUsernames = ["baconpancakes", "suvee", "coffeequeen"];
  const signUpSchema = z.object({
    username: z.string().min(2, "username is too short").max(20),
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
    },
  });
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    const username = form.watch("username");
    if (!username || username.length < 2) {
      setIsAvailable(null);
      return;
    }
    const delay = setTimeout(() => {
      setIsAvailable(!takenUsernames.includes(username.toLowerCase()));
    }, 500); // debounce

    return () => clearTimeout(delay);
  }, [form.watch("username")]);

  const handleSubmit = (values: z.infer<typeof signUpSchema>) => {
    if (!isAvailable) return;
    setUsername(values.username);
    localStorage.setItem("signup_username", values.username); // хадгалах
    changeHandler();
  };

  return (
    <div className=" gap-2">
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
                {isAvailable === false && (
                  <p className="text-sm text-red-600 mt-1">
                    ❌ This username is already taken
                  </p>
                )}
                {isAvailable === true && (
                  <p className="text-sm text-green-600 mt-1">
                    ✅ Username is available
                  </p>
                )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-[359px] h-[40px]"
            disabled={!isAvailable}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
