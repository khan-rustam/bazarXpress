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
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-codGray">Promocodes</h1>
          <button className="bg-spectra hover:bg-elm text-white px-4 py-2 rounded-lg flex items-center space-x-2" onClick={openAdd}>
            <Plus className="h-4 w-4" /> <span>Add Promocode</span>
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
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
                <tr><td colSpan={7} className="text-center text-gray-400 py-8">No promocodes yet.</td></tr>
              )}
              {promos.map(p => (
                <tr key={p.id} className="bg-white border-b">
                  <td className="py-3 px-4 align-top">{p.code}</td>
                  <td className="py-3 px-4 align-top">{p.discount}{p.type === "percent" ? "%" : "$"}</td>
                  <td className="py-3 px-4 align-top">{p.type}</td>
                  <td className="py-3 px-4 align-top">${p.minOrder}</td>
                  <td className="py-3 px-4 align-top">{p.expiry}</td>
                  <td className="py-3 px-4 align-top">{p.status}</td>
                  <td className="py-3 px-4 align-top text-center">
                    <button className="inline-flex items-center justify-center bg-elm hover:bg-spectra text-white rounded p-2 mr-2" onClick={() => openEdit(p)}><Pencil className="h-5 w-5" /></button>
                    <button className="inline-flex items-center justify-center bg-mountbattenPink hover:bg-red-500 text-white rounded p-2" onClick={() => handleDelete(p.id)}><Trash2 className="h-5 w-5" /></button>
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
                <input className="w-full border border-gray-300 rounded-lg p-3" placeholder="Code" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3" type="number" placeholder="Discount" value={form.discount} onChange={e => setForm({ ...form, discount: +e.target.value })} required />
                <select className="w-full border border-gray-300 rounded-lg p-3" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="percent">Percent</option>
                  <option value="flat">Flat</option>
                </select>
                <input className="w-full border border-gray-300 rounded-lg p-3" type="number" placeholder="Min Order" value={form.minOrder} onChange={e => setForm({ ...form, minOrder: +e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3" type="date" placeholder="Expiry" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} required />
                <select className="w-full border border-gray-300 rounded-lg p-3" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="bg-spectra hover:bg-elm text-white font-semibold py-2 px-6 rounded-lg transition-colors">Save</button>
                  <button type="button" className="bg-gray-200 hover:bg-gray-300 text-codGray font-semibold py-2 px-6 rounded-lg transition-colors" onClick={() => setShowModal(false)}>Cancel</button>
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