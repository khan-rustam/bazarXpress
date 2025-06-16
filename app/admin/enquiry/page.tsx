"use client"

import { useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import { Eye, Trash2, CheckCircle2 } from "lucide-react"

const mockEnquiries = [
  { id: "1", name: "John Doe", email: "john@example.com", subject: "Order Issue", message: "I have an issue with my order.", date: "2024-05-01", read: false },
]

export default function AdminEnquiry() {
  const [enquiries, setEnquiries] = useState(mockEnquiries)
  const [viewing, setViewing] = useState<any | null>(null)
  const handleDelete = (id: string) => setEnquiries(enquiries.filter(e => e.id !== id))
  const markAsRead = (id: string) => setEnquiries(enquiries.map(e => e.id === id ? { ...e, read: true } : e))

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-codGray mb-6">Enquiries</h1>
        <div className="bg-gradient-to-r from-mountbattenPink/10 to-elm/10 rounded-xl shadow-lg p-8">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-mountbattenPink/10">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Subject</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-center"> </th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-400 py-8">No enquiries yet.</td></tr>
              )}
              {enquiries.map(e => (
                <tr key={e.id} className="bg-white border-b">
                  <td className="py-3 px-4 align-top font-semibold text-spectra">{e.name}</td>
                  <td className="py-3 px-4 align-top">{e.email}</td>
                  <td className="py-3 px-4 align-top">{e.subject}</td>
                  <td className="py-3 px-4 align-top">{e.date}</td>
                  <td className="py-3 px-4 align-top">{e.read ? <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" />Read</span> : <span className="text-yellow-600">Unread</span>}</td>
                  <td className="py-3 px-4 align-top text-center flex gap-2 justify-center">
                    <button className="inline-flex items-center justify-center bg-elm hover:bg-spectra text-white rounded p-2" onClick={() => setViewing(e)}><Eye className="h-5 w-5" /></button>
                    <button className="inline-flex items-center justify-center bg-mountbattenPink hover:bg-red-500 text-white rounded p-2" onClick={() => handleDelete(e.id)}><Trash2 className="h-5 w-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* View Modal */}
        {viewing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 relative border-4 border-mountbattenPink">
              <div className="text-2xl font-bold mb-4 text-spectra">Enquiry Details</div>
              <div className="mb-2"><span className="font-semibold">Name:</span> {viewing.name}</div>
              <div className="mb-2"><span className="font-semibold">Email:</span> {viewing.email}</div>
              <div className="mb-2"><span className="font-semibold">Subject:</span> {viewing.subject}</div>
              <div className="mb-2"><span className="font-semibold">Date:</span> {viewing.date}</div>
              <div className="mb-4"><span className="font-semibold">Message:</span><div className="bg-gray-50 rounded p-3 mt-1 text-codGray whitespace-pre-line">{viewing.message}</div></div>
              <div className="flex gap-2 mt-4">
                {!viewing.read && <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors" onClick={() => { markAsRead(viewing.id); setViewing(null) }}>Mark as Read</button>}
                <button className="bg-gray-200 hover:bg-gray-300 text-codGray font-semibold py-2 px-6 rounded-lg transition-colors" onClick={() => setViewing(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
} 