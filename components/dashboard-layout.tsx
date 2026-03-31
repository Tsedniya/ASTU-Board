"use client";

import Navbar from "./navbar";
import Sidebar from "./student-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-72">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}