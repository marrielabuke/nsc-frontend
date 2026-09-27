import { z } from "zod"

// ============================================================
// FILE SCHEMA
// ============================================================
// Using z.custom instead of z.instanceof(File) prevents
// problems when Next.js evaluates code on the server where
// the browser File API may not exist.
// ============================================================

const optionalFileSchema = z
  .custom<File>(
    (value) => {
      if (value === undefined) {
        return true
      }

      if (typeof File === "undefined") {
        return true
      }

      return value instanceof File
    },
    {
      message: "Invalid file",
    }
  )
  .optional()

// ============================================================
// STUDENT INFORMATION SCHEMA
// ============================================================

export const studentInformationSchema = z.object({
  // =========================================================
  // PERSONAL INFORMATION
  // =========================================================

  firstName: z
    .string()
    .trim()
    .min(1, "First name is required"),

  middleName: z
    .string()
    .trim()
    .optional(),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required"),

  extensionName: z
    .string()
    .trim()
    .optional(),

  birthDate: z
    .string()
    .min(1, "Birth date is required"),

  birthPlace: z
    .string()
    .trim()
    .min(1, "Birth place is required"),

  gender: z.enum(
    ["male", "female"],
    {
      message: "Gender is required",
    }
  ),

  civilStatus: z.enum(
    [
      "single",
      "married",
      "widowed",
      "separated",
    ],
    {
      message: "Civil status is required",
    }
  ),

  citizenship: z
    .string()
    .trim()
    .min(
      1,
      "Citizenship is required"
    ),

  mobileNumber: z
    .string()
    .trim()
    .regex(
      /^09\d{9}$/,
      "Enter a valid Philippine mobile number"
    ),

  // =========================================================
  // ADDRESS
  // =========================================================

  houseNumber: z
    .string()
    .trim()
    .optional(),

  street: z
    .string()
    .trim()
    .optional(),

  barangay: z
    .string()
    .trim()
    .min(
      1,
      "Barangay is required"
    ),

  city: z
    .string()
    .trim()
    .min(
      1,
      "City / Municipality is required"
    ),

  province: z
    .string()
    .trim()
    .min(
      1,
      "Province is required"
    ),

  zipCode: z
    .string()
    .trim()
    .regex(
      /^\d{4}$/,
      "Enter a valid 4-digit zip code"
    ),

  // =========================================================
  // GUARDIAN
  // =========================================================

  guardianRelationship: z.enum(
    [
      "father",
      "mother",
      "guardian",
    ],
    {
      message:
        "Relationship is required",
    }
  ),

  guardianFirstName: z
    .string()
    .trim()
    .min(
      1,
      "Guardian first name is required"
    ),

  guardianMiddleName: z
    .string()
    .trim()
    .optional(),

  guardianLastName: z
    .string()
    .trim()
    .min(
      1,
      "Guardian last name is required"
    ),

  guardianExtensionName: z
    .string()
    .trim()
    .optional(),

  guardianMobileNumber: z
    .string()
    .trim()
    .regex(
      /^09\d{9}$/,
      "Enter a valid guardian mobile number"
    ),

  guardianEmail: z
    .union([
      z.literal(""),
      z
        .string()
        .email(
          "Enter a valid email address"
        ),
    ])
    .optional(),

  guardianOccupation: z
    .string()
    .trim()
    .optional(),

  // =========================================================
  // PREVIOUS SCHOOL
  // =========================================================

  schoolName: z
    .string()
    .trim()
    .min(
      1,
      "School name is required"
    ),

  schoolType: z.enum(
    [
      "grade-school",
      "high-school",
    ],
    {
      message:
        "School type is required",
    }
  ),

  schoolAddress: z
    .string()
    .trim()
    .optional(),

  yearGraduated: z
    .string()
    .trim()
    .regex(
      /^\d{4}$/,
      "Enter a valid graduation year"
    ),

  // =========================================================
  // DOCUMENTS
  // =========================================================

  psaBirthCertificate:
    optionalFileSchema,

  form138:
    optionalFileSchema,
})

// ============================================================
// FORM DATA TYPE
// ============================================================

export type StudentInformationData =
  z.infer<
    typeof studentInformationSchema
  >