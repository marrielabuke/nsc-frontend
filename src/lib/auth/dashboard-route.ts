// lib/auth/dashboard-routes.ts
interface RouteRule {
  prefix: string
  roles: string[]
}

const ROUTE_RULES: RouteRule[] = [
  { prefix: "/student", roles: ["STUDENT"] },
  { prefix: "/admin", roles: ["ADMIN"] },
  { prefix: "/registrar/college", roles: ["COLLEGE_REGISTRAR"] },
  { prefix: "/registrar/basic-ed", roles: ["BASIC_EDUCATION_REGISTRAR"] },
  { prefix: "/faculty", roles: ["INSTRUCTOR", "TEACHER", "EMPLOYEE"] },
  { prefix: "/president", roles: ["PRESIDENT"] },
]

export function isAllowed(pathname: string, role: string): boolean {
  const rule = ROUTE_RULES.find((r) => pathname.startsWith(r.prefix))
  if (!rule) return false
  return rule.roles.includes(role.toUpperCase())
}