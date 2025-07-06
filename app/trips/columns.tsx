"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Trip = {
  _id: string
  name: string
  description: string
  driverId: string
  startLocation: string
  endLocation: string
  tripStatus: string
}

export const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "driverId",
    header: "Driver ID",
  },
  {
    accessorKey: "startLocation",
    header: "Start Location",
  },
  {
    accessorKey: "endLocation",
    header: "End Location",
  },
  {
    accessorKey: "tripStatus",
    header: "Trip Status",
  },
]