"use client"

import { useState } from "react"

import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  GraduationCap,
  Home,
  LoaderCircle,
  UserRound,
  Users,
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

// remove this
const steps = [
  {
    id: 1,
    title: "Personal Information",
    description:
      "Provide your basic personal information. Fields marked with an asterisk are required.",
    icon: UserRound,
  },
  {
    id: 2,
    title: "Residential Address",
    description:
      "Enter your current residential address. Fields marked with an asterisk are required.",
    icon: Home,
  },
  {
    id: 3,
    title: "Parent / Guardian Information",
    description:
      "Provide the information of your parent or legal guardian. Fields marked with an asterisk are required.",
    icon: Users,
  },
  {
    id: 4,
    title: "Previous School",
    description:
      "Provide the details of the school you previously attended. Fields marked with an asterisk are required.",
    icon: GraduationCap,
  },
  {
    id: 5,
    title: "Admission Documents",
    description:
      "Upload the required admission documents. Make sure each document is clear and readable.",
    icon: FileCheck2,
  },
  {
    id: 6,
    title: "Review Information",
    description:
      "Review all the information you provided before submitting your registration.",
    icon: Check,
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
  // CURRENT STEP INFORMATION
  // ==========================================================

  const activeStep =
    steps[currentStep - 1]

  const ActiveStepIcon =
    activeStep.icon

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

      // Backend API here

      await onComplete?.(data)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="min-h-[calc(100vh-136px)] bg-muted/20 px-4 py-8 sm:px-6 lg:px-8">
      <form
        onSubmit={form.handleSubmit(
          handleSubmit
        )}
        className="mx-auto max-w-6xl"
      >
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
        
          <div className="border-b px-6 py-6 sm:px-8">
            <p className="text-sm font-medium text-primary">
              NSC Admission Portal
            </p>

            <div className="mt-4 inline-flex rounded-lg border bg-muted/30 px-3 py-2">
              <p className="text-sm text-muted-foreground">
                Account:{" "}
                <span className="font-medium text-foreground">
                  {student.email}
                </span>
              </p>
            </div>
          </div>

         <div className="border-b px-6 py-6 sm:px-8">
          <div className="rounded-2xl border bg-muted/30 p-5 sm:p-6">
            <div className="flex items-start">
              {steps.map((step, index) => {
                const isActive =
                  currentStep === step.id

                const isCompleted =
                  currentStep > step.id

                return (
                  <div
                    key={step.id}
                    className="flex flex-1 items-start"
                  >
                    {/* STEP */}

                    <div className="flex flex-col items-center">
                      <div
                        className={`
                          flex size-9 items-center
                          justify-center rounded-full
                          border text-sm font-medium
                          transition-colors
                          ${
                            isActive || isCompleted
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

                      <p
                        className={`
                          mt-2 hidden max-w-28
                          text-center text-xs
                          sm:block
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

                    {/* CONNECTING LINE */}

                    {index < steps.length - 1 && (
                      <div
                        className={`
                          mt-4 h-px flex-1
                          transition-colors
                          ${
                            currentStep > step.id
                              ? "bg-primary"
                              : "bg-border"
                          }
                        `}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

          {/* Card */}
          <div className="p-6 sm:p-4">
         

           
            {/* Content */}
            <div className="rounded-2xl border p-5 sm:p-4">
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
            </div>

            {/* Navigation */}

            <div className="mt-4 flex items-center justify-between border-t pt-5">
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
                    <>
                      <Check className="size-4" />
                      Submit Information
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}