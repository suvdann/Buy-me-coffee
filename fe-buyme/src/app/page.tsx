import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeSidebar } from "./_components/sidebar";
import { Header } from "./home/Header";
import Dashboard from "./_components/dashboard";

const Home = () => {
  return (
    <div className="flex">
      <div className=" ">
        <HomeSidebar />
      </div>
      <Dashboard />
    </div>
  );
};
export default Home;
