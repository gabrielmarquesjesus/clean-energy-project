import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const url = request.nextUrl.clone();

  // Rotas públicas que não requerem autenticação
  const publicRoutes = [
    '/admin/login',
    '/admin/logout',
    '/api/login',
    '/api/logout'
  ];

  // Se for uma rota pública, permita o acesso
  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  // Verificar rotas protegidas
  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    try {
      // Verifique o token com o mesmo secret usado para gerar
      jwt.verify(token, process.env.AUTH_SECRET!);
      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed:", error);
      
      // Limpa o cookie inválido e redireciona
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.set({
        name: "session",
        value: "",
        path: "/",
        expires: new Date(0),
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/login", "/api/logout"],
};