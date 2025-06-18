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
      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-lg">Subscribers</div>
          </div>
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Date Subscribed</th>
                <th className="py-3 px-4 font-semibold text-center"> </th>
              </tr>
            </thead>
            <tbody>
              {subs.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    <div className="flex flex-col items-center justify-center py-16">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm-4 4v4m0 0H8m4 0h4" />
                      </svg>
                      <div className="text-lg text-gray-500 mb-2">No subscribers yet.</div>
                      <div className="text-sm text-gray-400 mb-6">Subscribers will appear here as they join your newsletter.</div>
                    </div>
                  </td>
                </tr>
              )}
              {subs.map(s => (
                <tr key={s.id} className="bg-white border-b">
                  <td className="py-3 px-4 align-middle font-semibold text-brand-primary">{s.email}</td>
                  <td className="py-3 px-4 align-middle">{s.date}</td>
                  <td className="py-3 px-4 align-middle text-center">
                    <button className="inline-flex items-center justify-center bg-brand-error hover:bg-brand-error-dark text-text-inverse rounded p-2" onClick={() => handleDelete(s.id)} aria-label="Delete"><Trash2 className="h-5 w-5" /></button>
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