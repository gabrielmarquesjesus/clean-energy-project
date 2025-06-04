import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  
  // Remove o cookie de forma mais assertiva
  response.cookies.delete("session");
  
  // Ou alternativamente:
  // response.cookies.set("session", "", {
  //   expires: new Date(0),
  //   path: "/",
  // });

  return response;
}