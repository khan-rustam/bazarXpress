"use client"

import { useState, useEffect } from "react"
import AdminLayout from "../../../components/AdminLayout"
import { Pencil, Trash2, Plus } from "lucide-react"

interface Notice {
  id?: number
  message: string // rich text or plain text
  startDate: string // ISO string
  endDate: string // ISO string
  bgColor?: string
  textColor?: string
}

const defaultNotice: Notice = {
  id: undefined,
  message: "",
  startDate: "",
  endDate: "",
  bgColor: "#A16A8A", // mountbattenPink
  textColor: "#fff"
}

export default function AdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [editing, setEditing] = useState<Notice | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("siteNotices")
    if (saved) {
      try {
        setNotices(JSON.parse(saved))
      } catch {
        setNotices([])
      }
    }
  }, [])

  const saveNotices = (arr: Notice[]) => {
    setNotices(arr)
    localStorage.setItem("siteNotices", JSON.stringify(arr))
  }

  const handleEdit = (notice: Notice) => {
    setEditing(notice)
    setShowForm(true)
  }

  const handleDelete = (id: any) => {
    const arr = notices.filter(n => n.id !== id)
    saveNotices(arr)
    setSuccess("Notice deleted.")
    setTimeout(() => setSuccess(""), 1500)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    let arr
    if (editing.id) {
      arr = notices.map(n => n.id === editing.id ? editing : n)
      setSuccess("Notice updated!")
    } else {
      const newNotice = { ...editing, id: Date.now() }
      arr = [...notices, newNotice]
      setSuccess("Notice created!")
    }
    saveNotices(arr)
    setEditing(null)
    setShowForm(false)
    setTimeout(() => setSuccess(""), 1500)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editing) return
    setEditing({ ...editing, [e.target.name]: e.target.value })
  }

  // Date formatting for table
  const formatDate = (iso: string) => {
    if (!iso) return ""
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-lg">Notice</div>
            <button
              className="bg-gray-100 hover:bg-spectra hover:text-white text-codGray rounded p-2 transition-colors"
              onClick={() => { setEditing({ ...defaultNotice }); setShowForm(true) }}
              aria-label="Add Notice"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 font-semibold">Notice</th>
                <th className="py-3 px-4 font-semibold">Start date</th>
                <th className="py-3 px-4 font-semibold">End date</th>
                <th className="py-3 px-4 font-semibold text-center"> </th>
              </tr>
            </thead>
            <tbody>
              {notices.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-8">No notices yet.</td>
                </tr>
              )}
              {notices.map(notice => (
                <tr key={notice.id} className="bg-white border-b">
                  <td className="py-3 px-4 align-top max-w-xl whitespace-pre-line">{notice.message}</td>
                  <td className="py-3 px-4 align-top">{formatDate(notice.startDate)}</td>
                  <td className="py-3 px-4 align-top">{formatDate(notice.endDate)}</td>
                  <td className="py-3 px-4 align-top text-center">
                    <button
                      className="inline-flex items-center justify-center bg-elm hover:bg-spectra text-white rounded p-2 mr-2"
                      onClick={() => handleEdit(notice)}
                      aria-label="Edit"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      className="inline-flex items-center justify-center bg-mountbattenPink hover:bg-red-500 text-white rounded p-2"
                      onClick={() => handleDelete(notice.id)}
                      aria-label="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notice Form Modal */}
        {showForm && editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 p-8 relative">
              <div className="text-xl font-semibold mb-4">{editing.id ? "Edit notice" : "Create notice"}</div>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Your message here...</label>
                  {/* Replace with Froala or other rich text editor if needed */}
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-spectra min-h-[120px]"
                    name="message"
                    placeholder="Type something"
                    value={editing.message}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-spectra"
                      value={editing.startDate}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-spectra"
                      value={editing.endDate}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block font-medium mb-1">Background Color</label>
                    <input
                      type="color"
                      name="bgColor"
                      className="w-12 h-12 p-0 border-0 bg-transparent cursor-pointer"
                      value={editing.bgColor || "#A16A8A"}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-medium mb-1">Text Color</label>
                    <input
                      type="color"
                      name="textColor"
                      className="w-12 h-12 p-0 border-0 bg-transparent cursor-pointer"
                      value={editing.textColor || "#fff"}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    type="submit"
                    className="bg-spectra hover:bg-elm text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-codGray font-semibold py-2 px-6 rounded-lg transition-colors"
                    onClick={() => { setEditing(null); setShowForm(false) }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
                onClick={() => { setEditing(null); setShowForm(false) }}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
          </div>
        )}
        {success && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">{success}</div>}
      </div>
    </AdminLayout>
  )
} 