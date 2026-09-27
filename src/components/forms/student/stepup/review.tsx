"use client"

import type { ReactNode } from "react"

import {
  FileText,
  GraduationCap,
  Home,
  User,
  Users,
} from "lucide-react"

import type {
  StudentInformationData,
} from "@/lib/schemas/student/student-information"

interface ReviewStepProps {
  data: StudentInformationData
  email: string
}

export default function ReviewStep({
  data,
  email,
}: ReviewStepProps) {
  const fullName = [
    data.firstName,
    data.middleName,
    data.lastName,
    data.extensionName,
  ]
    .filter(Boolean)
    .join(" ")

  const guardianName = [
    data.guardianFirstName,
    data.guardianMiddleName,
    data.guardianLastName,
    data.guardianExtensionName,
  ]
    .filter(Boolean)
    .join(" ")

  const address = [
    data.houseNumber,
    data.street,
    data.barangay,
    data.city,
    data.province,
    data.zipCode,
  ]
    .filter(Boolean)
    .join(", ")

  return (
    <div className="space-y-6">

      {/* =====================================================
          NOTICE
      ===================================================== */}
      <div className="rounded-2xl border bg-muted/30 p-5">
        <h3 className="font-semibold">
          Review your information
        </h3>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Please make sure that all information below is
          correct. After submission, your registration will
          be forwarded to the Registrar&apos;s Office for
          verification.
        </p>
      </div>

      {/* =====================================================
          PERSONAL
      ===================================================== */}
      <ReviewSection
        title="Personal Information"
        icon={<User className="size-5" />}
      >
        <ReviewItem
          label="Full Name"
          value={fullName}
        />

        <ReviewItem
          label="Email Address"
          value={email}
        />

        <ReviewItem
          label="Birth Date"
          value={data.birthDate}
        />

        <ReviewItem
          label="Birth Place"
          value={data.birthPlace}
        />

        <ReviewItem
          label="Gender"
          value={formatValue(data.gender)}
        />

        <ReviewItem
          label="Civil Status"
          value={formatValue(data.civilStatus)}
        />

        <ReviewItem
          label="Citizenship"
          value={data.citizenship}
        />

        <ReviewItem
          label="Mobile Number"
          value={data.mobileNumber}
        />
      </ReviewSection>

      {/* =====================================================
          ADDRESS
      ===================================================== */}
      <ReviewSection
        title="Address"
        icon={<Home className="size-5" />}
      >
        <ReviewItem
          label="House Number"
          value={data.houseNumber}
        />

        <ReviewItem
          label="Street"
          value={data.street}
        />

        <ReviewItem
          label="Barangay"
          value={data.barangay}
        />

        <ReviewItem
          label="City / Municipality"
          value={data.city}
        />

        <ReviewItem
          label="Province"
          value={data.province}
        />

        <ReviewItem
          label="Zip Code"
          value={data.zipCode}
        />

        <div className="sm:col-span-2">
          <ReviewItem
            label="Complete Address"
            value={address}
          />
        </div>
      </ReviewSection>

      {/* =====================================================
          GUARDIAN
      ===================================================== */}
      <ReviewSection
        title="Parent / Guardian"
        icon={<Users className="size-5" />}
      >
        <ReviewItem
          label="Relationship"
          value={formatValue(
            data.guardianRelationship
          )}
        />

        <ReviewItem
          label="Full Name"
          value={guardianName}
        />

        <ReviewItem
          label="Mobile Number"
          value={data.guardianMobileNumber}
        />

        <ReviewItem
          label="Email Address"
          value={data.guardianEmail}
        />

        <ReviewItem
          label="Occupation"
          value={data.guardianOccupation}
        />
      </ReviewSection>

      {/* =====================================================
          PREVIOUS SCHOOL
      ===================================================== */}
      <ReviewSection
        title="Previous School"
        icon={
          <GraduationCap className="size-5" />
        }
      >
        <ReviewItem
          label="School Name"
          value={data.schoolName}
        />

        <ReviewItem
          label="School Type"
          value={formatValue(data.schoolType)}
        />

        <ReviewItem
          label="School Address"
          value={data.schoolAddress}
        />

        <ReviewItem
          label="Year Graduated"
          value={data.yearGraduated}
        />
      </ReviewSection>

      {/* =====================================================
          DOCUMENTS
      ===================================================== */}
      <ReviewSection
        title="Admission Documents"
        icon={<FileText className="size-5" />}
      >
        <ReviewItem
          label="PSA Birth Certificate"
          value={
            data.psaBirthCertificate?.name ??
            "Not uploaded"
          }
        />

        <ReviewItem
          label="Form 138"
          value={
            data.form138?.name ??
            "Not uploaded"
          }
        />
      </ReviewSection>

      {/* =====================================================
          CONFIRMATION NOTICE
      ===================================================== */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <p className="text-sm font-medium">
          Ready to submit?
        </p>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          By submitting this form, you confirm that the
          information you provided is accurate. Your
          registration will still require verification by
          the Registrar&apos;s Office.
        </p>
      </div>
    </div>
  )
}

// ============================================================
// REVIEW SECTION
// ============================================================

interface ReviewSectionProps {
  title: string
  icon: ReactNode
  children: ReactNode
}

function ReviewSection({
  title,
  icon,
  children,
}: ReviewSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center gap-3 border-b bg-muted/30 px-5 py-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>

        <h4 className="font-semibold">
          {title}
        </h4>
      </div>

      <div className="grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2">
        {children}
      </div>
    </section>
  )
}

// ============================================================
// REVIEW ITEM
// ============================================================

interface ReviewItemProps {
  label: string
  value?: string
}

function ReviewItem({
  label,
  value,
}: ReviewItemProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium">
        {value?.trim() || "—"}
      </p>
    </div>
  )
}

function formatValue(value?: string) {
  if (!value) {
    return "—"
  }

  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    )
}