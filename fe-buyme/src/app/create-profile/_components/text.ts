"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Camera } from "lucide-react";
import { Label } from "@radix-ui/react-label";

const profileSchema = z.object({
  photo: z
    .instanceof(FileList)
    .refine((file) => file.length > 0, { message: "Please enter image" }),
  name: z.string().min(1, "Please enter name"),
  about: z.string().min(1, "Please enter info about yourself"),
  social: z.string().url("Please enter a social link"),
});

export const CompleteProfileForm = () => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      about: "",
      social: "",
      photo: undefined,
    },
  });

  const [preview, setPreview] = useState<string>("");

  const watchPhoto = form.watch("photo");

  useEffect(() => {
    if (watchPhoto && watchPhoto.length > 0) {
      const file = watchPhoto[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [watchPhoto]);

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log("submitted:", values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-[510px] flex flex-col gap-4">
        <h1 className="font-bold text-[24px]">Complete your profile page</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* PHOTO */}
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
                      {preview ? (
                        <img
                          src={preview}
                          alt="preview"
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <Camera className="w-6 h-6" />
                      )}
                      <Input
                        id="photo-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </Label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NAME */}
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

            {/* ABOUT */}
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

            {/* SOCIAL */}
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

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={!form.formState.isValid}
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
