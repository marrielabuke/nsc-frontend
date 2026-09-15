"use client"

import { useState } from "react"

import DashboardHeader from "@/components/dashboard/dashboard-header"

import PaymentHistoryTable from "@/components/dashboard/payment-history-table"
import type { StatementOfAccount } from "@/types/student/soa"
import SoaSummaryCard from "@/components/dashboard/soa-summary-card"

const StatementOfAccountPage = () => {
  const [soa, setSoa] = useState<StatementOfAccount | null>(null)

  return (
    <div className="flex min-h-[calc(100vh-136px)] flex-col gap-6">
      <DashboardHeader
        role="Statement of Account"
        subtitle="Your tuition assessment and payment history."
      />

      {soa ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <SoaSummaryCard soa={soa} />
          <div className="xl:col-span-2">
            <PaymentHistoryTable payments={soa.payments} />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border bg-card p-6 text-center text-muted-foreground">
          No statement of account found for this account yet.
        </div>
      )}
    </div>
  )
}

export default StatementOfAccountPage