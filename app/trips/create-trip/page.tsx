"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  _id: "",
  name: "",
  description: "",
  driverId: "",
  startLocation: "",
  endLocation: "",
  tripStatus: "",
  __v: 0,
  amount: 0,
  status: "pending",
  email: "",
};

export default function CreateTripPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "__v" || name === "amount" ? Number(value) : value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create trip");
      setSuccess("Trip created successfully!");
      setForm(initialState);
      setTimeout(() => router.push("/trips"), 1000);
    } catch (err: any) {
      setError(err.message || "Error creating trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-12" style={{ minWidth: "100vh" }}>
      <div className="bg-white rounded-xl shadow p-12">
        <h2 className="text-xl font-semibold mb-1">Trip</h2>
        <div className="text-gray-500 mb-12">Trip Details</div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
            <input id="description" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="driverId">Driver ID</label>
            <input id="driverId" name="driverId" value={form.driverId} onChange={handleChange} placeholder="Driver ID" className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="startLocation">Start Location (lat, lng)</label>
            <input id="startLocation" name="startLocation" value={form.startLocation} onChange={handleChange} placeholder="Start Location (lat, lng)" className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="endLocation">End Location (lat, lng)</label>
            <input id="endLocation" name="endLocation" value={form.endLocation} onChange={handleChange} placeholder="End Location (lat, lng)" className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 rounded font-semibold text-lg hover:bg-gray-900 transition" disabled={loading}>
            {loading ? "Creating..." : "Create Trip"}
          </button>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
          {success && <div className="text-green-600 text-center mt-2">{success}</div>}
        </form>
      </div>
    </div>
  );
}
