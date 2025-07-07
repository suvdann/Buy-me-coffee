"use client";
import { useAuth } from "@/app/_components/UserProvider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";
const countries = [
  { label: "Mongolia", value: "MN" },
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "UK" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Japan", value: "JP" },
  { label: "South Korea", value: "KR" },
  { label: "China", value: "CN" },
  { label: "India", value: "IN" },
  { label: "New Zealand", value: "NZ" },
  { label: "Russia", value: "RU" },
];
const AccountSettings = () => {
  const user = useAuth();

  return (
    <div className="flex flex-col gap-8 ml-[74px]">
      <h1 className="font-bold text-2xl mb-4">My account</h1>

      <Card className="w-[650px] h-[671px] rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Personal Info</h2>

        <Label className="">Add photo</Label>

        <div className="relative w-[160px] h-[160px]">
          <img
            src={user.user?.profile?.avatarImage}
            alt="photo"
            className="rounded-full w-full h-full object-cover border"
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <Camera className="w-5 h-5 " />
          </div>
        </div>
        <Label>Name</Label>
        <Input value={user.user?.profile?.name} />
        <Label>About</Label>
        <Input value={user.user?.profile?.about} />
        <Label>Social media URL</Label>
        <Input value={user.user?.profile?.socialMediaURL} />
        <Button>Save changes</Button>
      </Card>
      <Card className="w-[650px] h-[300px] p-6">
        <h1>Set a new password</h1>
        <Label>New password</Label>
        <Input placeholder="Enter new password"></Input>
        <Label>Confirm password</Label>
        <Input placeholder="Confirm password"></Input>
        <Button>Save changes</Button>
      </Card>
      <Card className="w-[650px] h-[480px] p-6">
        <h1>Payment details</h1>
        <Label></Label>
        <select name="" id="" className="border-2 rounded-md">
          {countries.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <div className="flex ">
          <div>
            <Label>First name</Label>
            <Input placeholder=""></Input>
          </div>
          <div>
            <Label>Last name</Label>
            <Input></Input>
          </div>
        </div>
        <Label>Enter card number</Label>
        <Input placeholder="XXXX-XXXX-XXXX-XXXX" className="w-full" />
        <div className="flex justify-between">
          <div className="">
            <Label>Expires</Label>{" "}
            <select name="" id="" className="border">
              <option value=""></option>
            </select>
          </div>
          <div>
            {" "}
            <Label>Expires</Label>{" "}
            <select name="" id="" className="border">
              <option value=""></option>
            </select>
          </div>
          <div>
            {" "}
            <Label>Expires</Label>{" "}
            <select name="" id="" className="border">
              <option value=""></option>
            </select>
          </div>
        </div>
        <Button>Save changes</Button>
      </Card>
      <Card className="w-[650px] h-[317px] p-6">
        <h1>Success page</h1>
        <Label>Confirmation message</Label>
        <Textarea></Textarea>
        <Button>Save changes</Button>
      </Card>
    </div>
  );
};

export default AccountSettings;
