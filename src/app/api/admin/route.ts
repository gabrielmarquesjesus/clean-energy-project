import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ensureAdminExists } from "@/lib/initAdmin";

const AUTH_SECRET = process.env.AUTH_SECRET;

export async function GET() {
  await ensureAdminExists();

  return Response.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!AUTH_SECRET) {
    throw new Error("AUTH_SECRET não configurado");
  }

  const admin = await prisma.admin.findFirst({ where: { email } });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    const response = NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );
    
    // Limpa qualquer cookie existente
    response.cookies.set({
      name: "session",
      value: "",
      path: "/",
      expires: new Date(0),
    });

    return response;
  }

  const token = jwt.sign({ id: admin.id }, AUTH_SECRET, { expiresIn: "7d" });

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "session",
    value: token,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  return response;
}
