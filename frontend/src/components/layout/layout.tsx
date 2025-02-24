import React from "react";
import { Sidebar } from "../ui/sidebar";
import { useAuthToken } from "@/hooks/requests/useAuthDetails";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const token = useAuthToken()
  return (
    <div className="flex h-screen bg-gray-50">
    {token && <Sidebar/>}
      {children}
    </div>
  );
}
