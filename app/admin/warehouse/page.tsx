"use client"

import { useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import { Plus, Pencil, Trash2 } from "lucide-react"

const mockWarehouses = [
  {
    id: "1",
    name: "Main Warehouse",
    pin: "123456",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    country: "USA",
    contact: "123-456-7890",
  },
]

export default function AdminWarehouse() {
  const [warehouses, setWarehouses] = useState(mockWarehouses)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [form, setForm] = useState({
    name: "",
    pin: "",
    address: "",
    city: "",
    state: "",
    country: "",
    contact: "",
  })

  const openAdd = () => {
    setEditing(null)
    setForm({ name: "", pin: "", address: "", city: "", state: "", country: "", contact: "" })
    setShowModal(true)
  }
  const openEdit = (w: any) => {
    setEditing(w)
    setForm(w)
    setShowModal(true)
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (editing) {
      setWarehouses(warehouses.map(w => w.id === editing.id ? { ...form, id: editing.id } : w))
    } else {
      setWarehouses([{ ...form, id: Date.now().toString() }, ...warehouses])
    }
    setShowModal(false)
  }
  const handleDelete = (id: string) => setWarehouses(warehouses.filter(w => w.id !== id))

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-lg">Warehouses</div>
            <button
              className="bg-surface-primary hover:bg-brand-primary hover:text-text-inverse text-text-primary rounded p-2 transition-colors"
              onClick={openAdd}
              aria-label="Add Warehouse"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Pin</th>
                <th className="py-3 px-4 font-semibold">Address</th>
                <th className="py-3 px-4 font-semibold">City</th>
                <th className="py-3 px-4 font-semibold">State</th>
                <th className="py-3 px-4 font-semibold">Country</th>
                <th className="py-3 px-4 font-semibold">Contact</th>
                <th className="py-3 px-4 font-semibold text-center"> </th>
              </tr>
            </thead>
            <tbody>
              {warehouses.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div className="flex flex-col items-center justify-center py-16">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l1.553-4.66A2 2 0 016.447 4h11.106a2 2 0 011.894 1.34L21 10m-9 4v6m-4 0h8" />
                      </svg>
                      <div className="text-lg text-gray-500 mb-2">No warehouses yet.</div>
                      <div className="text-sm text-gray-400 mb-6">Click the + button or the button below to add your first warehouse.</div>
                      <button
                        className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                        onClick={openAdd}
                      >
                        Add Warehouse
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              {warehouses.map(w => (
                <tr key={w.id} className="bg-white border-b">
                  <td className="py-3 px-4 align-middle max-w-xl whitespace-pre-line">{w.name}</td>
                  <td className="py-3 px-4 align-middle">{w.pin}</td>
                  <td className="py-3 px-4 align-middle">{w.address}</td>
                  <td className="py-3 px-4 align-middle">{w.city}</td>
                  <td className="py-3 px-4 align-middle">{w.state}</td>
                  <td className="py-3 px-4 align-middle">{w.country}</td>
                  <td className="py-3 px-4 align-middle">{w.contact}</td>
                  <td className="py-3 px-4 align-middle text-center">
                    <button
                      className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primary-dark text-text-inverse rounded p-2 mr-2"
                      onClick={() => openEdit(w)}
                      aria-label="Edit"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      className="inline-flex items-center justify-center bg-brand-error hover:bg-brand-error-dark text-text-inverse rounded p-2"
                      onClick={() => handleDelete(w.id)}
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
              <div className="text-xl font-semibold mb-4">{editing ? "Edit" : "Add"} Warehouse</div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Pin Code" value={form.pin} onChange={e => setForm({ ...form, pin: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="State" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} required />
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-sm">Save</button>
                  <button type="button" className="bg-surface-tertiary hover:bg-surface-tertiary-dark text-text-primary font-semibold py-2 px-6 rounded-lg transition-colors shadow-sm" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-brand-error text-2xl transition-colors" onClick={() => setShowModal(false)} aria-label="Close">&times;</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
} 