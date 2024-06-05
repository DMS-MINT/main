"use client";

import { useState } from "react";
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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import TablePagination from "./TablePagination";
import ViewOptions from "./ViewOptions";
import { useRouter, usePathname } from "next/navigation";
import { LetterTableColumnEnum } from "@/typing";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const router = useRouter();
  const pathname = usePathname();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="flex flex-col justify-between">
      <div>
        <div className="flex items-center  grid-cols-3 gap-4 mb-2">
          <Input
            placeholder="የደብዳቤ ቁጥር"
            value={
              (table
                .getColumn(LetterTableColumnEnum.ID)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(LetterTableColumnEnum.ID)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm py-0 h-9"
          />
          {/* <Input
            placeholder="ለ"
            value={
              (table
                .getColumn(LetterTableColumnEnum.SENDER)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(LetterTableColumnEnum.RECIPIENT)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm py-0 h-9"
          /> */}
          <Input
            placeholder="ጉዳዩ"
            value={
              (table
                .getColumn(LetterTableColumnEnum.SUBJECT)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(LetterTableColumnEnum.SUBJECT)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm py-0 h-9"
          />

          <Input
            placeholder="የተላከበት ቀን"
            value={
              (table
                .getColumn(LetterTableColumnEnum.SENT_AT)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(LetterTableColumnEnum.SENT_AT)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm py-0 h-9"
          />

          <ViewOptions table={table} />
        </div>

        <div className="rounded-md border my-3">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const cellID = "6f872903-cbd8-4d50-b96a-8d67bf5d263f";
                  console.log(row.getVisibleCells());
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => router.push(`${pathname}/${cellID}`)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <TablePagination table={table} />
    </div>
  );
}
