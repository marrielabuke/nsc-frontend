"use client"

import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Plus, X } from "lucide-react"

import { Button }   from "@/components/ui/button"
import { Input }    from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { AddSubjectForm } from "@/components/forms/registrar/college/subject/add-subject-form"
import { Subject }        from "@/types/registrar/college/subject"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data:    TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting,          setSorting]          = React.useState<SortingState>([])
  const [columnFilters,    setColumnFilters]    = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const [addOpen, setAddOpen] = React.useState(false)

  const tableData = React.useMemo(() => (Array.isArray(data) ? data : []), [data])

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange:          setSorting,
    onColumnFiltersChange:    setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel:          getCoreRowModel(),
    getPaginationRowModel:    getPaginationRowModel(),
    getSortedRowModel:        getSortedRowModel(),
    getFilteredRowModel:      getFilteredRowModel(),
    state: { sorting, columnFilters, columnVisibility },
  })

  const isFiltered = table.getState().columnFilters.length > 0

  function handleAddSubject(subject: Omit<Subject, "id">) {
    // TODO: wire to your API / state management
    console.log("New subject:", subject)
  }

  return (
    <>
      <div className="space-y-4">

        {/* Header + Filters Card */}
        <div className="rounded-xl border bg-background p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Subjects Directory</h2>

            <Button onClick={() => setAddOpen(true)}>
              <Plus className="mr-1.5 size-4" />
              Add Subject
            </Button>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full lg:max-w-sm">
              <Input
                placeholder="Search subject title..."
                value={
                  (table.getColumn("subject_title")?.getFilterValue() as string) ?? ""
                }
                onChange={(e) =>
                  table.getColumn("subject_title")?.setFilterValue(e.target.value)
                }
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              {isFiltered && (
                <Button
                  variant="outline"
                  onClick={() => table.resetColumnFilters()}
                  className="min-w-[110px]"
                >
                  <X className="mr-2 size-4" />
                  Reset
                </Button>
              )}

              {/* Subject Type filter */}
              <Select
                value={
                  (table.getColumn("subject_type")?.getFilterValue() as string) ?? "all"
                }
                onValueChange={(val) =>
                  table.getColumn("subject_type")?.setFilterValue(val === "all" ? "" : val)
                }
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="GE">GE</SelectItem>
                  <SelectItem value="Mandatory">Mandatory</SelectItem>
                  <SelectItem value="Major">Major</SelectItem>
                </SelectContent>
              </Select>

              {/* Latin Honors filter */}
              <Select
                value={
                  (table.getColumn("include_in_latin_honors")?.getFilterValue() as string) ?? "all"
                }
                onValueChange={(val) =>
                  table
                    .getColumn("include_in_latin_honors")
                    ?.setFilterValue(val === "all" ? "" : val === "true")
                }
              >
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Latin Honors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Included</SelectItem>
                  <SelectItem value="false">Not Included</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="rounded-xl border bg-background p-4 shadow-sm">
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No subjects found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Add Subject Modal */}
      <AddSubjectForm
        open={addOpen}
        onOpenChange={setAddOpen}
        onSubmit={handleAddSubject}
      />
    </>
  )
}