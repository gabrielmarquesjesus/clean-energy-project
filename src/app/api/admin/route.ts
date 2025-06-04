import { ensureAdminExists } from "@/lib/initAdmin";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await ensureAdminExists();

  return Response.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const admin = await prisma.admin.findFirst({ where: { email } });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    const response = NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );
    
    response.cookies.set({
      name: "session",
      value: "",
      path: "/",
      expires: new Date(0),
    });

    return response;
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "session",
    value: admin.id ,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
