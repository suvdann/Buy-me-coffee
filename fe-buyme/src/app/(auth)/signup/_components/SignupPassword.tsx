"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import axios from "axios";

type Props = {
  username: string;
};

export const SignupPassword = ({ username }: Props) => {
  const router = useRouter();
  const signUpSchema = z.object({
    email: z.string().email("Зөв имэйл хаяг оруулна уу"),
    password: z.string().min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой"),
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof signUpSchema>) => {
    console.log(values.email, values.password);

    try {
      const res = await axios.post(
        "http://localhost:8000/signup",
        {
          username,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // if (!res.ok) {
      //   const error = await res.json();
      //   console.error(" Signup failed:", error.message);
      //   return;
      // }

      // localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/login");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="gap-2">
      <h1 className="text-[24px] font-bold">Welcome,{username}</h1>
      <p className="text-[14px] text-[#71717A]">
        Connect email and set a password
      </p>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-[40px]">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
