"use client"

import type { UseFormReturn } from "react-hook-form"

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

interface PersonalInformationStepProps {
  form: UseFormReturn<StudentInformationData>
}

export default function PersonalInformationStep({
  form,
}: PersonalInformationStepProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form

  return (
    <div className="space-y-8">

      {/* =====================================================
          NAME
      ===================================================== */}

      <div>
        <h3 className="text-lg font-semibold">
          Student Name
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Enter your complete legal name as shown on your
          official documents.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name
              <span className="text-destructive"> *</span>
            </Label>

            <Input
              id="firstName"
              placeholder="Juan"
              {...register("firstName")}
            />

            {errors.firstName && (
              <p className="text-sm text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Middle Name */}
          <div className="space-y-2">
            <Label htmlFor="middleName">
              Middle Name
            </Label>

            <Input
              id="middleName"
              placeholder="Santos"
              {...register("middleName")}
            />

            {errors.middleName && (
              <p className="text-sm text-destructive">
                {errors.middleName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name
              <span className="text-destructive"> *</span>
            </Label>

            <Input
              id="lastName"
              placeholder="Dela Cruz"
              {...register("lastName")}
            />

            {errors.lastName && (
              <p className="text-sm text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Extension */}
          <div className="space-y-2">
            <Label htmlFor="extensionName">
              Extension
            </Label>

            <Input
              id="extensionName"
              placeholder="Jr., Sr., III"
              {...register("extensionName")}
            />

            {errors.extensionName && (
              <p className="text-sm text-destructive">
                {errors.extensionName.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          BIRTH INFORMATION
      ===================================================== */}

      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold">
          Birth Information
        </h3>

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          {/* Birth Date */}
          <div className="space-y-2">
            <Label htmlFor="birthDate">
              Date of Birth
              <span className="text-destructive"> *</span>
            </Label>

            <Input
              id="birthDate"
              type="date"
              {...register("birthDate")}
            />

            {errors.birthDate && (
              <p className="text-sm text-destructive">
                {errors.birthDate.message}
              </p>
            )}
          </div>

          {/* Birth Place */}
          <div className="space-y-2">
            <Label htmlFor="birthPlace">
              Place of Birth
              <span className="text-destructive"> *</span>
            </Label>

            <Input
              id="birthPlace"
              placeholder="Catarman, Northern Samar"
              {...register("birthPlace")}
            />

            {errors.birthPlace && (
              <p className="text-sm text-destructive">
                {errors.birthPlace.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          OTHER PERSONAL INFORMATION
      ===================================================== */}

      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold">
          Other Information
        </h3>

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          {/* Gender */}
          <div className="space-y-2">
            <Label>
              Gender
              <span className="text-destructive"> *</span>
            </Label>

            <Select
              value={watch("gender")}
              onValueChange={(value) =>
                setValue(
                  "gender",
                  value as "male" | "female",
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  }
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="male">
                  Male
                </SelectItem>

                <SelectItem value="female">
                  Female
                </SelectItem>
              </SelectContent>
            </Select>

            {errors.gender && (
              <p className="text-sm text-destructive">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Civil Status */}
          <div className="space-y-2">
            <Label>
              Civil Status
              <span className="text-destructive"> *</span>
            </Label>

            <Select
              value={watch("civilStatus")}
              onValueChange={(value) =>
                setValue(
                  "civilStatus",
                  value as StudentInformationData["civilStatus"],
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  }
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select civil status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="single">
                  Single
                </SelectItem>

                <SelectItem value="married">
                  Married
                </SelectItem>

                <SelectItem value="widowed">
                  Widowed
                </SelectItem>

                <SelectItem value="separated">
                  Separated
                </SelectItem>
              </SelectContent>
            </Select>

            {errors.civilStatus && (
              <p className="text-sm text-destructive">
                {errors.civilStatus.message}
              </p>
            )}
          </div>

          {/* Citizenship */}
          <div className="space-y-2">
            <Label htmlFor="citizenship">
              Citizenship
              <span className="text-destructive"> *</span>
            </Label>

            <Input
              id="citizenship"
              placeholder="Filipino"
              {...register("citizenship")}
            />

            {errors.citizenship && (
              <p className="text-sm text-destructive">
                {errors.citizenship.message}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">
              Mobile Number
              <span className="text-destructive"> *</span>
            </Label>

            <Input
              id="mobileNumber"
              type="tel"
              inputMode="numeric"
              maxLength={11}
              placeholder="09123456789"
              {...register("mobileNumber")}
            />

            {errors.mobileNumber && (
              <p className="text-sm text-destructive">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}