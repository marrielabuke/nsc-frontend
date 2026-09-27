"use client"

import {
  Clock3,
  FileCheck2,
  ShieldCheck,
} from "lucide-react"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

interface RegistrarVerificationPendingProps {
  studentName?: string
}

export default function RegistrarVerificationPending({
  studentName,
}: RegistrarVerificationPendingProps) {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 dark:bg-slate-950">

      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

      <Card className="relative w-full max-w-xl overflow-hidden rounded-3xl border-slate-200/80 p-0 text-center shadow-2xl shadow-slate-900/[0.08] dark:border-white/10">

        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-blue-400 to-amber-400" />

        <CardContent className="px-6 py-10 sm:px-10 sm:py-12">

          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/[0.05]">
            <FileCheck2 className="h-10 w-10" />
          </div>

          {/* Heading */}
          <h1 className="mt-7 text-3xl font-bold tracking-tight">
            Registration submitted
          </h1>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">
            {studentName ? (
              <>
                Thank you,{" "}
                <span className="font-medium text-foreground">
                  {studentName}
                </span>
                . Your student information has been
                submitted successfully.
              </>
            ) : (
              <>
                Your student information has been
                submitted successfully.
              </>
            )}
          </p>

          {/* Waiting status */}
          <div
            aria-live="polite"
            className="mt-7 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
          >
            <Clock3 className="h-5 w-5 shrink-0" />

            <div className="text-left">
              <p className="font-semibold">
                Waiting for registrar verification
              </p>

              <p className="mt-0.5 text-xs opacity-75">
                Your registration is currently being
                reviewed by the Registrar&apos;s Office.
              </p>
            </div>
          </div>

          {/* What's next */}
          <div className="mt-6 rounded-2xl border bg-muted/30 p-5 text-left">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />

              <div>
                <p className="font-medium">
                  What happens next?
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  The registrar will verify your personal
                  information, previous school information,
                  and submitted admission documents.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            Your student dashboard will become available
            once your registration has been verified.
          </p>

        </CardContent>
      </Card>
    </div>
  )
}