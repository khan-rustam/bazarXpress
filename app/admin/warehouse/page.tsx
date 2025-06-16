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
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-codGray">Warehouses</h1>
          <button className="bg-spectra hover:bg-elm text-white px-4 py-2 rounded-lg flex items-center space-x-2" onClick={openAdd}>
            <Plus className="h-4 w-4" /> <span>Add Warehouse</span>
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
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
                <tr><td colSpan={8} className="text-center text-gray-400 py-8">No warehouses yet.</td></tr>
              )}
              {warehouses.map(w => (
                <tr key={w.id} className="bg-white border-b">
                  <td className="py-3 px-4 align-top">{w.name}</td>
                  <td className="py-3 px-4 align-top">{w.pin}</td>
                  <td className="py-3 px-4 align-top">{w.address}</td>
                  <td className="py-3 px-4 align-top">{w.city}</td>
                  <td className="py-3 px-4 align-top">{w.state}</td>
                  <td className="py-3 px-4 align-top">{w.country}</td>
                  <td className="py-3 px-4 align-top">{w.contact}</td>
                  <td className="py-3 px-4 align-top text-center">
                    <button className="inline-flex items-center justify-center bg-elm hover:bg-spectra text-white rounded p-2 mr-2" onClick={() => openEdit(w)}><Pencil className="h-5 w-5" /></button>
                    <button className="inline-flex items-center justify-center bg-mountbattenPink hover:bg-red-500 text-white rounded p-2" onClick={() => handleDelete(w.id)}><Trash2 className="h-5 w-5" /></button>
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
                <input className="w-full border border-gray-300 rounded-lg p-3" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3" placeholder="Pin Code" value={form.pin} onChange={e => setForm({ ...form, pin: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3" placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3" placeholder="State" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3" placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required />
                <input className="w-full border border-gray-300 rounded-lg p-3" placeholder="Contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} required />
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