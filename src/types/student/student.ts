export type StudentStatus =
  | "active"
  | "inactive"
  | "graduated"

export type StudentRegistrationStatus =
  | "incomplete"
  | "pending_verification"
  | "verified"
  | "rejected"

// ============================================================
// GUARDIAN
// ============================================================

export interface StudentGuardian {
  relationship:
    | "father"
    | "mother"
    | "guardian"

  firstName: string
  middleName?: string
  lastName: string
  extensionName?: string

  mobileNumber: string
  email?: string
  occupation?: string
}

// ============================================================
// PREVIOUS SCHOOL
// ============================================================

export interface StudentPreviousSchool {
  schoolName: string

  schoolType:
    | "grade-school"
    | "high-school"

  schoolAddress?: string
  yearGraduated: string
}

// ============================================================
// DOCUMENTS
// ============================================================

export interface StudentDocuments {
  psaBirthCertificate?: string
  form138?: string
}

// ============================================================
// STUDENT USER
// ============================================================

export interface StudentUser {
  // =========================================================
  // USER ACCOUNT
  // =========================================================

  userId: string
  email: string
  password: string

  isEmailVerified: boolean
  isActive: boolean

  role: "student"

  // =========================================================
  // PERSON
  // =========================================================

  personId?: string

  firstName?: string
  middleName?: string
  lastName?: string
  extensionName?: string

  birthDate?: string
  birthPlace?: string

  gender?: "male" | "female"

  civilStatus?:
    | "single"
    | "married"
    | "widowed"
    | "separated"

  citizenship?: string
  mobileNumber?: string

  // =========================================================
  // ADDRESS
  // =========================================================

  houseNumber?: string
  street?: string
  barangay?: string
  city?: string
  province?: string
  zipCode?: string

  // =========================================================
  // GUARDIAN
  // =========================================================

  guardian?: StudentGuardian

  // =========================================================
  // PREVIOUS SCHOOL
  // =========================================================

  previousSchool?: StudentPreviousSchool

  // =========================================================
  // DOCUMENTS
  // =========================================================

  documents?: StudentDocuments

  // =========================================================
  // STUDENT STATUS HISTORY
  // =========================================================

  studentStatusId?: string
  studentNumber?: string
  status?: StudentStatus

  // =========================================================
  // STUDENT ENROLLMENT HISTORY
  // =========================================================

  curriculumId?: string
  course?: string
  yearLevel?: number

  // =========================================================
  // REGISTRATION
  // =========================================================

  registrationStatus: StudentRegistrationStatus
}