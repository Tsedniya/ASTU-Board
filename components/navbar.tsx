"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth/auth-client";

export default function Navbar() {
  const { data: session } = useSession();

  // If the user is logged in, don't render anything
  if (session?.user) return null;

  // Otherwise, show the public navbar
  return (
    <nav className="border-b border-gray-200 bg-surface-container-high">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          ASTU Board
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-on-surface hover:text-primary">
              Log In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}