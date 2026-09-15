"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, GraduationCap, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { mockData } from "@/lib/dummy/president-dashboard";

const {
  summary: { total_enrollment, retention, tuition_collection, institutional_gpa },
  strategic_trends: { enrollment_vs_graduation, population_by_department, population_by_department_total },
  operational_health: { budget_vs_actual_expenses, dfw_rates_by_department },
} = mockData;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

// ---------------------------------------------------------------------------
// Chart configs (color tokens map to globals.css chart variables)
// ---------------------------------------------------------------------------

const enrollmentSparklineConfig = {
  total_enrollment: {
    label: "Total Enrollment",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const retentionConfig = {
  value: {
    label: "Retention",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const enrollmentGraduationConfig = {
  enrolled: {
    label: "Enrolled",
    color: "var(--chart-1)",
  },
  graduated: {
    label: "Graduated",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const departmentPopulationConfig = population_by_department.reduce((config, dept, index) => {
  config[dept.department] = {
    label: dept.department,
    color: `var(--chart-${(index % 5) + 1})`,
  };
  return config;
}, {} as ChartConfig);

const budgetConfig = {
  allocated_budget: {
    label: "Allocated Budget",
    color: "var(--chart-3)",
  },
  actual_spend: {
    label: "Actual Spend",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const dfwConfig = {
  drop_rate: {
    label: "Drop",
    color: "var(--chart-4)",
  },
  fail_rate: {
    label: "Fail",
    color: "var(--danger)",
  },
  withdraw_rate: {
    label: "Withdraw",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function PresidentDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Executive Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Institutional health, academic outcomes, and operational status at a glance.
        </p>
      </div>

      {/* ROW 1: At-a-Glance Summary ----------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* 1. Total Enrollment */}
        <Card className="p-6">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 p-0 pb-2">
            <div>
              <CardDescription>Total Enrollment</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">
                {total_enrollment.current_total.toLocaleString()}
              </CardTitle>
            </div>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="mb-2 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />
              {total_enrollment.percent_change.toFixed(1)}% vs last year
            </div>
            <ChartContainer config={enrollmentSparklineConfig} className="h-[48px] w-full">
              <LineChart data={total_enrollment.trend} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                <Line
                  type="monotone"
                  dataKey="total_enrollment"
                  stroke="var(--color-total_enrollment)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 2. Overall Retention Rate */}
        <Card className="p-6">
          <CardContent className="flex items-center justify-between p-0">
            <div>
              <CardDescription>Overall Retention Rate</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">
                {retention.retention_rate}%
              </CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                vs {retention.previous_semester_rate}% last semester
              </p>
            </div>
            <ChartContainer config={retentionConfig} className="h-[72px] w-[72px]">
              <RadialBarChart
                data={retention.radial_data}
                innerRadius={24}
                outerRadius={36}
                startAngle={90}
                endAngle={90 - (retention.retention_rate / 100) * 360}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar dataKey="value" cornerRadius={6} fill="var(--color-value)" background={{ fill: "var(--muted)" }} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 3. Tuition Collection Target */}
        <Card className="p-6">
          <CardHeader className="p-0 pb-2">
            <CardDescription>Tuition Collection Target</CardDescription>
            <CardTitle className="text-3xl font-semibold tabular-nums">
              {formatCompactNumber(tuition_collection.collected_amount)}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Progress value={tuition_collection.percent_collected} className="h-2" />
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{tuition_collection.percent_collected}% collected</span>
              <span>Target {formatCompactNumber(tuition_collection.target_amount)}</span>
            </div>
          </CardContent>
        </Card>

        {/* 4. Institutional GPA */}
        <Card className="p-6">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 p-0 pb-2">
            <div>
              <CardDescription>Institutional GPA</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">
                {institutional_gpa.current_gpa.toFixed(2)}
              </CardTitle>
            </div>
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div
              className={`flex w-fit items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                institutional_gpa.trend_direction === "up"
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                  : "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
              }`}
            >
              {institutional_gpa.trend_direction === "up" ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {Math.abs(institutional_gpa.change).toFixed(2)} pts vs last semester
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROW 2: Strategic Trends ----------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* 1. Multi-Year Enrollment vs. Graduation */}
        <Card className="p-6 md:col-span-2">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              Enrollment vs. Graduation
            </CardTitle>
            <CardDescription>10-year institutional trend</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer config={enrollmentGraduationConfig} className="h-[280px] w-full">
              <AreaChart data={enrollment_vs_graduation} margin={{ left: -16, right: 12, top: 8 }}>
                <defs>
                  <linearGradient id="fillEnrolled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-enrolled)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-enrolled)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="fillGraduated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-graduated)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-graduated)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} width={40} />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                  type="monotone"
                  dataKey="enrolled"
                  stroke="var(--color-enrolled)"
                  fill="url(#fillEnrolled)"
                  strokeWidth={2}
                  stackId="a"
                />
                <Area
                  type="monotone"
                  dataKey="graduated"
                  stroke="var(--color-graduated)"
                  fill="url(#fillGraduated)"
                  strokeWidth={2}
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 2. Population by Department */}
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-medium">Population by Department</CardTitle>
            <CardDescription>Current enrollment distribution</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer config={departmentPopulationConfig} className="mx-auto aspect-square h-[220px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={population_by_department}
                  dataKey="student_count"
                  nameKey="department"
                  innerRadius={62}
                  outerRadius={88}
                  strokeWidth={2}
                >
                  {population_by_department.map((entry) => (
                    <Cell
                      key={entry.department}
                      style={{ fill: entry.fill }}
                    />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (!viewBox || !("cx" in viewBox)) return null;
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-semibold">
                            {population_by_department_total.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 20} className="fill-muted-foreground text-xs">
                            Students
                          </tspan>
                        </text>
                      );
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* ROW 3: Operational & Academic Health ----------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 1. Budget vs. Actual Expenses */}
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-medium">Budget vs. Actual Expenses</CardTitle>
            <CardDescription>Per-department allocation, current fiscal year</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={budgetConfig}
              className="h-[320px] w-full"
            >
              <BarChart
                data={budget_vs_actual_expenses}
                layout="vertical"
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatCompactNumber(value as number)}
                  fontSize={12}
                />
                <YAxis
                  type="category"
                  dataKey="department"
                  tickLine={false}
                  axisLine={false}
                  width={140}
                  fontSize={11}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => [
                        formatCurrency(value as number),
                        budgetConfig[name as keyof typeof budgetConfig]?.label ?? name,
                      ]}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="allocated_budget" fill="var(--color-allocated_budget)" radius={3} />
                <Bar dataKey="actual_spend" fill="var(--color-actual_spend)" radius={3} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 2. Academic Risk / DFW Rates */}
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-medium">Academic Risk (DFW Rates)</CardTitle>
            <CardDescription>Drop, Fail, Withdraw rates by department</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer config={dfwConfig} className="h-[320px] w-full">
              <BarChart data={dfw_rates_by_department} margin={{ left: -16, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="department"
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                  fontSize={12}
                  width={40}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="drop_rate" stackId="dfw" fill="var(--color-drop_rate)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="fail_rate" stackId="dfw" fill="var(--color-fail_rate)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="withdraw_rate" stackId="dfw" fill="var(--color-withdraw_rate)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PresidentDashboard;