"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/app/(main)/Header";

export function HeaderWrapper() {
  const pathname = usePathname();
  const excludeHeaderPages = ["/login", "/signup"];
  const showHeader = !excludeHeaderPages.includes(pathname);

  return showHeader ? <Header /> : null;
}
