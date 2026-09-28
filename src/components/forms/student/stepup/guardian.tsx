"use client"

import type { UseFormReturn } from "react-hook-form"

import { Users } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type {
  StudentInformationData,
} from "@/lib/schemas/student/student-information"

// ============================================================
// PROPS
// ============================================================

interface GuardianStepProps {
  form: UseFormReturn<StudentInformationData>
}

// ============================================================
// GUARDIAN STEP
// ============================================================

export default function GuardianStep({
  form,
}: GuardianStepProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form

  const guardianRelationship = watch(
    "guardianRelationship"
  )

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">
          Parent / Guardian 
      </h3>
      <div className="grid gap-5 md:grid-cols-2">
        {/* Relationship */}

        <div className="space-y-2">
          <Label htmlFor="guardianRelationship">
            Relationship
            <span className="text-destructive">
              {" "}
              *
            </span>
          </Label>

          <Select
            value={guardianRelationship}
            onValueChange={(value) => {
              setValue(
                "guardianRelationship",
                value as StudentInformationData["guardianRelationship"],
                {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                }
              )
            }}
          >
            <SelectTrigger
              id="guardianRelationship"
              className="w-full"
            >
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="father">
                Father
              </SelectItem>

              <SelectItem value="mother">
                Mother
              </SelectItem>

              <SelectItem value="guardian">
                Guardian
              </SelectItem>
            </SelectContent>
          </Select>

          {errors.guardianRelationship && (
            <p className="text-sm text-destructive">
              {
                errors.guardianRelationship
                  .message
              }
            </p>
          )}
        </div>

        {/* Empty space on desktop */}

        <div className="hidden md:block" />

        {/* First Name */}

        <div className="space-y-2">
          <Label htmlFor="guardianFirstName">
            First Name
            <span className="text-destructive">
              {" "}
              *
            </span>
          </Label>

          <Input
            id="guardianFirstName"
            placeholder="First name"
            {...register(
              "guardianFirstName"
            )}
          />

          {errors.guardianFirstName && (
            <p className="text-sm text-destructive">
              {
                errors.guardianFirstName
                  .message
              }
            </p>
          )}
        </div>

        {/* Last Name */}

        <div className="space-y-2">
          <Label htmlFor="guardianLastName">
            Last Name
            <span className="text-destructive">
              {" "}
              *
            </span>
          </Label>

          <Input
            id="guardianLastName"
            placeholder="Last name"
            {...register(
              "guardianLastName"
            )}
          />

          {errors.guardianLastName && (
            <p className="text-sm text-destructive">
              {
                errors.guardianLastName
                  .message
              }
            </p>
          )}
        </div>

        {/* Middle Name */}

        <div className="space-y-2">
          <Label htmlFor="guardianMiddleName">
            Middle Name
          </Label>

          <Input
            id="guardianMiddleName"
            placeholder="Middle name"
            {...register(
              "guardianMiddleName"
            )}
          />

          {errors.guardianMiddleName && (
            <p className="text-sm text-destructive">
              {
                errors.guardianMiddleName
                  .message
              }
            </p>
          )}
        </div>

        {/* Extension Name */}

        <div className="space-y-2">
          <Label htmlFor="guardianExtensionName">
            Extension Name
          </Label>

          <Input
            id="guardianExtensionName"
            placeholder="Jr., Sr., III"
            {...register(
              "guardianExtensionName"
            )}
          />

          {errors.guardianExtensionName && (
            <p className="text-sm text-destructive">
              {
                errors.guardianExtensionName
                  .message
              }
            </p>
          )}
        </div>

        {/* Mobile Number */}

        <div className="space-y-2">
          <Label htmlFor="guardianMobileNumber">
            Mobile Number
            <span className="text-destructive">
              {" "}
              *
            </span>
          </Label>

          <Input
            id="guardianMobileNumber"
            type="tel"
            inputMode="numeric"
            maxLength={11}
            placeholder="09XXXXXXXXX"
            {...register(
              "guardianMobileNumber"
            )}
          />

          {errors.guardianMobileNumber && (
            <p className="text-sm text-destructive">
              {
                errors.guardianMobileNumber
                  .message
              }
            </p>
          )}
        </div>

        {/* Email */}

        <div className="space-y-2">
          <Label htmlFor="guardianEmail">
            Email Address
          </Label>

          <Input
            id="guardianEmail"
            type="email"
            placeholder="guardian@example.com"
            {...register(
              "guardianEmail"
            )}
          />

          {errors.guardianEmail && (
            <p className="text-sm text-destructive">
              {
                errors.guardianEmail
                  .message
              }
            </p>
          )}
        </div>

        {/* Occupation */}

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="guardianOccupation">
            Occupation
          </Label>

          <Input
            id="guardianOccupation"
            placeholder="Occupation"
            {...register(
              "guardianOccupation"
            )}
          />

          {errors.guardianOccupation && (
            <p className="text-sm text-destructive">
              {
                errors.guardianOccupation
                  .message
              }
            </p>
          )}
        </div>
      </div>
    </div>
  )
}