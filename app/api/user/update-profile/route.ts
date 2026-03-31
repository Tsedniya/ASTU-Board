import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import { getSession } from "@/lib/auth/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role, department, year } = await req.json();

    let user = await User.findOne({ email: session.user.email });

    if (!user) {
      user = await User.create({
        email: session.user.email,
        name: session.user.name,
      });
    }

    user.role = role;
    user.department = department;
    user.year = year;

    await user.save();

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}