import { getActiveSession } from "@/lib/auth/session"

export interface AuthUser {
  id: string
  email: string
  role: string
}

export interface LoginResponse {
  accessToken: string
  user: AuthUser
}

export interface RegisterResponse {
  status: "success"
  message: string
  user: AuthUser
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

async function readError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string; message?: string }
    return body.error ?? body.message ?? "The request could not be completed."
  } catch {
    return "The request could not be completed."
  }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error(await readError(response))
  }

  return (await response.json()) as LoginResponse
}

export async function register(
  email: string,
  password: string,
  role: string,
): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, role }),
  })

  if (!response.ok) {
    throw new Error(await readError(response))
  }

  return (await response.json()) as RegisterResponse
}

export async function verifyEmail(token: string): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`,
    { credentials: "include" },
  )

  if (!response.ok) {
    throw new Error(await readError(response))
  }
}

export async function logout(): Promise<void> {
  const accessToken = getActiveSession()?.accessToken

  await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    credentials: "include",
  })
}