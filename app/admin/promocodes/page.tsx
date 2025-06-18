"use client"

import { useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import { Plus, Pencil, Trash2 } from "lucide-react"

const mockPromos = [
  { id: "1", code: "WELCOME10", discount: 10, type: "percent", minOrder: 50, expiry: "2024-12-31", status: "active" },
]

export default function AdminPromocodes() {
  const [promos, setPromos] = useState(mockPromos)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [form, setForm] = useState({
    code: "",
    discount: 0,
    type: "percent",
    minOrder: 0,
    expiry: "",
    status: "active",
  })

  const openAdd = () => {
    setEditing(null)
    setForm({ code: "", discount: 0, type: "percent", minOrder: 0, expiry: "", status: "active" })
    setShowModal(true)
  }
  const openEdit = (p: any) => {
    setEditing(p)
    setForm(p)
    setShowModal(true)
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (editing) {
      setPromos(promos.map(p => p.id === editing.id ? { ...form, id: editing.id } : p))
    } else {
      setPromos([{ ...form, id: Date.now().toString() }, ...promos])
    }
    setShowModal(false)
  }
  const handleDelete = (id: string) => setPromos(promos.filter(p => p.id !== id))

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-lg">Promocodes</div>
            <button
              className="bg-surface-primary hover:bg-brand-primary hover:text-text-inverse text-text-primary rounded p-2 transition-colors"
              onClick={openAdd}
              aria-label="Add Promocode"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 font-semibold">Code</th>
                <th className="py-3 px-4 font-semibold">Discount</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Min Order</th>
                <th className="py-3 px-4 font-semibold">Expiry</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-center"> </th>
              </tr>
            </thead>
            <tbody>
              {promos.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-16">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7a1 1 0 011-1h8a1 1 0 011 1v8a1 1 0 01-1 1H8a1 1 0 01-1-1V7zm0 0l10 10" />
                      </svg>
                      <div className="text-lg text-gray-500 mb-2">No promocodes yet.</div>
                      <div className="text-sm text-gray-400 mb-6">Click the + button or the button below to add your first promocode.</div>
                      <button
                        className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                        onClick={openAdd}
                      >
                        Add Promocode
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              {promos.map(p => (
                <tr key={p.id} className="bg-white border-b">
                  <td className="py-3 px-4 align-middle">{p.code}</td>
                  <td className="py-3 px-4 align-middle">{p.discount}{p.type === "percent" ? "%" : "$"}</td>
                  <td className="py-3 px-4 align-middle">{p.type.charAt(0).toUpperCase() + p.type.slice(1)}</td>
                  <td className="py-3 px-4 align-middle">${p.minOrder}</td>
                  <td className="py-3 px-4 align-middle">{p.expiry}</td>
                  <td className="py-3 px-4 align-middle">{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</td>
                  <td className="py-3 px-4 align-middle text-center">
                    <button
                      className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primary-dark text-text-inverse rounded p-2 mr-2"
                      onClick={() => openEdit(p)}
                      aria-label="Edit"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      className="inline-flex items-center justify-center bg-brand-error hover:bg-brand-error-dark text-text-inverse rounded p-2"
                      onClick={() => handleDelete(p.id)}
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
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-8 relative">
              <div className="text-xl font-semibold mb-4">{editing ? "Edit" : "Add"} Promocode</div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Code" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" type="number" placeholder="Discount" value={form.discount} onChange={e => setForm({ ...form, discount: +e.target.value })} required />
                <select className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="percent">Percent</option>
                  <option value="flat">Flat</option>
                </select>
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" type="number" placeholder="Min Order" value={form.minOrder} onChange={e => setForm({ ...form, minOrder: +e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" type="date" placeholder="Expiry" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} required />
                <select className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors">Save</button>
                  <button type="button" className="bg-surface-tertiary hover:bg-surface-tertiary-dark text-text-primary font-semibold py-2 px-6 rounded-lg transition-colors" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl" onClick={() => setShowModal(false)} aria-label="Close">&times;</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
} 