"use client"

import { useEffect, useState } from "react"
import {
  GraduationCap,
  CalendarClock,
} from "lucide-react"

import DashboardHeader from "@/components/dashboard/dashboard-header"
import EnrolledSubjectsCard from "@/components/dashboard/enrolled-subjects-card"
import AssessmentOfFeesCard from "@/components/dashboard/assessment-of-fees-card"

import { getActiveSession } from "@/lib/auth/session"

import type { StudentUser } from "@/types/student/student"
import type { RegistrationRecord } from "@/types/student/enrollment"

import { useRouter } from "next/navigation"
import { getStudentByUserId } from "@/lib/student/student-service"
import { Spinner } from "@/components/ui/spinner"


const CollegeStudentDashboard = () => {
  const router = useRouter()

  const [student, setStudent] = useState<StudentUser | null>(null)
  const [record, setRecord] = useState<RegistrationRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const session =
    getActiveSession()

  if (!session) {
    router.replace("/login")
    return
  }

  const currentStudent =
    getStudentByUserId(session.id)

  if (!currentStudent) {
    setLoading(false)
    return
  }

  // Student has not finished registration
  // OR is still waiting for registrar approval.
  if (
    currentStudent.registrationStatus !==
    "verified"
  ) {
    router.replace("/setup")
    return
  }

  setStudent(currentStudent)

  // Later this should come from:
  // Student_Enrollment_History
  setRecord(null)

  setLoading(false)
}, [router])



  if (loading) {
    return (
      <Spinner></Spinner>
    )
  }

  if (!student) {
    return (
      <div className="rounded-2xl border bg-card p-6 text-center text-muted-foreground">
        Student account not found.
      </div>
    )
  }


  const studentName = [
    student.firstName,
    student.middleName,
    student.lastName,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className="flex min-h-[calc(100vh-136px)] flex-col gap-6">
      <DashboardHeader
        role={studentName || "Student"}
        subtitle="Ready to make today productive!"
      />

      {record ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Course / Section */}
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <GraduationCap className="h-8 w-8 text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Course / Section
                </p>

                <p className="font-semibold">
                  {record.courseSection}
                </p>
              </div>
            </div>

            {/* School Year */}
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <CalendarClock className="h-8 w-8 text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">
                  School Year
                </p>

                <p className="font-semibold">
                  {record.schoolYear} · {record.semester}
                </p>
              </div>
            </div>

            {/* Year Level */}
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  Year Level
                </p>

                <p className="font-semibold">
                  {record.yearLevel}
                </p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <EnrolledSubjectsCard
                subjects={record.subjects}
              />
            </div>

            <AssessmentOfFeesCard
              assessment={record.assessment}
            />
          </div>
        </>
      ) : (
        <div className="rounded-2xl border bg-card p-6 text-center text-muted-foreground">
          No registration record found for this account yet.
        </div>
      )}
    </div>
  )
}

export default CollegeStudentDashboard