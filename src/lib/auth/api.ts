import {
  clearActiveSession,
  getActiveSession,
  setActiveSession,
  type ActiveSession,
} from "@/lib/auth/session"

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

const CONFIGURED_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

function getApiUrl(): string {
  if (typeof window === "undefined") return CONFIGURED_API_URL

  const apiUrl = new URL(CONFIGURED_API_URL)
  const browserHost = window.location.hostname
  const localHosts = new Set(["localhost", "127.0.0.1"])

  // Keep frontend and API on the same host so SameSite=Strict cookies are sent.
  if (localHosts.has(browserHost) || localHosts.has(apiUrl.hostname)) {
    apiUrl.hostname = browserHost
  }

  return apiUrl.origin
}

let restorePromise: Promise<ActiveSession | null> | null = null

async function readError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string; message?: string }
    return body.error ?? body.message ?? "The request could not be completed."
  } catch {
    return "The request could not be completed."
  }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${getApiUrl()}/api/auth/login`, {
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
  const response = await fetch(`${getApiUrl()}/api/auth/register`, {
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
    `${getApiUrl()}/api/auth/verify-email?token=${encodeURIComponent(token)}`,
    { credentials: "include" },
  )

  if (!response.ok) {
    throw new Error(await readError(response))
  }
}

async function fetchCurrentUser(accessToken: string): Promise<AuthUser> {
  const response = await fetch(`${getApiUrl()}/api/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error(await readError(response))
  }

  const body = (await response.json()) as { user: AuthUser }
  return body.user
}

export async function restoreActiveSession(): Promise<ActiveSession | null> {
  const current = getActiveSession()
  if (current) return current
  if (restorePromise) return restorePromise

  restorePromise = (async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      })

      if (!response.ok) {
        clearActiveSession()
        return null
      }

      const body = (await response.json()) as LoginResponse
      const user = await fetchCurrentUser(body.accessToken)
      setActiveSession(body.accessToken, user)
      return getActiveSession()
    } catch {
      clearActiveSession()
      return null
    } finally {
      restorePromise = null
    }
  })()

  return restorePromise
}

export async function logout(): Promise<void> {
  const accessToken = getActiveSession()?.accessToken

  await fetch(`${getApiUrl()}/api/auth/logout`, {
    method: "POST",
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    credentials: "include",
  })
}