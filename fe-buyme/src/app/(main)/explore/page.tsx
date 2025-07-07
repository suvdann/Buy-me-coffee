"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

import { ExternalLink, Search, User } from "lucide-react";
import { useEffect, useState } from "react";

const ExplorePage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const alluser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/users");
      setUsers(res.data.user); //irsen datagaa end hadgalan
      console.log("yu irej baina", res.data.user);
    } catch (error) {
      console.error("aldaa garsan:", error);
    }
  };

  useEffect(() => {
    alluser();
  }, []);

  return (
    <div className="w-[957px] flex flex-col gap-8">
      <h1 className="text-[20px] font-bold">Explore creators</h1>

      <div className="flex justify-center items-center border w-[243px] rounded-lg bg-white">
        <Search className="w-4 h-4 text-gray-400" />
        <Input
          placeholder=" Search name"
          className=" border-none focus:outline-none p-0 focus-visible:ring-0 focus-visible:outline-none"
        />
      </div>
      {/* {users.map((user: any) => (
          <div
            key={user.id}
            className="border p-3 rounded-md shadow-sm bg-white"
          >
            <p className="font-semibold">Нэр: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ))} */}
      {users.length === 0 ? (
        <div className="flex flex-col">
          <User />
          <p>No creators have signed up yet</p>
        </div>
      ) : (
        users.map((user: any) => (
          <Card className="w-[909px] p-6 " key={user.id}>
            <div className="flex justify-between">
              <div className="flex gap-[12px] items-center">
                <img
                  src={user.avatarImage}
                  alt="photo"
                  className="border rounded-full w-[40px] h-[40px]"
                />
                <p className="text-[20px] font-semibold">{user.name}</p>
              </div>
              <Button
                variant={"outline"}
                className="w-[136px] h-[40px] bg-[#F4F4F5]"
              >
                View profile <ExternalLink className="w-[4px] " />
              </Button>
            </div>
            <div className="flex gap-5 ">
              <div className="w-[420px]">
                {" "}
                <Label>About {user.name}</Label>
                <p>{user.about}</p>
              </div>
              <div className="w-[420px]">
                {" "}
                <Label>Social media URL</Label>
                <p className="text-[14px]"></p>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};
export default ExplorePage;
