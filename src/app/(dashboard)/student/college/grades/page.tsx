"use client"

import { useState } from "react"

import TranscriptSummaryCard from "@/components/dashboard/transcript-summary-card"
import SemesterGradesTable from "@/components/dashboard/semester-grades-table"
import type { Transcript } from "@/types/student/grades"

const TranscriptPage = () => {
  const [transcript, setTranscript] = useState<Transcript | null>(null)

  return (
    <div className="flex min-h-[calc(100vh-136px)] flex-col gap-6">
    
      {transcript ? (
        <>
          <TranscriptSummaryCard transcript={transcript} />

          <div className="flex flex-col gap-4">
            {transcript.semesters.map((semester) => (
              <SemesterGradesTable
                key={`${semester.schoolYear}-${semester.semester}`}
                semester={semester}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border bg-card p-6 text-center text-muted-foreground">
          No grade record found for this account yet.
        </div>
      )}
    </div>
  )
}

export default TranscriptPage