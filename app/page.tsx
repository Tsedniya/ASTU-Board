import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[#191970] mb-6 text-5xl md:text-6xl font-bold leading-tight">
              Stay updated with everything happening at ASTU.
            </h1>

            <p className="mb-10 text-xl text-muted-foreground ">
              personalized announcements, deadlines, and opportunities tailored to your department.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8 text-lg bg-[#191970] font-medium flex items-center">
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}