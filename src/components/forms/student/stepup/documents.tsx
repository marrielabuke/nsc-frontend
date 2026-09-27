"use client"

import {
  FileCheck2,
  FileText,
  Upload,
  X,
} from "lucide-react"

import type { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import type {
  StudentInformationData,
} from "@/lib/schemas/student/student-information"

interface DocumentsStepProps {
  form: UseFormReturn<StudentInformationData>
}

export default function DocumentsStep({
  form,
}: DocumentsStepProps) {
  const psaBirthCertificate = form.watch(
    "psaBirthCertificate"
  )

  const form138 = form.watch("form138")

  function handleFileChange(
    field: "psaBirthCertificate" | "form138",
    file?: File
  ) {
    form.setValue(field, file, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  return (
    <div className="space-y-8">

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}
      <div className="rounded-2xl border bg-muted/30 p-5">
        <div className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="size-5" />
          </div>

          <div>
            <h3 className="font-semibold">
              Admission Documents
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Upload the required admission documents. Make sure
              that each document is clear and readable before
              continuing.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          PSA
      ===================================================== */}
      <DocumentUpload
        id="psaBirthCertificate"
        label="PSA Birth Certificate"
        description="Upload a clear copy of your PSA Birth Certificate."
        file={psaBirthCertificate}
        error={
          form.formState.errors.psaBirthCertificate
            ?.message as string | undefined
        }
        onChange={(file) =>
          handleFileChange(
            "psaBirthCertificate",
            file
          )
        }
        onRemove={() =>
          handleFileChange(
            "psaBirthCertificate",
            undefined
          )
        }
      />

      {/* =====================================================
          FORM 138
      ===================================================== */}
      <DocumentUpload
        id="form138"
        label="Form 138"
        description="Upload your latest Form 138 / Report Card."
        file={form138}
        error={
          form.formState.errors.form138
            ?.message as string | undefined
        }
        onChange={(file) =>
          handleFileChange("form138", file)
        }
        onRemove={() =>
          handleFileChange("form138", undefined)
        }
      />

      <div className="rounded-xl border border-dashed p-4">
        <p className="text-sm text-muted-foreground">
          Accepted files: PDF, JPG, JPEG, and PNG. Document
          requirements can later be adjusted to match the
          registrar&apos;s official admission requirements.
        </p>
      </div>
    </div>
  )
}

// ============================================================
// DOCUMENT UPLOAD
// ============================================================

interface DocumentUploadProps {
  id: string
  label: string
  description: string
  file?: File
  error?: string
  onChange: (file?: File) => void
  onRemove: () => void
}

function DocumentUpload({
  id,
  label,
  description,
  file,
  error,
  onChange,
  onRemove,
}: DocumentUploadProps) {
  return (
    <div className="space-y-3">
      <div>
        <Label
          htmlFor={id}
          className="text-base font-medium"
        >
          {label}
        </Label>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {file ? (
        <div className="flex items-center justify-between gap-4 rounded-2xl border bg-card p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
              <FileCheck2 className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {file.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
          >
            <X className="size-4" />

            <span className="sr-only">
              Remove {label}
            </span>
          </Button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-10 text-center transition-colors hover:bg-muted/40"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Upload className="size-5" />
          </div>

          <p className="mt-4 text-sm font-medium">
            Click to upload
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            PDF, JPG, JPEG or PNG
          </p>

          <input
            id={id}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            className="hidden"
            onChange={(event) => {
              const selectedFile =
                event.target.files?.[0]

              if (selectedFile) {
                onChange(selectedFile)
              }

              event.target.value = ""
            }}
          />
        </label>
      )}

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function formatFileSize(bytes: number) {
  if (bytes === 0) {
    return "0 Bytes"
  }

  const units = ["Bytes", "KB", "MB", "GB"]
  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  )

  return `${(
    bytes / Math.pow(1024, index)
  ).toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}