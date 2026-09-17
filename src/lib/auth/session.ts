export interface ActiveSession {
  accessToken: string
  id: string
  email: string
  role: string
}

let activeSession: ActiveSession | null = null

export function setActiveSession(accessToken: string, user: Omit<ActiveSession, "accessToken">) {
  activeSession = { accessToken, ...user }
}

export function getActiveSession(): ActiveSession | null {
  return activeSession
}

export function clearActiveSession() {
  activeSession = null
}