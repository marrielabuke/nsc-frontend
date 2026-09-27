import type {
  StudentRegistrationStatus,
  StudentUser,
} from "@/types/student/student"

import type {
  StudentInformationData,
} from "@/lib/schemas/student/student-information"


export const dummyStudentUsers: StudentUser[] = [
  // =========================================================
  // VERIFIED STUDENTS
  // =========================================================

  {
    // UserAccount
    userId: "USR-001",
    email: "juan.delacruz@nsc.edu.ph",
    password: "student123",
    isEmailVerified: true,
    isActive: true,
    role: "student",

    // Person
    personId: "PER-001",
    firstName: "Juan",
    middleName: "Santos",
    lastName: "Dela Cruz",

    // Student_Status_History
    studentStatusId: "STS-001",
    studentNumber: "210047",
    status: "active",

    // Student_Enrollment_History
    curriculumId: "CUR-BSIT-2026",
    course: "BSIT",
    yearLevel: 1,

    // Registration
    registrationStatus: "verified",
  },

  {
    // UserAccount
    userId: "USR-002",
    email: "maria.reyes@nsc.edu.ph",
    password: "student456",
    isEmailVerified: true,
    isActive: true,
    role: "student",

    // Person
    personId: "PER-002",
    firstName: "Maria",
    lastName: "Reyes",

    // Student_Status_History
    studentStatusId: "STS-002",
    studentNumber: "2026-00002",
    status: "active",

    // Student_Enrollment_History
    curriculumId: "CUR-BSHM-2026",
    course: "BSHM",
    yearLevel: 2,

    // Registration
    registrationStatus: "verified",
  },

  {
    // UserAccount
    userId: "USR-003",
    email: "pedro.garcia@nsc.edu.ph",
    password: "student789",
    isEmailVerified: true,
    isActive: true,
    role: "student",

    // Person
    personId: "PER-003",
    firstName: "Pedro",
    lastName: "Garcia",

    // Student_Status_History
    studentStatusId: "STS-003",
    studentNumber: "2026-00003",
    status: "active",

    // Student_Enrollment_History
    curriculumId: "CUR-BSOA-2026",
    course: "BSOA",
    yearLevel: 3,

    // Registration
    registrationStatus: "verified",
  },

  {
    // UserAccount
    userId: "USR-004",
    email: "rio.atencio@nsc.edu.ph",
    password: "student230",
    isEmailVerified: true,
    isActive: true,
    role: "student",

    // Person
    personId: "PER-004",
    firstName: "Rio",
    middleName: "Umanga",
    lastName: "Atencio",

    // Student_Status_History
    studentStatusId: "STS-004",
    studentNumber: "230460",
    status: "active",

    // Student_Enrollment_History
    curriculumId: "CUR-BSIT-2026",
    course: "BSIT",
    yearLevel: 4,

    // Registration
    registrationStatus: "verified",
  },

  {
    // UserAccount
    userId: "USR-005",
    email: "etchangales@gmail.com",
    password: "student230",
    isEmailVerified: true,
    isActive: true,
    role: "student",

    // Person
    personId: "PER-005",
    firstName: "Christian",
    middleName: "Puaso",
    lastName: "Gales",

    // Student_Status_History
    studentStatusId: "STS-005",
    studentNumber: "230461",
    status: "active",

    // Student_Enrollment_History
    curriculumId: "CUR-BSIT-2026",
    course: "BSIT",
    yearLevel: 1,

    // Registration
    registrationStatus: "verified",
  },

  // =========================================================
  // NEW STUDENT
  // Email is verified, but registration is incomplete.
  // =========================================================

  {
    userId: "USR-006",
    email: "newstudent@nsc.edu.ph",
    password: "student123",
    isEmailVerified: true,
    isActive: true,
    role: "student",

    registrationStatus: "incomplete",
  },

  // =========================================================
  // UNVERIFIED STUDENT ACCOUNT
  // =========================================================

  {
    userId: "USR-007",
    email: "unverified@nsc.edu.ph",
    password: "student123",
    isEmailVerified: false,
    isActive: true,
    role: "student",

    registrationStatus: "incomplete",
  },
]

// ============================================================
// GET STUDENT BY USER ID
// ============================================================

export function getDummyStudentByUserId(
  userId: string
): StudentUser | undefined {
  return dummyStudentUsers.find(
    (student) => student.userId === userId
  )
}

// ============================================================
// CHECK IF PERSON INFORMATION EXISTS
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

export function isStudentRegistrationIncomplete(
  student: StudentUser
): boolean {
  return (
    student.registrationStatus === "incomplete"
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

export function isStudentRegistrationVerified(
  student: StudentUser
): boolean {
  return (
    student.registrationStatus === "verified"
  )
}

export function isStudentRegistrationRejected(
  student: StudentUser
): boolean {
  return (
    student.registrationStatus === "rejected"
  )
}

// ============================================================
// UPDATE REGISTRATION STATUS
// ============================================================

export function updateDummyStudentRegistrationStatus(
  userId: string,
  registrationStatus: StudentRegistrationStatus
): StudentUser | undefined {
  const student =
    getDummyStudentByUserId(userId)

  if (!student) {
    return undefined
  }

  student.registrationStatus =
    registrationStatus

  return student
}

// ============================================================
// SUBMIT STUDENT INFORMATION
// ============================================================
// TEMPORARY FRONTEND-ONLY FUNCTION
//
// This simulates saving:
// - Person
// - Address
// - Guardian
// - Previous School
// - Documents
//
// Later, replace this function with your backend API.
// ============================================================

export function submitDummyStudentInformation(
  userId: string,
  data: StudentInformationData
): StudentUser | undefined {
  const student =
    getDummyStudentByUserId(userId)

  if (!student) {
    return undefined
  }

  // ----------------------------------------------------------
  // PERSON
  // ----------------------------------------------------------

  student.personId =
    student.personId ??
    `PER-${userId.replace("USR-", "")}`

  student.firstName = data.firstName
  student.middleName = data.middleName
  student.lastName = data.lastName
  student.extensionName = data.extensionName

  student.birthDate = data.birthDate
  student.birthPlace = data.birthPlace
  student.gender = data.gender
  student.civilStatus = data.civilStatus
  student.citizenship = data.citizenship
  student.mobileNumber = data.mobileNumber

  // ----------------------------------------------------------
  // ADDRESS
  // ----------------------------------------------------------

  student.houseNumber = data.houseNumber
  student.street = data.street
  student.barangay = data.barangay
  student.city = data.city
  student.province = data.province
  student.zipCode = data.zipCode

  // ----------------------------------------------------------
  // GUARDIAN
  // ----------------------------------------------------------

  student.guardian = {
    relationship: data.guardianRelationship,

    firstName: data.guardianFirstName,
    middleName: data.guardianMiddleName,
    lastName: data.guardianLastName,
    extensionName: data.guardianExtensionName,

    mobileNumber: data.guardianMobileNumber,
    email: data.guardianEmail,
    occupation: data.guardianOccupation,
  }

  // ----------------------------------------------------------
  // PREVIOUS SCHOOL
  // ----------------------------------------------------------

  student.previousSchool = {
    schoolName: data.schoolName,
    schoolType: data.schoolType,
    schoolAddress: data.schoolAddress,
    yearGraduated: data.yearGraduated,
  }

  // ----------------------------------------------------------
  // DOCUMENTS
  // ----------------------------------------------------------
  // For dummy data, only save the filename.
  //
  // Do NOT try to permanently store File objects here.
  // The backend will eventually upload the actual files.
  // ----------------------------------------------------------

  student.documents = {
    psaBirthCertificate:
      data.psaBirthCertificate?.name,

    form138:
      data.form138?.name,
  }

  // ----------------------------------------------------------
  // REGISTRATION WORKFLOW
  // ----------------------------------------------------------

  student.registrationStatus =
    "pending_verification"

  return student
}

// ============================================================
// DUMMY REGISTRAR APPROVAL
// ============================================================
// Useful later when testing the registrar side.
// ============================================================

export function approveDummyStudentRegistration(
  userId: string
): StudentUser | undefined {
  const student =
    getDummyStudentByUserId(userId)

  if (!student) {
    return undefined
  }

  student.registrationStatus = "verified"

  return student
}

// ============================================================
// DUMMY REGISTRAR REJECTION
// ============================================================

export function rejectDummyStudentRegistration(
  userId: string
): StudentUser | undefined {
  const student =
    getDummyStudentByUserId(userId)

  if (!student) {
    return undefined
  }

  student.registrationStatus = "rejected"

  return student
}