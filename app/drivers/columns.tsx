"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Driver = {
  _id: string
  fullName: string
  phoneNumber: string
  vendor: string
}

export const columns: ColumnDef<Driver>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
  },
]