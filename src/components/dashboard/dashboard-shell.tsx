"use client"

import { useEffect, useState } from "react"
import { Toaster } from "sonner"

import Navbar from "@/components/layout/navbar"
import AppSidebar from "@/components/layout/appsidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import RoleGuard from "@/components/auth/role-guard"
import { restoreActiveSession } from "@/lib/auth/api"

interface DashboardShellProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

const DashboardShell = ({ children, defaultOpen }: DashboardShellProps) => {
  const [role, setRole] = useState("")

  useEffect(() => {
    void restoreActiveSession().then((session) => {
      setRole(session?.role ?? "")
    })
  }, [])

  return (
    <RoleGuard>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar role={role} />

        <main className="flex min-h-screen flex-1 flex-col overflow-hidden">
          <Navbar />
          <Toaster position="top-center" richColors />

          <div className="flex-1 px-4 py-4 md:px-6">{children}</div>

          <footer className="border-t py-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Northern Samar Colleges. All rights reserved.
          </footer>
        </main>
      </SidebarProvider>
    </RoleGuard>
  )
}

export default DashboardShell