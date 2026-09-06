"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  authenticateStaff,
  createStaffSession,
} from "@/lib/auth/staff-auth"
import {
  type StaffLoginData,
  staffLoginSchema,
} from "@/lib/schemas/staff/login"
import type { StaffRole } from "@/types/staff/staff"

type LoginErrors = Partial<Record<keyof StaffLoginData, string>>

const initialData: StaffLoginData = {
  employeeId: "",
  password: "",
}

const roleRedirects: Partial<Record<StaffRole, string>> = {
  admin: "/admin",
  college_registrar: "/registrar/college/",
  basic_education_registrar: "/registrar/basic-ed",
  instructor: "/faculty",
  teacher: "/faculty",
  president: "/president",
}

export function StaffLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [formData, setFormData] = useState<StaffLoginData>(initialData)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [loginError, setLoginError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    field: keyof StaffLoginData,
    value: string
  ) => {
    setFormData((current) => ({ ...current, [field]: value }))

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }

    if (loginError) setLoginError("")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoginError("")

    const result = staffLoginSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        employeeId: fieldErrors.employeeId?.[0],
        password: fieldErrors.password?.[0],
      })
      return
    }

    setErrors({})
    setIsSubmitting(true)

    const staff = authenticateStaff(
      result.data.employeeId,
      result.data.password
    )

    if (!staff) {
      setLoginError("Invalid employee ID or password.")
      setIsSubmitting(false)
      return
    }

    if (staff.status !== "active") {
      setLoginError("Your staff account is currently inactive.")
      setIsSubmitting(false)
      return
    }

    const redirectPath = roleRedirects[staff.role]

    if (!redirectPath) {
      setLoginError(
        `No dashboard is configured for the "${staff.role}" role.`
      )
      setIsSubmitting(false)
      return
    }

    const session = createStaffSession(staff)

    sessionStorage.removeItem("activeStudent")
    sessionStorage.setItem("activeStaff", JSON.stringify(session))

    router.replace(redirectPath)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8" noValidate>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <img
                  src="/nsc-logo.png"
                  alt="Northern Samar Colleges logo"
                  className="mb-2 h-20 w-auto object-contain"
                />

                <h1 className="text-2xl font-bold">Staff Login</h1>

                <p className="text-sm text-muted-foreground">
                  Enter your employee ID and password.
                </p>
              </div>

              {loginError && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-600/30 bg-red-600/10 px-4 py-3 text-sm font-medium text-red-600"
                >
                  {loginError}
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="employee-id">Employee ID</FieldLabel>

                <Input
                  id="employee-id"
                  name="employeeId"
                  type="text"
                  value={formData.employeeId}
                  onChange={(event) =>
                    handleChange("employeeId", event.target.value)
                  }
                  placeholder="210001"
                  autoComplete="username"
                  aria-invalid={Boolean(errors.employeeId)}
                  className="
                  aria-invalid:border-red-600
                  aria-invalid:ring-red-600/20
                  dark:aria-invalid:border-red-500
                  dark:aria-invalid:ring-red-500/30
                "
                />

                {errors.employeeId && (
                  <p
                    role="alert"
                    className="text-xs font-medium text-red-600"
                  >
                    {errors.employeeId}
                  </p>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="staff-password">Password</FieldLabel>

                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <Input
                  id="staff-password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  className="
                  aria-invalid:border-red-600
                  aria-invalid:ring-red-600/20
                  dark:aria-invalid:border-red-500
                  dark:aria-invalid:ring-red-500/30
                "
                />

                {errors.password && (
                  <p
                    role="alert"
                    className="text-xs font-medium text-red-600"
                  >
                    {errors.password}
                  </p>
                )}
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="/student-login.gif"
              alt="Staff login illustration"
              className="absolute inset-0 h-full w-full object-contain p-12 dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By signing in, you agree to our{" "}
        <a href="/terms" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  )
}