"use client"

import {
  useEffect,
  useState,
} from "react"

import { useRouter } from "next/navigation"

import StudentInformationForm from "@/components/forms/student/student-information-form"

import RegistrarVerificationPending from "@/components/forms/student/registrar-verification-pending"

import {
  getActiveSession,
} from "@/lib/auth/session"

import {
  getStudentByUserId,
  updateDummyStudentRegistrationStatus,
} from "@/lib/student/student-service"

import type {
  StudentUser,
} from "@/types/student/student"

import type {
  StudentInformationData,
} from "@/lib/schemas/student/student-information"

export default function StudentSetupPage() {
  const router = useRouter()

  const [student, setStudent] =
    useState<StudentUser | null>(null)

  const [loading, setLoading] =
    useState(true)

  // ==========================================================
  // LOAD STUDENT
  // ==========================================================

  useEffect(() => {
    const session =
      getActiveSession()

    if (!session) {
      router.replace("/login")
      return
    }

    const currentStudent =
      getStudentByUserId(session.id)

    if (!currentStudent) {
      setLoading(false)
      return
    }

    // Already approved.
    if (
      currentStudent.registrationStatus ===
      "verified"
    ) {
      router.replace(
        "/student/college"
      )

      return
    }

    setStudent(currentStudent)

    setLoading(false)
  }, [router])

  // ==========================================================
  // SUBMIT STUDENT INFORMATION
  // ==========================================================

  async function handleComplete(
    data: StudentInformationData
  ) {
    if (!student) {
      return
    }

    /*
     * ========================================================
     * TEMPORARY DUMMY IMPLEMENTATION
     * ========================================================
     *
     * Later this should become something like:
     *
     * await submitStudentInformation(
     *   student.userId,
     *   data
     * )
     *
     */

    updateDummyStudentRegistrationStatus(
      student.userId,
      "pending_verification"
    )

    setStudent((current) => {
      if (!current) {
        return current
      }

      return {
        ...current,

        // Person
        personId:
          current.personId ??
          `PERSON-${current.userId}`,

        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,

        extensionName:
          data.extensionName,

        birthDate: data.birthDate,
        birthPlace: data.birthPlace,
        gender: data.gender,
        civilStatus: data.civilStatus,

        citizenship:
          data.citizenship,

        mobileNumber:
          data.mobileNumber,

        // Address
        houseNumber:
          data.houseNumber,

        street: data.street,

        barangay: data.barangay,

        city: data.city,

        province: data.province,

        zipCode: data.zipCode,

        // Workflow
        registrationStatus:
          "pending_verification",
      }
    })
  }

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">
          Loading student information...
        </p>
      </div>
    )
  }

  // ==========================================================
  // STUDENT NOT FOUND
  // ==========================================================

  if (!student) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background px-4">
        <div className="rounded-2xl border bg-card p-8 text-center">
          <h1 className="font-semibold">
            Student account not found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            We could not find student information
            associated with this account.
          </p>
        </div>
      </div>
    )
  }

  // ==========================================================
  // PENDING REGISTRAR VERIFICATION
  // ==========================================================

  if (
    student.registrationStatus ===
    "pending_verification"
  ) {
    const studentName = [
      student.firstName,
      student.middleName,
      student.lastName,
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <RegistrarVerificationPending
        studentName={studentName}
      />
    )
  }

  // ==========================================================
  // REGISTRATION FORM
  // ==========================================================

  return (
    <StudentInformationForm
      student={student}
      onComplete={handleComplete}
    />
  )
}