export interface ActiveSession {
  accessToken: string
  id: string
  email: string
  role: string
}

const SESSION_KEY = "authSession"

export function setActiveSession(accessToken: string, user: Omit<ActiveSession, "accessToken">) {
  if (typeof window === "undefined") return
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ accessToken, ...user }))
}

export function getActiveSession(): ActiveSession | null {
  if (typeof window === "undefined") return null

  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as ActiveSession
  } catch {
    sessionStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function clearActiveSession() {
  if (typeof window !== "undefined") sessionStorage.removeItem(SESSION_KEY)
}