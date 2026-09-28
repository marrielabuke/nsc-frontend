"use client"

import type { UseFormReturn } from "react-hook-form"

import { GraduationCap } from "lucide-react"

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

interface PreviousSchoolStepProps {
  form: UseFormReturn<StudentInformationData>
}

export default function PreviousSchoolStep({
  form,
}: PreviousSchoolStepProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">
          Previous School
      </h3>
      <div className="grid gap-5 md:grid-cols-2">

        {/* School Name */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="schoolName">
            School Name
            <span className="text-destructive"> *</span>
          </Label>

          <Input
            id="schoolName"
            placeholder="Enter complete school name"
            {...register("schoolName")}
          />

          {errors.schoolName && (
            <p className="text-sm text-destructive">
              {errors.schoolName.message}
            </p>
          )}
        </div>

        {/* School Type */}
        <div className="space-y-2">
          <Label>
            School Level
            <span className="text-destructive"> *</span>
          </Label>

          <Select
            value={watch("schoolType")}
            onValueChange={(value) =>
              setValue(
                "schoolType",
                value as StudentInformationData["schoolType"],
                {
                  shouldValidate: true,
                  shouldDirty: true,
                }
              )
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select school level" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="grade-school">
                Grade School
              </SelectItem>

              <SelectItem value="high-school">
                High School / Senior High School
              </SelectItem>
            </SelectContent>
          </Select>

          {errors.schoolType && (
            <p className="text-sm text-destructive">
              {errors.schoolType.message}
            </p>
          )}
        </div>

        {/* Graduation Year */}
        <div className="space-y-2">
          <Label htmlFor="yearGraduated">
            Year Graduated
            <span className="text-destructive"> *</span>
          </Label>

          <Input
            id="yearGraduated"
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="2026"
            {...register("yearGraduated")}
          />

          {errors.yearGraduated && (
            <p className="text-sm text-destructive">
              {errors.yearGraduated.message}
            </p>
          )}
        </div>

        {/* School Address */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="schoolAddress">
            School Address
          </Label>

          <Input
            id="schoolAddress"
            placeholder="City / Municipality, Province"
            {...register("schoolAddress")}
          />

          {errors.schoolAddress && (
            <p className="text-sm text-destructive">
              {errors.schoolAddress.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}