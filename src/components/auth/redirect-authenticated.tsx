"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { restoreActiveSession } from "@/lib/auth/api"

const roleRedirects: Record<string, string> = {
  STUDENT: "/student/college",
  ADMIN: "/admin",
  COLLEGE_REGISTRAR: "/registrar/college",
  BASIC_EDUCATION_REGISTRAR: "/registrar/basic-ed",
  INSTRUCTOR: "/faculty",
  TEACHER: "/faculty",
  EMPLOYEE: "/faculty",
  PRESIDENT: "/president",
}

export function RedirectAuthenticated({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false

    const redirectIfAuthenticated = () => {
      void restoreActiveSession().then((session) => {
        if (cancelled) return

        const redirectPath = session
          ? roleRedirects[session.role.toUpperCase()]
          : undefined

        if (redirectPath) {
          router.replace(redirectPath)
          return
        }

        setChecking(false)
      })
    }

    redirectIfAuthenticated()
    window.addEventListener("pageshow", redirectIfAuthenticated)

    return () => {
      cancelled = true
      window.removeEventListener("pageshow", redirectIfAuthenticated)
    }
  }, [router])

  if (checking) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-muted">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return <>{children}</>
}