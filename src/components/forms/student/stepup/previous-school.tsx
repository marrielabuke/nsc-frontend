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

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <div className="rounded-2xl border bg-muted/30 p-5">
        <div className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="size-5" />
          </div>

          <div>
            <h3 className="font-semibold">
              Previous School Information
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Provide information about the school you
              most recently attended before applying to
              Northern Samar Colleges.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCHOOL
      ===================================================== */}

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