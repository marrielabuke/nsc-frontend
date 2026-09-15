"use client"

/**
 * ─── IMPLEMENTATION ROADMAP ───────────────────────────────────────────────────
 *
 * STEP 1 — Define your types  (`types/registrar/college/subject.ts`)
 * STEP 2 — Write the Zod schema  (`lib/schemas/subject.ts`)
 * STEP 3 — Set up Prisma model  (`prisma/schema.prisma`)  ← NOT YET
 * STEP 4 — Write the Server Action  (`app/actions/subject.ts`)  ← NOT YET
 * STEP 5 — Build this form component  (you are here)
 * STEP 6 — Plug into the parent page/table
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState } from "react"
import { Award }    from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button }    from "@/components/ui/button"
import { Input }     from "@/components/ui/input"
import { Label }     from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox }  from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Subject }                               from "@/types/registrar/college/subject"
import { AddSubjectFormValues, addSubjectSchema } from "@/lib/schemas/subject"
import { appAlert }                              from "@/lib/alerts"

// STEP 4 (future) — Once your Server Action exists, import it here:
// import { createSubject } from "@/app/actions/subject"


// ─── Types ────────────────────────────────────────────────────────────────────
type AddSubjectFormProps = {
  open:         boolean
  onOpenChange: (open: boolean) => void
  onSubmit?:    (subject: Omit<Subject, "id">) => void
}

// ─── Default form state ───────────────────────────────────────────────────────
const defaultForm = {
  subject_code:            "",
  subject_title:           "",
  subject_type:            "" as AddSubjectFormValues["subject_type"] | "",
  units:                   "",
  include_in_latin_honors: false,
}

// ─── Add Subject Form ─────────────────────────────────────────────────────────
export function AddSubjectForm({ open, onOpenChange, onSubmit }: AddSubjectFormProps) {
  const [form,   setForm]   = useState(defaultForm)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // STEP 4 (future) — const [loading, setLoading] = useState(false)

  function handleClose() {
    onOpenChange(false)
    setTimeout(() => {
      setForm(defaultForm)
      setErrors({})
    }, 200)
  }

  function handleSubmit() {
    setErrors({})

    const result = addSubjectSchema.safeParse(form)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)

      // Field errors shown inline; toast gives a quick top-level hint
      appAlert.error(
        "Subject was not added.",
        "Please fix the errors in the form."
      )
      return
    }

    // STEP 4 (future) — Replace the block below with:
    //   setLoading(true)
    //   const response = await createSubject(result.data)
    //   setLoading(false)
    //   if (!response.success) {
    //     setErrors(response.errors)
    //     appAlert.error("Failed to save subject.", "Please try again.")
    //     return
    //   }
    //   onSubmit?.(response.data)

    onSubmit?.(result.data)

    appAlert.success("Subject added successfully.")

    handleClose()
  }

  const canSubmit = addSubjectSchema.safeParse(form).success

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Add Subject</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="grid gap-4 py-1">

          {/* Subject Code */}
          <div className="grid gap-1.5">
            <Label htmlFor="subject-code">Subject Code</Label>
            <Input
              id="subject-code"
              placeholder="e.g. GE 110"
              value={form.subject_code}
              onChange={(e) => setForm((f) => ({ ...f, subject_code: e.target.value }))}
            />
            {errors.subject_code && (
              <p className="text-xs text-red-500">{errors.subject_code}</p>
            )}
          </div>

          {/* Subject Title */}
          <div className="grid gap-1.5">
            <Label htmlFor="subject-title">Subject Title</Label>
            <Input
              id="subject-title"
              placeholder="e.g. Understanding the Self"
              value={form.subject_title}
              onChange={(e) => setForm((f) => ({ ...f, subject_title: e.target.value }))}
            />
            {errors.subject_title && (
              <p className="text-xs text-red-500">{errors.subject_title}</p>
            )}
          </div>

          {/* Subject Type + Units — side by side */}
          <div className="grid grid-cols-2 gap-3">

            {/* Subject Type */}
            <div className="grid gap-1.5">
              <Label>Subject Type</Label>
              <Select
                value={form.subject_type}
                onValueChange={(val) =>
                  setForm((f) => ({ ...f, subject_type: val as AddSubjectFormValues["subject_type"] }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GE">GE</SelectItem>
                  <SelectItem value="Mandatory">Mandatory</SelectItem>
                  <SelectItem value="Major">Major</SelectItem>
                </SelectContent>
              </Select>
              {errors.subject_type && (
                <p className="text-xs text-red-500">{errors.subject_type}</p>
              )}
            </div>

            {/* Units */}
            <div className="grid gap-1.5">
              <Label htmlFor="units">Units</Label>
              <Input
                id="units"
                type="number"
                min={1}
                max={9}
                placeholder="e.g. 3"
                value={form.units}
                onChange={(e) => setForm((f) => ({ ...f, units: e.target.value }))}
              />
              {errors.units && (
                <p className="text-xs text-red-500">{errors.units}</p>
              )}
            </div>

          </div>

          {/* Include in Latin Honors */}
          <div className="flex items-start gap-2.5 rounded-lg border bg-muted/40 px-3 py-2.5">
            <Checkbox
              id="latin-honors"
              checked={form.include_in_latin_honors}
              onCheckedChange={(checked) =>
                setForm((f) => ({ ...f, include_in_latin_honors: checked === true }))
              }
              className="mt-0.5"
            />
            <div className="grid gap-0.5">
              <Label
                htmlFor="latin-honors"
                className="flex cursor-pointer items-center gap-1.5 font-medium"
              >
                <Award className="size-3.5 text-muted-foreground" />
                Include in Latin Honors
              </Label>
              <p className="text-xs text-muted-foreground">
                This subject&apos;s grade will count toward Latin Honors computation.
              </p>
            </div>
          </div>

        </div>

        <Separator />

        <DialogFooter className="flex-row justify-end gap-2">
          {/* STEP 4 (future) — also disable while loading: disabled={!canSubmit || loading} */}
          <Button size="sm" onClick={handleSubmit} disabled={!canSubmit}>
            Add Subject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}