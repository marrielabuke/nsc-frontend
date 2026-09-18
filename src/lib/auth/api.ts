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
let refreshPromise: Promise<string | null> | null = null
let refreshTimer: ReturnType<typeof setTimeout> | null = null

function getAccessTokenExpiry(accessToken: string): number | null {
  try {
    const payload = accessToken.split(".")[1]
    if (!payload) return null

    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as {
      exp?: unknown
    }
    return typeof decoded.exp === "number" ? decoded.exp * 1_000 : null
  } catch {
    return null
  }
}

function scheduleTokenRefresh(accessToken: string): void {
  if (refreshTimer) clearTimeout(refreshTimer)

  const expiresAt = getAccessTokenExpiry(accessToken)
  if (expiresAt === null) return

  const refreshBuffer = 60_000
  const refreshDelay = Math.max(0, expiresAt - Date.now() - refreshBuffer)

  refreshTimer = setTimeout(() => {
    refreshTimer = null
    void refreshAccessToken()
  }, refreshDelay)
}

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
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
      const current = getActiveSession()
      setActiveSession(body.accessToken, current ?? body.user)
      scheduleTokenRefresh(body.accessToken)
      return body.accessToken
    } catch {
      clearActiveSession()
      return null
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

export async function authenticatedFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
  retry = true
): Promise<Response> {
  const request = new Request(input, { ...init, credentials: "include" })
  const accessToken = getActiveSession()?.accessToken
  if (accessToken) request.headers.set("Authorization", `Bearer ${accessToken}`)

  const response = await fetch(request.clone())
  if (response.status !== 401 || !retry) return response

  const refreshedAccessToken = await refreshAccessToken()
  if (!refreshedAccessToken) return response

  const retryRequest = new Request(request, { credentials: "include" })
  retryRequest.headers.set("Authorization", `Bearer ${refreshedAccessToken}`)
  return fetch(retryRequest)
}

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

  const body = (await response.json()) as LoginResponse
  setActiveSession(body.accessToken, body.user)
  scheduleTokenRefresh(body.accessToken)
  return body
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

export async function restoreActiveSession(): Promise<ActiveSession | null> {
  const current = getActiveSession()
  if (current) return current
  if (restorePromise) return restorePromise

  restorePromise = (async () => {
    try {
      await refreshAccessToken()
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
  try {
    await authenticatedFetch(`${getApiUrl()}/api/auth/logout`, {
      method: "POST",
    })
  } finally {
    if (refreshTimer) clearTimeout(refreshTimer)
    refreshTimer = null
    clearActiveSession()
  }
}