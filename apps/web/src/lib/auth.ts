// ============================================
// JWT Auth Library (jose)
// ============================================

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "jurista-secret-key-change-in-production"
);

const TOKEN_EXPIRY = "7d";
const COOKIE_NAME = "jurista_token";

export interface TokenPayload extends JWTPayload {
  userId: string;
  email: string;
  role: "MASTER" | "COLLECTOR";
  name: string;
}

/**
 * Gerar JWT token
 */
export async function signToken(payload: Omit<TokenPayload, keyof JWTPayload>): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

/**
 * Verificar e decodificar JWT token
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Obter usuário autenticado a partir dos cookies (Server Components)
 */
export async function getSessionUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Obter usuário autenticado a partir do header Authorization (API)
 */
export async function getApiUser(request: Request): Promise<TokenPayload | null> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  return verifyToken(token);
}

/**
 * Verificar se `role` é MASTER
 */
export function isMaster(user: TokenPayload | null): boolean {
  return user?.role === "MASTER";
}
