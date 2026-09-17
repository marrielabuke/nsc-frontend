"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import { restoreActiveSession } from "@/lib/auth/api"

import ForbiddenPage from "../dashboard/forbidden-page"


import { isAllowed } from "@/lib/auth/dashboard-route"

type Status = "checking" | "ok" | "forbidden"

const RoleGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [status, setStatus] = useState<Status>("checking")

  useEffect(() => {
    let cancelled = false

    void restoreActiveSession().then((session) => {
      if (cancelled) return

      if (!session) {
        router.replace(pathname.startsWith("/student") ? "/login" : "/staff/login")
        return
      }

      setStatus(isAllowed(pathname, session.role) ? "ok" : "forbidden")
    })

    return () => {
      cancelled = true
    }
  }, [pathname, router])

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (status === "forbidden") {
    return <ForbiddenPage />
  }

  return <>{children}</>
}

export default RoleGuard