"use client"

import { useState } from "react"

import PrivacyPolicyPage from "@/components/shared/privacy-policy"
import UserRegistrationForm from "@/components/forms/registration/college/student-registration-form-v2"

export default function RegistrationPage() {
  const [agreed, setAgreed] = useState(false)

  return agreed ? (
    <UserRegistrationForm />
  ) : (
    <PrivacyPolicyPage onAgree={() => setAgreed(true)} />
  )
}
