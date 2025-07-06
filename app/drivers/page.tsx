import { columns, Driver } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Driver[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/drivers`);
  if (!res.ok) {
    throw new Error("Failed to fetch drivers");
  }
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}