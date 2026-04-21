import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "jurista-secret-key-change-in-production"
);

const PUBLIC_PATHS = ["/login", "/api/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir rotas públicas e assets estáticos
  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // API routes: verificar Bearer token
  if (pathname.startsWith("/api/")) {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      // Fallback para Cookie (necessário para tags <img> no painel web)
      const token = request.cookies.get("jurista_token")?.value;
      if (token) {
        try {
          await jwtVerify(token, JWT_SECRET);
          return NextResponse.next();
        } catch {
          return NextResponse.json({ success: false, error: "Não autorizado" }, { status: 401 });
        }
      }
      return NextResponse.json({ success: false, error: "Não autorizado" }, { status: 401 });
    }
    try {
      await jwtVerify(authHeader.slice(7), JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ success: false, error: "Token inválido" }, { status: 401 });
    }
  }

  // Pages: verificar cookie
  const token = request.cookies.get("jurista_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("jurista_token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
