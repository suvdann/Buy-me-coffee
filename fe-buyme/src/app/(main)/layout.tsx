import { HomeSidebar } from "../_components/sidebar";
import { Header } from "../_components/Header";

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
