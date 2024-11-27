"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Link",
    cell: ({ row }) => (
      <Link
        href={`/protected-route/project/${row.getValue("id")}`}
        className="capitalize"
      >
        View
      </Link>
    ),
  },
  {
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "serial_number",
    header: "Serial No#",
    cell: ({ row }) => (
      <div className="capitalize text-orange-500">
        {row.getValue("serial_number")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("budget")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "phase",
    header: "Phase",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phase")}</div>
    ),
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("deadline")}</div>
    ),
  },
  {
    accessorKey: "approved",
    header: "Approved",
    cell: ({ row }) => (
      <div
        className={`capitalize ${
          row.getValue("approved") ? "text-green-500" : "text-red-500"
        }`}
      >
        {row.getValue("approved") ? "Yes" : "No"}
      </div>
    ),
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => (
      <div
        className={`capitalize ${
          row.getValue("active") ? "text-green-500" : "text-red-500"
        }`}
      >
        {row.getValue("active") ? "Yes" : "No"}
      </div>
    ),
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => (
      <div className={`capitalize `}>{row.getValue("start_date")}</div>
    ),
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("end_date")}</div>
    ),
  },
];
