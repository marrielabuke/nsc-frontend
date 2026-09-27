import {
  dummyStudentUsers,
} from "@/lib/dummy/student/student"

import type {
  StudentRegistrationStatus,
  StudentUser,
} from "@/types/student/student"

// ============================================================
// GET STUDENT
// ============================================================

export function getStudentByUserId(
  userId: string
): StudentUser | undefined {
  return dummyStudentUsers.find(
    (student) =>
      student.userId === userId
  )
}

// ============================================================
// CHECK IF BASIC PERSON INFORMATION EXISTS
// ============================================================

export function hasCompletedStudentInformation(
  student: StudentUser
): boolean {
  return Boolean(
    student.personId &&
    student.firstName &&
    student.lastName
  )
}

// ============================================================
// REGISTRATION STATUS HELPERS
// ============================================================

export function isStudentIncomplete(
  student: StudentUser
): boolean {
  return (
    student.registrationStatus ===
    "incomplete"
  )
}

export function isStudentPendingVerification(
  student: StudentUser
): boolean {
  return (
    student.registrationStatus ===
    "pending_verification"
  )
}

export function isStudentVerified(
  student: StudentUser
): boolean {
  return (
    student.registrationStatus ===
    "verified"
  )
}

export function isStudentRejected(
  student: StudentUser
): boolean {
  return (
    student.registrationStatus ===
    "rejected"
  )
}

// ============================================================
// TEMPORARY DUMMY UPDATE
// ============================================================

export function updateDummyStudentRegistrationStatus(
  userId: string,
  status: StudentRegistrationStatus
): StudentUser | undefined {
  const student =
    getStudentByUserId(userId)

  if (!student) {
    return undefined
  }

  student.registrationStatus =
    status

  return student
}