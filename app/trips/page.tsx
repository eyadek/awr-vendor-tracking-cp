import { columns, Trip } from "./columns"
import { DataTable } from "./data-table"
import Link from "next/link";

async function getData(): Promise<Trip[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trips`);
  if (!res.ok) {
    throw new Error("Failed to fetch trips");
  }
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
        <Link href="/trips/create-trip" className="btn btn-primary">Create New Trip</Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}