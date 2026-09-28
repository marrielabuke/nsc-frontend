"use client"

import type { UseFormReturn } from "react-hook-form"

import { Home } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type {
  StudentInformationData,
} from "@/lib/schemas/student/student-information"

interface AddressStepProps {
  form: UseFormReturn<StudentInformationData>
}

export default function AddressStep({
  form,
}: AddressStepProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">
          Residential Address
      </h3>
      {/* Address form */}
      <div className="grid gap-5 md:grid-cols-2">
          
        {/* House Number */}
        <div className="space-y-2">
         
          <Label htmlFor="houseNumber">
            House / Unit Number
          </Label>

          <Input
            id="houseNumber"
            placeholder="123"
            {...register("houseNumber")}
          />

          {errors.houseNumber && (
            <p className="text-sm text-destructive">
              {errors.houseNumber.message}
            </p>
          )}
        </div>

        {/* Street */}
        <div className="space-y-2">
          <Label htmlFor="street">
            Street
          </Label>

          <Input
            id="street"
            placeholder="Rizal Street"
            {...register("street")}
          />

          {errors.street && (
            <p className="text-sm text-destructive">
              {errors.street.message}
            </p>
          )}
        </div>

        {/* Barangay */}
        <div className="space-y-2">
          <Label htmlFor="barangay">
            Barangay
            <span className="text-destructive"> *</span>
          </Label>

          <Input
            id="barangay"
            placeholder="Barangay name"
            {...register("barangay")}
          />

          {errors.barangay && (
            <p className="text-sm text-destructive">
              {errors.barangay.message}
            </p>
          )}
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">
            City / Municipality
            <span className="text-destructive"> *</span>
          </Label>

          <Input
            id="city"
            placeholder="Catarman"
            {...register("city")}
          />

          {errors.city && (
            <p className="text-sm text-destructive">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* Province */}
        <div className="space-y-2">
          <Label htmlFor="province">
            Province
            <span className="text-destructive"> *</span>
          </Label>

          <Input
            id="province"
            placeholder="Northern Samar"
            {...register("province")}
          />

          {errors.province && (
            <p className="text-sm text-destructive">
              {errors.province.message}
            </p>
          )}
        </div>

        {/* Zip Code */}
        <div className="space-y-2">
          <Label htmlFor="zipCode">
            Zip Code
            <span className="text-destructive"> *</span>
          </Label>

          <Input
            id="zipCode"
            inputMode="numeric"
            maxLength={4}
            placeholder="6400"
            {...register("zipCode")}
          />

          {errors.zipCode && (
            <p className="text-sm text-destructive">
              {errors.zipCode.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}