"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Camera } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
type Props = {
  changeHandler: () => void;
};
export const CompleteProfileForm = ({ changeHandler }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState(null);

  const router = useRouter();
  const profileSchema = z.object({
    photo: z.string().min(1, "Please enter image"),
    name: z.string().min(1, "Please enter name"),
    about: z.string().min(1, "Please enter info about yourself"),
    social: z.string().url("Please enter a social link"),
  });

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      photo: undefined,
      name: "",
      about: "",
      social: "",
    },
  });
  const fileHandler = (event: any) => {
    setFile(event?.target.files[0]);
    const imgUrl = URL.createObjectURL(event?.target.files[0]);
    setImageUrl(imgUrl);
  };
  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    if (!file) {
      alert("zurag oruulaagui baina");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Buy-me-coffe");
    const result = await fetch(
      "https://api.cloudinary.com/v1_1/doqgdtl79/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    console.log("hi");
    console.log(formData, "cloudnary dataa");
    const img = await result.json();

    if (!img.secure_url) {
      alert("Зураг upload амжилтгүй боллоо");
    }
    const token = localStorage.getItem("token");
    if (!token) return alert("Token not found");

    //image upload

    // Convert image to base64 (or use upload API)
    // const file = values.photo[0];
    // const reader = new FileReader();
    // reader.onloadend = async () => {
    //   const base64Image = reader.result;

    try {
      const res = await axios.post(
        "http://localhost:8000/profile",
        {
          name: values.name,
          about: values.about,
          socialMediaURL: values.social,
          avatarImage: img.secure_url, //  хадгалах зураг
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // if (res.ok) {
      changeHandler();
      // } else {
      //   alert(data.message);
      // }
    } catch (err) {
      console.error("Profile creation error:", err);
    }
  };

  return (
    <div className="min-h-screen flex  items-center justify-center ">
      <div className="w-[510px] flex flex-col gap-6">
        <h1 className="font-bold text-[24px]">Complete your profile page</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* zurg\ag */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add photo</FormLabel>
                  <FormControl>
                    <Label
                      htmlFor="photo-upload"
                      className="w-[160px] h-[160px] rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer text-gray-400 overflow-hidden"
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="image"
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <Camera className="w-6 h-6" />
                      )}
                      <Input
                        id="photo-upload"
                        type="file"
                        className="hidden"
                        onChange={fileHandler}
                      />
                    </Label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* about*/}
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write about yourself here"
                      {...field}
                      className="h-[131px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* social */}
            <FormField
              control={form.control}
              name="social"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social media URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* button */}
            <Button
              type="submit"
              // disabled={!form.formState.isValid}
              className="w-[246px] h-[40px] self-center"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
