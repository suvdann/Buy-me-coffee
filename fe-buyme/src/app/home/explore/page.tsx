import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { ExternalLink, Search } from "lucide-react";

const ExplorePage = () => {
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
      <Card className="w-[909px] p-6 ">
        <div className="flex justify-between">
          <div className="flex gap-[12px] items-center">
            <img
              src=""
              alt="photo"
              className="border rounded-full w-[40px] h-[40px]"
            />
            <p className="text-[20px] font-semibold">name</p>
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
            <Label>About ..</Label>
            <Textarea></Textarea>
          </div>
          <div className="w-[420px]">
            {" "}
            <Label>Social media URL</Label>
            <Textarea></Textarea>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default ExplorePage;
