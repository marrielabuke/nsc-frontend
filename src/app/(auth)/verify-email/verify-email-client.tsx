"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { verifyEmail } from "@/lib/auth/api"

export default function VerifyEmailClient({ token }: { token: string }) {
  const [isVerifying, setIsVerifying] = useState(true)
  const [verificationError, setVerificationError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setVerificationError("The email verification link is missing a token.")
      setIsVerifying(false)
      return
    }

    let isCurrent = true

    verifyEmail(token)
      .catch((error: unknown) => {
        if (isCurrent) {
          setVerificationError(
            error instanceof Error
              ? error.message
              : "Email verification could not be completed.",
          )
        }
      })
      .finally(() => {
        if (isCurrent) setIsVerifying(false)
      })

    return () => {
      isCurrent = false
    }
  }, [token])

  if (isVerifying) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-muted p-6">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Verifying your email...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (verificationError) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-muted p-6">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-5 p-8 text-center">
            <h1 className="text-2xl font-bold">Email verification failed</h1>
            <p role="alert" className="text-sm text-destructive">
              {verificationError}
            </p>
            <Button asChild className="w-full">
              <Link href="/login">Back to login form</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-6">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-5 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
            ✓
          </div>
          <h1 className="text-2xl font-bold">Email verified successfully</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Your student account is now active. Click the button below to continue
            to the login page.
          </p>
          <Button asChild className="w-full">
            <Link href="/login">Go to login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
