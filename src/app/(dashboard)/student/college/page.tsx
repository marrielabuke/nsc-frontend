"use client"

import { useEffect, useState } from "react"
import { GraduationCap, CalendarClock } from "lucide-react"

import DashboardHeader from "@/components/dashboard/dashboard-header"
import EnrolledSubjectsCard from "@/components/dashboard/enrolled-subjects-card"
import AssessmentOfFeesCard from "@/components/dashboard/assessment-of-fees-card"
import type { RegistrationRecord } from "@/types/student/enrollment"



const CollegeStudentDashboard = () => {
  const [record, setRecord] = useState<RegistrationRecord | null>(null)
  const [studentName, setStudentName] = useState("Student")

  useEffect(() => {
    setRecord(null)
    setStudentName("Student")
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-136px)] flex-col gap-6">
      <DashboardHeader
        role={studentName}
        subtitle="Ready to make today productive!"
      />

      {record ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Course / Section</p>
                <p className="font-semibold">{record.courseSection}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <CalendarClock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">School Year</p>
                <p className="font-semibold">
                  {record.schoolYear} · {record.semester}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <div>
                <p className="text-xs text-muted-foreground">Year Level</p>
                <p className="font-semibold">{record.yearLevel}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <EnrolledSubjectsCard subjects={record.subjects} />
            </div>
            <AssessmentOfFeesCard assessment={record.assessment} />
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