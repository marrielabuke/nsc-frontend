"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AppAlert from "@/components/shared/AppAlert"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { login } from "@/lib/auth/api"
import { setActiveSession } from "@/lib/auth/session"
import { LoginData, loginSchema } from "@/lib/schemas/auth/login"

type LoginErrors = Partial<Record<keyof LoginData, string>>

const initialData: LoginData = {
  email: "",
  password: "",
}

export function StudentLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const [formData, setFormData] = useState<LoginData>(initialData)

  const [errors, setErrors] = useState<LoginErrors>({})
  const [formError, setFormError] = useState("")
  const [loginError, setLoginError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (
    field: keyof LoginData,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }))
    }

    if (formError) {
      setFormError("")
    }

    if (loginError) {
      setLoginError("")
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError("")
    setLoginError("")

    const validation = loginSchema.safeParse(formData)

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors

      if (!formData.email.trim() && !formData.password) {
        setFormError("Please provide email address and password!")
        setErrors({})
        return
      }

      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      })

      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      const response = await login(validation.data.email, validation.data.password)
      if (response.user.role.toUpperCase() !== "STUDENT") {
        throw new Error("This account is not a student account.")
      }
      setActiveSession(response.accessToken, response.user)
      router.push("/student/college")
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Unable to sign in.")
      setIsSubmitting(false)
    }
  }


  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8"
            noValidate
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <img
                  src="/images/NSC Letterhead.png"
                  alt="Northern Samar Colleges logo"
                  className="mb-2 h-20 w-auto object-contain"
                />

                <h1 className="text-2xl font-bold">
                  Student Login
                </h1>

                <p className="text-sm text-muted-foreground">
                  Enter your registered email address and password.
                </p>
              </div>

              {loginError && (
                <AppAlert
                  type="error"
                  title="Login failed"
                  description={loginError}
                  onClose={() => setLoginError("")}
                />
              )}

              {formError && (
                <AppAlert
                  type="warning"
                  title={formError}
                  onClose={() => setFormError("")}
                />
              )}

              <Field>
                <FieldLabel htmlFor="student-number">
                  Email address
                </FieldLabel>

                <Input
                  id="student-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  placeholder="student@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  className="
                  aria-invalid:border-red-600
                  aria-invalid:ring-red-600/20
                  dark:aria-invalid:border-red-500
                  dark:aria-invalid:ring-red-500/30
                "
                />

                {errors.email && (
                  <AppAlert
                    type="warning"
                    title="Invalid email"
                    description={errors.email}
                    onClose={() =>
                      setErrors((current) => ({ ...current, email: undefined }))
                    }
                  />
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="student-password">
                    Password
                  </FieldLabel>

                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <Input
                    id="student-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    aria-invalid={Boolean(errors.password)}
                    className="pr-11
                  aria-invalid:border-red-600
                  aria-invalid:ring-red-600/20
                  dark:aria-invalid:border-red-500
                  dark:aria-invalid:ring-red-500/30
                "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <AppAlert
                    type="warning"
                    title="Invalid password"
                    description={errors.password}
                    onClose={() =>
                      setErrors((current) => ({ ...current, password: undefined }))
                    }
                  />
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

              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <a 
                  href="/registration"
                  className="font-medium underline underline-offset-4"
                >
                  Register Student
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="/student-login.gif"
              alt="Student login illustration"
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