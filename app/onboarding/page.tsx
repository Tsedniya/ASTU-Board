"use client";

import {
  CardFooter,
  CardContent,
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        body: JSON.stringify({ role, department, year }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save profile");
      } else {
        router.push("/student-dashboard"); // redirect after successful update
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 bg-white">
      <Card className="w-full max-w-md border-gray-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-gray-600">
            Help us personalize your experience.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Role */}
            <div className="space-y-2">
              <Label className="text-gray-700">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label className="text-gray-700">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Software">Software Engineering</SelectItem>
                  <SelectItem value="Computer Science and Engineering">
                    Computer Science and Engineering
                  </SelectItem>
                  <SelectItem value="Civil">Civil Engineering</SelectItem>
                  <SelectItem value="Architecture">
                    Architecture Engineering
                  </SelectItem>
                  <SelectItem value="Water">Water Engineering</SelectItem>
                  <SelectItem value="Mechanical">
                    Mechanical Engineering
                  </SelectItem>
                  <SelectItem value="Material">
                    Material Engineering
                  </SelectItem>
                  <SelectItem value="Chemical">Chemical Engineering</SelectItem>
                  <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="Applied Geology">Applied Geology</SelectItem>
                  <SelectItem value="Applied Math">Applied Math</SelectItem>
                  <SelectItem value="Applied Physics">Applied Physics</SelectItem>
                  <SelectItem value="Power">Power Engineering</SelectItem>
                  <SelectItem value="Electronics and Communication">
                    Electronics and Communication Engineering
                  </SelectItem>
                  <SelectItem value="Applied Biology">Applied Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year (only if student) */}
            {role === "student" && (
              <div className="space-y-2">
                <Label className="text-gray-700">Year</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 year</SelectItem>
                    <SelectItem value="2">2 year</SelectItem>
                    <SelectItem value="3">3 year</SelectItem>
                    <SelectItem value="4">4 year</SelectItem>
                    <SelectItem value="5">5 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Saving..." : "Continue"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}