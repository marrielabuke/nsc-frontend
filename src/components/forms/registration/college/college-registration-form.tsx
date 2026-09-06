"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Upload, CheckCircle2, GraduationCap, User, MapPin, CircleAlert, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"


interface FormData {
  schoolYear: string
  semester: string
  status: string
  lastName: string
  firstName: string
  middleName: string
  nameExtension: string
  placeOfBirth: string
  dateOfBirth: string
  age: string
  sex: string
  civilStatus: string
  email: string
  zipCode: string
  province: string
  city: string
  homeNumber: string
  street: string
  mobileNumber: string
  religion: string
  guardianName: string
  emergencyMobile: string
  emergencyPhone: string
  emergencyEmail: string
  emergencyAddress: string
  primarySchool: string
  primaryYearGrad: string
  lrn: string
  secondarySchool: string
  secondaryYearGrad: string
  shsSchool: string
  shsYearGrad: string
  shsStrand: string
  fatherName: string
  fatherOccupation: string
  fatherMobile: string
  fatherPhone: string
  fatherAddress: string
  motherName: string
  motherOccupation: string
  motherMobile: string
  motherPhone: string
  motherAddress: string
  spouseName: string
  spouseOccupation: string
  spouseMobile: string
  spousePhone: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const steps = [
  "basic-info",
  "personal-info",
  "emergency-contact",
  "academic-info",
  "family-info",
  "file-upload",
]

const tabTitles: Record<string, string> = {
  "basic-info": "Basic Information",
  "personal-info": "Personal Information",
  "emergency-contact": "Person to Notify in Case of Emergency",
  "academic-info": "Academic Information",
  "family-info": "Family Information",
  "file-upload": "File Upload",
}


const requiredByStep: Record<string, (keyof FormData)[]> = {
  "basic-info": ["schoolYear", "semester", "status", "lastName", "firstName", "placeOfBirth", "dateOfBirth", "sex", "civilStatus", "email"],
  "personal-info": ["zipCode","province",  "city", "street", "mobileNumber", "religion"],
  "emergency-contact": ["guardianName", "emergencyAddress"],
  "academic-info": ["primarySchool", "primaryYearGrad", "lrn", "secondarySchool", "secondaryYearGrad", "shsSchool", "shsYearGrad", "shsStrand"],
  "family-info": ["fatherName", "motherName"],
  "file-upload": [],
}

const fieldLabels: Partial<Record<keyof FormData, string>> = {
  schoolYear: "School Year",
  semester: "Semester",
  status: "Status",
  lastName: "Last Name",
  firstName: "First Name",
  placeOfBirth: "Place of Birth",
  dateOfBirth: "Date of Birth",
  sex: "Sex",
  civilStatus: "Civil Status",
  email: "Email",
  zipCode: "Zip Code",
  province: "Province / State",
  city: "City",
  street: "Street / Brgy.",
  mobileNumber: "Mobile Number",
  religion: "Religion",
  guardianName: "Guardian / Contact Name",
  emergencyMobile: "Mobile Number",
  emergencyAddress: "Address",
  primarySchool: "Primary School",
  primaryYearGrad: "Primary Year Graduated",
  lrn:"LRN",
  secondarySchool: "Secondary School",
  secondaryYearGrad: "Secondary Year Graduated",
  shsSchool: "SHS School",
  shsYearGrad: "SHS Year Graduated",
  shsStrand: "SHS Strand",
  fatherName: "Father's Fullname",
  motherName: "Mother's Fullname",
}

const initialFormData: FormData = {
  schoolYear: "2026-2027",
  semester: "",
  status: "",
  lastName: "",
  firstName: "",
  middleName: "",
  nameExtension: "",
  placeOfBirth: "",
  dateOfBirth: "",
  age: "",
  sex: "",
  civilStatus: "",
  email: "",
  zipCode: "",
  province: "",
  city: "",
  homeNumber: "",
  street: "",
  mobileNumber: "",
  religion: "",
  guardianName: "",
  emergencyMobile: "",
  emergencyPhone: "",
  emergencyEmail: "",
  emergencyAddress: "",
  primarySchool: "",
  primaryYearGrad: "",
  lrn: "",
  secondarySchool: "",
  secondaryYearGrad: "",
  shsSchool: "",
  shsYearGrad: "",
  shsStrand: "",
  fatherName: "",
  fatherOccupation: "",
  fatherMobile: "",
  fatherPhone: "",
  fatherAddress: "",
  motherName: "",
  motherOccupation: "",
  motherMobile: "",
  motherPhone: "",
  motherAddress: "",
  spouseName: "",
  spouseOccupation: "",
  spouseMobile: "",
  spousePhone: "",
}

export default function CollegeRegistrationForm() {

  const [activeTab, setActiveTab] = useState(steps[0])
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const currentStep = steps.indexOf(activeTab)

  useEffect(() => {
    if (!formData.dateOfBirth) {
      setFormData(prev => ({ ...prev, age: "" })) 
      return
    }
    const today = new Date()
    const dob = new Date(formData.dateOfBirth)
    let calculated = today.getFullYear() - dob.getFullYear()
    const monthDiff = today.getMonth() - dob.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      calculated--
    }
    setFormData(prev => ({ ...prev, age: calculated.toString() }))
  }, [formData.dateOfBirth])



  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validateStep = (step: string): boolean => {
    const required = requiredByStep[step] ?? []
    const newErrors: FormErrors = {}
    required.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${fieldLabels[field] ?? field} is required.`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (!validateStep(activeTab)) return
    if (currentStep < steps.length - 1) setActiveTab(steps[currentStep + 1])
  }

  const prevStep = () => {
    setErrors({})
    if (currentStep > 0) setActiveTab(steps[currentStep - 1])
  }


  const handleSubmit = () => {
    const payload = { ...formData, file: uploadedFile?.name ?? null }
    console.log("Submitting registration:", payload)
    // TODO: replace with actual API call
    // await fetch("/api/register", { method: "POST", body: JSON.stringify(payload) })
    setSubmitted(true)
  }

  // ── Inline error message component ──────────────────────────────────────────
  const Err = ({ field }: { field: keyof FormData }) =>
    errors[field] ? <p className="text-xs text-red-500 mt-1">{errors[field]}</p> : null

  const req = <span className="text-red-500">*</span>

  // ── Success screen ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-10">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border bg-background shadow-lg transition-all">
  
          <div className="border-b bg-green-50/50 px-8 py-12 text-center dark:bg-green-950/20">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm dark:bg-green-900/50 dark:text-green-500">
              <CheckCircle2 className="h-10 w-10 animate-in zoom-in duration-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Registration Submitted!
            </h2>
  
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Your application has been received successfully. Please review a copy of your submitted information below for your records.
            </p>
          </div>
  
          {/* Content */}
          {/* Remove this for testing purposes */}
          <div className="space-y-10 p-8 sm:p-10">
            {/* Academic Information */}
            <section>
              <div className="mb-5 flex items-center gap-2 border-b pb-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Academic Information
                </h3>
              </div>
  
              <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <li className="rounded-xl border bg-muted/10 p-4 transition-colors hover:bg-muted/20">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">School Year</span>
                  <p className="mt-1 font-medium text-foreground">{formData.schoolYear}</p>
                </li>
                <li className="rounded-xl border bg-muted/10 p-4 transition-colors hover:bg-muted/20">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Semester</span>
                  <p className="mt-1 font-medium text-foreground">{formData.semester}</p>
                </li>
                <li className="rounded-xl border bg-muted/10 p-4 transition-colors hover:bg-muted/20">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</span>
                  <p className="mt-1 font-medium text-foreground">{formData.status}</p>
                </li>
              </ul>
            </section>
  
            {/* Personal Information */}
            <section>
              <div className="mb-5 flex items-center gap-2 border-b pb-2">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Personal Information
                </h3>
              </div>
  
              <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <li className="rounded-xl border bg-muted/10 p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Full Name</span>
                  <p className="mt-1 font-medium text-foreground">
                    {formData.lastName}, {formData.firstName} {formData.middleName}
                  </p>
                </li>
                <li className="rounded-xl border bg-muted/10 p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Date of Birth</span>
                  <p className="mt-1 font-medium text-foreground">{formData.dateOfBirth}</p>
                </li>
                <li className="rounded-xl border bg-muted/10 p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Place of Birth</span>
                  <p className="mt-1 font-medium text-foreground">{formData.placeOfBirth}</p>
                </li>
                <li className="rounded-xl border bg-muted/10 p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Age & Sex</span>
                  <p className="mt-1 font-medium text-foreground">{formData.age} yrs old • {formData.sex}</p>
                </li>
                <li className="rounded-xl border bg-muted/10 p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Civil Status</span>
                  <p className="mt-1 font-medium text-foreground">{formData.civilStatus}</p>
                </li>
                <li className="rounded-xl border bg-muted/10 p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Religion</span>
                  <p className="mt-1 font-medium text-foreground">{formData.religion}</p>
                </li>
              </ul>
            </section>
  
            {/* Contact Information */}
            <section>
              <div className="mb-5 flex items-center gap-2 border-b pb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Contact Information
                </h3>
              </div>
  
              <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <li className="rounded-xl border bg-muted/10 p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</span>
                  <p className="mt-1 font-medium text-foreground">{formData.email}</p>
                </li>
                <li className="rounded-xl border bg-muted/10 p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mobile Number</span>
                  <p className="mt-1 font-medium text-foreground">{formData.mobileNumber}</p>
                </li>
                <li className="rounded-xl border bg-muted/10 p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Home Number</span>
                  <p className="mt-1 font-medium text-foreground">{formData.homeNumber}</p>
                </li>
                <li className="md:col-span-3 rounded-xl border bg-muted/10 p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Address</span>
                  <p className="mt-1 font-medium text-foreground">
                    {formData.street}, {formData.city}, {formData.province} {formData.zipCode}
                  </p>
                </li>
              </ul>
            </section>
  
            {/* Footer Buttons */}
            {/* No use for now */}
            {/* <div className="mt-10 flex flex-col-reverse gap-3 border-t pt-8 sm:flex-row sm:justify-end">
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
  
              <Button size="lg" asChild className="w-full text-white sm:w-auto">
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
            </div> */}
            
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-foreground dark:bg-slate-950">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.10),transparent_28%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]" />

        <header className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white">
                <img
                src="/images/nsc-logoo.png"
                alt="NSC Logo"
                />
            </div>

            <div>
                <h1 className="text-lg font-bold text-white">
                NSC
                </h1>

                <p className="text-sm text-white/60">
                Admission Portal
                </p>
            </div>
            </div>

            <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300 md:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Enrollment Open
            </div>

            <div className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
                A.Y. 2026–2027
            </div>
            </div>
        </header>

        {/* Main */}
        <main className="relative z-10 flex items-center justify-center px-4 py-10 md:px-6">
            <div className="w-full max-w-5xl">

                {/* ── CARD ── */}
                <Card className="overflow-hidden border-primary  shadow-sm rounded-2xl p-0">
                <CardHeader className="text-primary py-5 border-b border-white/10 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] items-center">
                    <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">
                        College Registration Form
                    </p>
                    <CardTitle className="text-2xl font-semibold text-primary">
                        {tabTitles[activeTab]}
                    </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="p-8 pt-0">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

                    {/* ── STEP INDICATORS ── */}
                    <TabsList className="grid w-full grid-cols-6 bg-primary/10 rounded-xl p-1 mb-10">
                        {steps.map((step, i) => (
                        <TabsTrigger
                            key={step}
                            value={step}
                            disabled
                            className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary"
                        >
                            {i + 1}
                        </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* ════════════════════════════════════════════════════════════
                        STEP 1 — Basic Info
                    ════════════════════════════════════════════════════════════ */}
                    <TabsContent value="basic-info">
                        <FieldGroup className="space-y-2">

                        <div className="md:col-span-2 rounded-xl border border-[var(--primary)] p-4 flex gap-3 text-sm">
                            <span className="mt-0.5 text-[var(--primary)]">
                                <CircleAlert />
                            </span>
                            <div>
                                <p className="mb-1 font-semibold text-blue-900 dark:text-blue-100">Before you begin</p>
                                <p className="leading-relaxed text-blue-800/80 dark:text-blue-200/80">
                                    A digital copy of your filled-out registration form will be sent to your email.
                                    Please ensure that the email address you provided is valid and accessible.
                                </p>
                            </div>
                        </div>

                        {/* SY */}
                        <div className="grid gap-4 md:grid-cols-3">
                            <Field>
                            <FieldLabel>School Year {req} </FieldLabel>
                            <Input
                                value={formData.schoolYear}
                                onChange={e => handleChange("schoolYear", e.target.value)}
                                className={errors.schoolYear ? "border-red-500" : ""}
                            />
                            <Err field="schoolYear" />
                            </Field>

                            <Field>
                            <FieldLabel>Semester {req}</FieldLabel>
                            <Select value={formData.semester} onValueChange={v => handleChange("semester", v)}>
                                <SelectTrigger className={errors.semester ? "border-red-500" : ""}>
                                <SelectValue placeholder="Select semester" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="1st">First Semester</SelectItem>
                                <SelectItem value="2nd">Second Semester</SelectItem>
                                </SelectContent>
                            </Select>
                            <Err field="semester" />
                            </Field>

                            <Field>
                            <FieldLabel>Status {req}</FieldLabel>
                            <Select value={formData.status} onValueChange={v => handleChange("status", v)}>
                                <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                                <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="new">New Student</SelectItem>
                                <SelectItem value="old">Old Student</SelectItem>
                                <SelectItem value="transferee">Transferee</SelectItem>
                                </SelectContent>
                            </Select>
                            <Err field="status" />
                            </Field>
                        </div>

                        {/* Fullname */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Fullname</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                            <Field>
                                <FieldLabel>Lastname {req}</FieldLabel>
                                <Input
                                value={formData.lastName}
                                onChange={e => handleChange("lastName", e.target.value)}
                                className={errors.lastName ? "border-red-500" : ""}
                                />
                                <Err field="lastName" />
                            </Field>
                            <Field>
                                <FieldLabel>Firstname {req}</FieldLabel>
                                <Input
                                value={formData.firstName}
                                onChange={e => handleChange("firstName", e.target.value)}
                                className={errors.firstName ? "border-red-500" : ""}
                                />
                                <Err field="firstName" />
                            </Field>
                            <Field>
                                <FieldLabel>Middlename</FieldLabel>
                                <Input
                                value={formData.middleName}
                                onChange={e => handleChange("middleName", e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel>Name Extension</FieldLabel>
                                <Input
                                value={formData.nameExtension}
                                onChange={e => handleChange("nameExtension", e.target.value)}
                                />
                            </Field>
                            
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Personal Details</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                            <Field>
                                <FieldLabel>Place of Birth {req}</FieldLabel>
                                <Input
                                value={formData.placeOfBirth}
                                onChange={e => handleChange("placeOfBirth", e.target.value)}
                                className={errors.placeOfBirth ? "border-red-500" : ""}
                                />
                                <Err field="placeOfBirth" />
                            </Field>
                            <Field>
                                <FieldLabel>Date of Birth {req}</FieldLabel>
                                <Input
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={e => handleChange("dateOfBirth", e.target.value)}
                                className={errors.dateOfBirth ? "border-red-500" : ""}
                                />
                                <Err field="dateOfBirth" />
                            </Field>
                            <Field>
                                <FieldLabel>Age</FieldLabel>
                                <Input value={formData.age} disabled placeholder="Auto calculated" />
                            </Field>
                            <Field>
                                <FieldLabel>Sex {req}</FieldLabel>
                                <Select value={formData.sex} onValueChange={v => handleChange("sex", v)}>
                                <SelectTrigger className={errors.sex ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select sex" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                                </Select>
                                <Err field="sex" />
                            </Field>
                            <Field>
                                <FieldLabel>Civil Status {req}</FieldLabel>
                                <Select value={formData.civilStatus} onValueChange={v => handleChange("civilStatus", v)}>
                                <SelectTrigger className={errors.civilStatus ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select civil status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="married">Married</SelectItem>
                                    <SelectItem value="widowed">Widowed</SelectItem>
                                </SelectContent>
                                </Select>
                                <Err field="civilStatus" />
                            </Field>
                            <Field>
                                <FieldLabel>Email {req}</FieldLabel>
                                <Input
                                type="email"
                                value={formData.email}
                                onChange={e => handleChange("email", e.target.value)}
                                className={errors.email ? "border-red-500" : ""}
                                />
                                <Err field="email" />
                            </Field>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={nextStep} className="text-white">
                            Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                        </FieldGroup>
                    </TabsContent>

                    {/* ════════════════════════════════════════════════════════════
                        STEP 2 — Personal Info
                    ════════════════════════════════════════════════════════════ */}
                    <TabsContent value="personal-info">
                        <FieldGroup className="space-y-2">

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Address</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                            <Field>
                                <FieldLabel>Zip Code {req}</FieldLabel>
                                <Input 
                                    value={formData.zipCode} 
                                    onChange={e => handleChange("zipCode", e.target.value)} 
                                    className={errors.zipCode ? "border-red-500" : ""}
                                />
                                <Err field="zipCode" />
                            </Field>
                            <Field>
                                <FieldLabel>Province / State {req}</FieldLabel>
                                <Input
                                value={formData.province}
                                onChange={e => handleChange("province", e.target.value)}
                                className={errors.province ? "border-red-500" : ""}
                                />
                                <Err field="province" />
                            </Field>
                            <Field>
                                <FieldLabel>City {req}</FieldLabel>
                                <Input
                                value={formData.city}
                                onChange={e => handleChange("city", e.target.value)}
                                className={errors.city ? "border-red-500" : ""}
                                />
                                <Err field="city" />
                            </Field>
                            <Field>
                                <FieldLabel>Home Number</FieldLabel>
                                <Input value={formData.homeNumber} onChange={e => handleChange("homeNumber", e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Street / Brgy. {req}</FieldLabel>
                                <Input
                                value={formData.street}
                                onChange={e => handleChange("street", e.target.value)}
                                className={errors.street ? "border-red-500" : ""}
                                />
                                <Err field="street" />
                            </Field>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Contact & Other Details</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                            <Field>
                                <FieldLabel>Mobile Number {req}</FieldLabel>
                                <Input
                                value={formData.mobileNumber}
                                onChange={e => handleChange("mobileNumber", e.target.value)}
                                className={errors.mobileNumber ? "border-red-500" : ""}
                                />
                                <Err field="mobileNumber" />
                            </Field>
                            <Field>
                                <FieldLabel>Religion {req}</FieldLabel>
                                <Select value={formData.religion} onValueChange={v => handleChange("religion", v)}>
                                <SelectTrigger className={errors.religion ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select religion" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rc">Roman Catholic</SelectItem>
                                    <SelectItem value="inc">Iglesia Ni Cristo</SelectItem>
                                    <SelectItem value="aglipay">Aglipay</SelectItem>
                                    <SelectItem value="up">United Pentecostal</SelectItem>
                                    <SelectItem value="miracle">Miracle Revival</SelectItem>
                                    <SelectItem value="baptist">Baptist</SelectItem>
                                    <SelectItem value="jil">Jesus is Lord</SelectItem>
                                    <SelectItem value="sda">Seventh Day Adventist</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                                </Select>
                                <Err field="religion" />
                            </Field>
                            <Field>
                                <FieldLabel>Country</FieldLabel>
                                <Input value="Philippines" disabled />
                            </Field>
                            <Field>
                                <FieldLabel>Citizenship</FieldLabel>
                                <Input value="Filipino" disabled />
                            </Field>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Button variant="outline" onClick={prevStep}>
                            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                            </Button>
                            <Button onClick={nextStep} className="text-white">
                            Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                        </FieldGroup>
                    </TabsContent>

                    {/* ════════════════════════════════════════════════════════════
                        STEP 3 — Emergency Contact
                    ════════════════════════════════════════════════════════════ */}
                    <TabsContent value="emergency-contact">
                        <FieldGroup className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Emergency Contact Information</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                            <Field>
                                <FieldLabel>Guardian / Contact Name {req}</FieldLabel>
                                <Input
                                value={formData.guardianName}
                                onChange={e => handleChange("guardianName", e.target.value)}
                                className={errors.guardianName ? "border-red-500" : ""}
                                />
                                <Err field="guardianName" />
                            </Field>
                            <Field>
                                <FieldLabel>Mobile Number </FieldLabel>
                                <Input
                                value={formData.emergencyMobile}
                                onChange={e => handleChange("emergencyMobile", e.target.value)}
                                />
                            </Field>
                            
                            <Field>
                                <FieldLabel>Email Address</FieldLabel>
                                <Input
                                type="email"
                                value={formData.emergencyEmail}
                                onChange={e => handleChange("emergencyEmail", e.target.value)}
                                />
                                
                            </Field>
                            <Field className="md:col-span-2">
                                <FieldLabel>Address {req}</FieldLabel>
                                <Input
                                value={formData.emergencyAddress}
                                onChange={e => handleChange("emergencyAddress", e.target.value)}
                                className={errors.emergencyAddress ? "border-red-500" : ""}
                                />
                                <Err field="emergencyAddress" />
                            </Field>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Button variant="outline" onClick={prevStep}>
                            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                            </Button>
                            <Button onClick={nextStep} className="text-white">
                            Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                        </FieldGroup>
                    </TabsContent>

                    {/* ════════════════════════════════════════════════════════════
                        STEP 4 — Academic Info
                    ════════════════════════════════════════════════════════════ */}
                    <TabsContent value="academic-info">
                        <FieldGroup className="space-y-2">

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Primary Education</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                            <Field>
                                <FieldLabel>Name of the School {req}</FieldLabel>
                                <Input
                                value={formData.primarySchool}
                                onChange={e => handleChange("primarySchool", e.target.value)}
                                className={errors.primarySchool ? "border-red-500" : ""}
                                />
                                <Err field="primarySchool" />
                            </Field>
                            <Field>
                                <FieldLabel>Year Graduated {req}</FieldLabel>
                                <Input
                                value={formData.primaryYearGrad}
                                onChange={e => handleChange("primaryYearGrad", e.target.value)}
                                className={errors.primaryYearGrad ? "border-red-500" : ""}
                                />
                                <Err field="primaryYearGrad" />
                            </Field>
                            <Field>
                                <FieldLabel>LRN {req}</FieldLabel>
                                <Input 
                                    value={formData.lrn} 
                                    onChange={e => handleChange("lrn", e.target.value)} 
                                    className={errors.lrn ? "border-red-500" : ""}/>
                                <Err field="lrn" />
                            </Field>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Secondary Education</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                            <Field>
                                <FieldLabel>Name of the School {req}</FieldLabel>
                                <Input
                                value={formData.secondarySchool}
                                onChange={e => handleChange("secondarySchool", e.target.value)}
                                className={errors.secondarySchool ? "border-red-500" : ""}
                                />
                                <Err field="secondarySchool" />
                            </Field>
                            <Field>
                                <FieldLabel>Year Graduated {req}</FieldLabel>
                                <Input
                                value={formData.secondaryYearGrad}
                                onChange={e => handleChange("secondaryYearGrad", e.target.value)}
                                className={errors.secondaryYearGrad ? "border-red-500" : ""}
                                />
                                <Err field="secondaryYearGrad" />
                            </Field>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Senior High School</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                            <Field>
                                <FieldLabel>Name of the School {req}</FieldLabel>
                                <Input
                                value={formData.shsSchool}
                                onChange={e => handleChange("shsSchool", e.target.value)}
                                className={errors.shsSchool ? "border-red-500" : ""}
                                />
                                <Err field="shsSchool" />
                            </Field>
                            <Field>
                                <FieldLabel>Year Graduated {req}</FieldLabel>
                                <Input
                                value={formData.shsYearGrad}
                                onChange={e => handleChange("shsYearGrad", e.target.value)}
                                className={errors.shsYearGrad ? "border-red-500" : ""}
                                />
                                <Err field="shsYearGrad" />
                            </Field>
                            <Field>
                                <FieldLabel>Strand & Track {req}</FieldLabel>
                                <Select value={formData.shsStrand} onValueChange={v => handleChange("shsStrand", v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Strand & Track" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="na">N/A</SelectItem>
                                    <SelectItem value="abm">Accountancy, Business and Management (ABM)</SelectItem>
                                    <SelectItem value="stem">Science, Technology, Engineering, and Mathematics (STEM)</SelectItem>
                                    <SelectItem value="humss">Humanities and Social Science (HUMSS)</SelectItem>
                                    <SelectItem value="gas">General Academic Strand (GAS)</SelectItem>
                                    <SelectItem value="arts">Arts and Design</SelectItem>
                                    <SelectItem value="sports">Sports</SelectItem>
                                    <SelectItem value="tvl">Technical-Vocational-Livelihood (TVL)</SelectItem>
                                    <SelectItem value="afa">Agricultural-Fishery Arts (AFA)</SelectItem>
                                    <SelectItem value="he">Home Economics (HE)</SelectItem>
                                    <SelectItem value="ia">Industrial Arts (IA)</SelectItem>
                                    <SelectItem value="ict">Information and Communications Technology (ICT)</SelectItem>
                                </SelectContent>
                                </Select>
                                <Err field="shsStrand" />
                            </Field>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Button variant="outline" onClick={prevStep}>
                            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                            </Button>
                            <Button onClick={nextStep} className="text-white">
                            Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                        </FieldGroup>
                    </TabsContent>

                    {/* ════════════════════════════════════════════════════════════
                        STEP 5 — Family Info
                    ════════════════════════════════════════════════════════════ */}
                    <TabsContent value="family-info">
                        <FieldGroup className="space-y-2">

                        {/* Father */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Father's Information</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                            <Field>
                                <FieldLabel>Fullname {req}</FieldLabel>
                                <Input
                                value={formData.fatherName}
                                onChange={e => handleChange("fatherName", e.target.value)}
                                className={errors.fatherName ? "border-red-500" : ""}
                                />
                                <Err field="fatherName" />
                            </Field>
                            <Field>
                                <FieldLabel>Occupation</FieldLabel>
                                <Input value={formData.fatherOccupation} onChange={e => handleChange("fatherOccupation", e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Mobile Number</FieldLabel>
                                <Input value={formData.fatherMobile} onChange={e => handleChange("fatherMobile", e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Phone Number</FieldLabel>
                                <Input value={formData.fatherPhone} onChange={e => handleChange("fatherPhone", e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Address</FieldLabel>
                                <Input value={formData.fatherAddress} onChange={e => handleChange("fatherAddress", e.target.value)} />
                            </Field>
                            </div>
                        </div>

                        {/* Mother */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Mother's Information</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                            <Field>
                                <FieldLabel>Fullname {req}</FieldLabel>
                                <Input
                                value={formData.motherName}
                                onChange={e => handleChange("motherName", e.target.value)}
                                className={errors.motherName ? "border-red-500" : ""}
                                />
                                <Err field="motherName" />
                            </Field>
                            <Field>
                                <FieldLabel>Occupation</FieldLabel>
                                <Input value={formData.motherOccupation} onChange={e => handleChange("motherOccupation", e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Mobile Number</FieldLabel>
                                <Input value={formData.motherMobile} onChange={e => handleChange("motherMobile", e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Phone Number</FieldLabel>
                                <Input value={formData.motherPhone} onChange={e => handleChange("motherPhone", e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Address</FieldLabel>
                                <Input value={formData.motherAddress} onChange={e => handleChange("motherAddress", e.target.value)} />
                            </Field>
                            </div>
                        </div>

                        {/* Spouse — conditional on civilStatus from step 1 */}
                        {/* FIX: was reading from separate `civilStatus` state; now reads from formData */}
                        {/* FIX: heading was using text-muted-foreground instead of text-primary */}
                        {formData.civilStatus === "married" && (
                            <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Spouse Information</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Field>
                                <FieldLabel>Spouse</FieldLabel>
                                <Input value={formData.spouseName} onChange={e => handleChange("spouseName", e.target.value)} />
                                </Field>
                                <Field>
                                <FieldLabel>Occupation</FieldLabel>
                                <Input value={formData.spouseOccupation} onChange={e => handleChange("spouseOccupation", e.target.value)} />
                                </Field>
                                <Field>
                                <FieldLabel>Mobile Number</FieldLabel>
                                <Input value={formData.spouseMobile} onChange={e => handleChange("spouseMobile", e.target.value)} />
                                </Field>
                                <Field>
                                <FieldLabel>Phone Number</FieldLabel>
                                <Input value={formData.spousePhone} onChange={e => handleChange("spousePhone", e.target.value)} />
                                </Field>
                            </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <Button variant="outline" onClick={prevStep}>
                            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                            </Button>
                            <Button onClick={nextStep} className="text-white">
                            Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                        </FieldGroup>
                    </TabsContent>

                    {/* ════════════════════════════════════════════════════════════
                        STEP 6 — File Upload
                    ════════════════════════════════════════════════════════════ */}
                    <TabsContent value="file-upload">
                        <FieldGroup className="space-y-6">
                        <div>
                            {/* <h2 className="text-lg font-semibold text-primary">ID Photo</h2>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Upload your ID Photo.
                                </p> */}
                            <div className="md:col-span-2 rounded-xl border border-[var(--primary)] p-4 flex gap-3 text-sm">
                            <span className="mt-0.5 text-[var(--primary)]">
                                <CircleAlert />
                            </span>
                            <div>
                                <p className="font-semibold text-[var(--primary)] mb-1">Notice</p>
                                <p className="text-[var(--primary)] leading-relaxed">
                                    Upload your scanned / soft copy of your ID Photo in JPG, or PNG format. File should not exceed 10MB in size.
                                </p>    
                            </div>
                        </div>
                        </div>
                        
                        <div className="border-2 border-dashed border-primary/30 rounded-2xl p-10 text-center bg-primary/5">
                            <div className="flex flex-col items-center gap-3">
                            <div className="bg-primary/10 p-4 rounded-full">
                                <Upload className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Upload your ID Photo</p>
                                <p className="text-sm text-muted-foreground">JPG, PNG up to 10MB</p>
                            </div>
                            <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="max-w-sm"
                                onChange={e => setUploadedFile(e.target.files?.[0] ?? null)}
                            />
                            {uploadedFile && (
                                <p className="text-sm text-primary font-medium">
                                ✓ {uploadedFile.name}
                                </p>
                            )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Button variant="outline" onClick={prevStep}>
                            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                            </Button>
                            <Button onClick={handleSubmit} className="text-white">
                                <Check />Submit Registration
                            </Button>
                        </div>
                        </FieldGroup>
                    </TabsContent>

                    </Tabs>
                </CardContent>
                </Card>

            </div>
        </main>
</div>
  )
}


