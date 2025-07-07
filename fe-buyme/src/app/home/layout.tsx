import { HomeSidebar } from "../_components/sidebar";
import { Header } from "./Header";

export default function Authlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <HomeSidebar />
      {children}
    </div>
  );
}
