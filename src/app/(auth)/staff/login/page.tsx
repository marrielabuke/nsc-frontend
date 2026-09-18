import { StaffLoginForm } from "@/components/forms/auth/staff-login-form"
import { RedirectAuthenticated } from "@/components/auth/redirect-authenticated"

export default function LoginPage() {
  return (
    <RedirectAuthenticated>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <StaffLoginForm />
        </div>
      </div>
    </RedirectAuthenticated>
  )
}