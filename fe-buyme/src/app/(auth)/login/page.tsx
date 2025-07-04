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
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/app/_components/UserProvider";
import axios from "axios";
import { useEffect } from "react";

// type Props = {
//   username: string;
// };{ username }: Props
const LoginPage = () => {
  const router = useRouter();
  const { user, tokenChecker } = useAuth();
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
    console.log("Logging in with:", values);
    try {
      const res = await axios.post("http://localhost:8000/login", {
        email: values.email,

        password: values.password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", values.email);

      if (!res.data.hasProfile) {
        router.push("/create-profile");
      } else {
        router.push("/"); // эсвэл dashboard
      }
      await tokenChecker(res.data.token);
    } catch (err: any) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };
  // if (user) {
  //   redirect("/");
  // }
  // useEffect(() => {
  // if (user) {
  //   if (!user.profile) {
  //     redirect("/create-profile");
  //   } else {
  //     redirect("/");
  //   }
  // }
  // }, [user]);

  return (
    <div className="">
      <Button
        variant={"outline"}
        className="absolute top-8 right-20  rounded-md"
        onClick={() => redirect("/signup")}
      >
        Sign up
      </Button>
      <h1 className="text-[24px] font-bold">Welcome back</h1>

      <Form {...form}>
        <form
          className="space-y-6 w-[407px] "
          onSubmit={form.handleSubmit(handleSubmit)}
        >
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

          <Button
            type="submit"
            className="w-full h-[40px]"
            disabled={!form.formState.isValid}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default LoginPage;
