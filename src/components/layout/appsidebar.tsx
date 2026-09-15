"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Calendar } from "lucide-react"

import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { SideBarLinks } from "@/components/navigation/sidebar-links"

const SCHOOL_YEARS = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"]
const SEMESTERS = ["1st Semester", "2nd Semester", "Summer"]

interface AppSidebarProps {
  role: string
}

const AppSidebar = ({ role }: AppSidebarProps) => {
  const pathname = usePathname()

  const filteredLinks = SideBarLinks.main.filter((item) =>
    item.visible.includes(role)
  )

  return (
    <SidebarPrimitive collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <Image src="/images/nsc-logoo.png" alt="NSC Logo" width={40} height={40} />
                <span>NSC SMS</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Applications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="
                      data-[active=true]:bg-[var(--primary)]
                      data-[active=true]:text-white
                      data-[active=true]:font-medium
                      hover:bg-[var(--primary)]/10
                      transition-colors
                    "
                  >
                    <Link href={item.url}>
                      {item.icon ? <item.icon /> : null}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>

                  {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                </SidebarMenuItem>
              ))}

              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Calendar />
                      <span>Pages</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {SideBarLinks.pages.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {role === "admin" && (
          <div className="px-2 pb-1 flex flex-col gap-2">
            <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wide px-1">
              Active Term
            </p>

            <Select>
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue placeholder="School Year" />
              </SelectTrigger>
              <SelectContent>
                {SCHOOL_YEARS.map((sy) => (
                  <SelectItem key={sy} value={sy} className="text-xs">
                    {sy}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                {SEMESTERS.map((sem) => (
                  <SelectItem key={sem} value={sem} className="text-xs">
                    {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button
              className="w-full h-8 rounded-md bg-[var(--primary)] text-white text-xs font-medium hover:bg-[var(--primary)]/90 transition-colors"
              onClick={() => {
                // wire up save logic here
              }}
            >
              Set Active Term
            </button>
          </div>
        )}
      </SidebarFooter>
    </SidebarPrimitive>
  )
}

export default AppSidebar