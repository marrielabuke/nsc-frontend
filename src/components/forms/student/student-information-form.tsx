"use client"

import { useState } from "react"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
} from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"

import PersonalInformationStep from "./stepup/personal-information"
import AddressStep from "./stepup/address"
import GuardianStep from "./stepup/guardian"
import PreviousSchoolStep from "./stepup/previous-school"
import DocumentsStep from "./stepup/documents"
import ReviewStep from "./stepup/review"

import {
  studentInformationSchema,
  type StudentInformationData,
} from "@/lib/schemas/student/student-information"

import type {
  StudentUser,
} from "@/types/student/student"

interface StudentInformationFormProps {
  student: StudentUser
  onComplete?: (
    data: StudentInformationData
  ) => void | Promise<void>
}

const steps = [
  {
    id: 1,
    title: "Personal Information",
  },
  {
    id: 2,
    title: "Address",
  },
  {
    id: 3,
    title: "Guardian",
  },
  {
    id: 4,
    title: "Previous School",
  },
  {
    id: 5,
    title: "Documents",
  },
  {
    id: 6,
    title: "Review",
  },
]

export default function StudentInformationForm({
  student,
  onComplete,
}: StudentInformationFormProps) {
  const [currentStep, setCurrentStep] =
    useState(1)

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const form = useForm<StudentInformationData>({
    resolver: zodResolver(
      studentInformationSchema
    ),

    mode: "onTouched",

    defaultValues: {
      // Personal
      firstName: student.firstName ?? "",
      middleName: student.middleName ?? "",
      lastName: student.lastName ?? "",
      extensionName:
        student.extensionName ?? "",

      birthDate: student.birthDate ?? "",
      birthPlace: student.birthPlace ?? "",

      gender: student.gender,

      civilStatus: student.civilStatus,

      citizenship:
        student.citizenship ?? "Filipino",

      mobileNumber:
        student.mobileNumber ?? "",

      // Address
      houseNumber:
        student.houseNumber ?? "",

      street: student.street ?? "",

      barangay: student.barangay ?? "",

      city: student.city ?? "",

      province: student.province ?? "",

      zipCode: student.zipCode ?? "",

      // Guardian
      guardianFirstName: "",
      guardianMiddleName: "",
      guardianLastName: "",
      guardianExtensionName: "",
      guardianMobileNumber: "",
      guardianEmail: "",
      guardianOccupation: "",

      // Previous school
      schoolName: "",
      schoolAddress: "",
      yearGraduated: "",

      // Files
      psaBirthCertificate: undefined,
      form138: undefined,
    },
  })

  // ==========================================================
  // NEXT STEP
  // ==========================================================

  async function nextStep() {
    let fields: (
      keyof StudentInformationData
    )[] = []

    switch (currentStep) {
      case 1:
        fields = [
          "firstName",
          "lastName",
          "birthDate",
          "birthPlace",
          "gender",
          "civilStatus",
          "citizenship",
          "mobileNumber",
        ]
        break

      case 2:
        fields = [
          "barangay",
          "city",
          "province",
          "zipCode",
        ]
        break

      case 3:
        fields = [
          "guardianRelationship",
          "guardianFirstName",
          "guardianLastName",
          "guardianMobileNumber",
          "guardianEmail",
        ]
        break

      case 4:
        fields = [
          "schoolName",
          "schoolType",
          "yearGraduated",
        ]
        break

      case 5:
        fields = [
          "psaBirthCertificate",
          "form138",
        ]
        break
    }

    const valid = await form.trigger(
      fields,
      {
        shouldFocus: true,
      }
    )

    if (!valid) {
      return
    }

    if (currentStep < steps.length) {
      setCurrentStep(
        (current) => current + 1
      )

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  // ==========================================================
  // PREVIOUS STEP
  // ==========================================================

  function previousStep() {
    if (currentStep <= 1) {
      return
    }

    setCurrentStep(
      (current) => current - 1
    )

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // ==========================================================
  // SUBMIT
  // ==========================================================

  async function handleSubmit(
    data: StudentInformationData
  ) {
    try {
      setIsSubmitting(true)

      console.log(
        "Student registration:",
        data
      )

      /*
       * ======================================================
       * BACKEND API WILL GO HERE LATER
       * ======================================================
       *
       * Example:
       *
       * await submitStudentInformation({
       *   userId: student.userId,
       *   ...data,
       * })
       *
       */

      await onComplete?.(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(
        handleSubmit
      )}
      className="min-h-svh bg-background"
    >
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-12">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">
            NSC Admission Portal
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Account: {student.email}
          </p>
        </div>

        <div className="mb-10">
          <div className="flex items-start">
            {steps.map(
              (step, index) => {
                const isActive =
                  currentStep === step.id

                const isCompleted =
                  currentStep > step.id

                return (
                  <div
                    key={step.id}
                    className="flex flex-1 items-start"
                  >
                    <div className="flex flex-col items-center">

                      {/* Circle */}
                      <div
                        className={`
                          flex size-9 items-center
                          justify-center rounded-full
                          border text-sm font-medium
                          ${
                            isActive ||
                            isCompleted
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-muted-foreground"
                          }
                        `}
                      >
                        {isCompleted ? (
                          <Check className="size-4" />
                        ) : (
                          step.id
                        )}
                      </div>

                      {/* Title */}
                      <p
                        className={`
                          mt-2 hidden text-center
                          text-xs sm:block
                          ${
                            isActive
                              ? "font-medium text-primary"
                              : "text-muted-foreground"
                          }
                        `}
                      >
                        {step.title}
                      </p>
                    </div>

                    {/* Connecting line */}
                    {index <
                      steps.length - 1 && (
                      <div
                        className={`
                          mt-4 h-px flex-1
                          ${
                            currentStep >
                            step.id
                              ? "bg-primary"
                              : "bg-border"
                          }
                        `}
                      />
                    )}
                  </div>
                )
              }
            )}
          </div>
        </div>

  
        <div className="mb-8 border-b pb-6">
          <div className="flex items-center justify-between gap-4">

            <h2 className="text-2xl font-semibold tracking-tight">
              {
                steps[currentStep - 1]
                  .title
              }
            </h2>           
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {currentStep === 6
              ? "Review your information before submitting your registration."
              : "Complete the information below before continuing to the next step."}
          </p>
        </div>

        {currentStep === 1 && (
          <PersonalInformationStep
            form={form}
          />
        )}

        {currentStep === 2 && (
          <AddressStep form={form} />
        )}

        {currentStep === 3 && (
          <GuardianStep form={form} />
        )}

        {currentStep === 4 && (
          <PreviousSchoolStep
            form={form}
          />
        )}

        {currentStep === 5 && (
          <DocumentsStep form={form} />
        )}

        {currentStep === 6 && (
          <ReviewStep
            data={form.getValues()}
            email={student.email}
          />
        )}

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <div className="mt-10 flex items-center justify-between border-t pt-6">

          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            disabled={
              currentStep === 1 ||
              isSubmitting
            }
          >
            <ChevronLeft className="size-4" />
            Previous
          </Button>

          {currentStep <
          steps.length ? (
            <Button
              type="button"
              onClick={nextStep}
            >
              Continue

              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Information"
              )}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}