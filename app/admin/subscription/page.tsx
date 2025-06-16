"use client"

import { useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import { Trash2 } from "lucide-react"

const mockSubs = [
  { id: "1", email: "user@example.com", date: "2024-05-01" },
]

export default function AdminSubscription() {
  const [subs, setSubs] = useState(mockSubs)
  const handleDelete = (id: string) => setSubs(subs.filter(s => s.id !== id))

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-codGray mb-6">Subscribers</h1>
        <div className="bg-gradient-to-r from-lime-100 to-elm/10 rounded-xl shadow-lg p-8">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-lime-50">
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Date Subscribed</th>
                <th className="py-3 px-4 font-semibold text-center"> </th>
              </tr>
            </thead>
            <tbody>
              {subs.length === 0 && (
                <tr><td colSpan={3} className="text-center text-gray-400 py-8">No subscribers yet.</td></tr>
              )}
              {subs.map(s => (
                <tr key={s.id} className="bg-white border-b">
                  <td className="py-3 px-4 align-top font-semibold text-spectra">{s.email}</td>
                  <td className="py-3 px-4 align-top">{s.date}</td>
                  <td className="py-3 px-4 align-top text-center">
                    <button className="inline-flex items-center justify-center bg-mountbattenPink hover:bg-red-500 text-white rounded p-2" onClick={() => handleDelete(s.id)}><Trash2 className="h-5 w-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
} 