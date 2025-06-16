"use client"

import { useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import { Plus, Pencil, Trash2 } from "lucide-react"

const mockBanners = [
  { id: "1", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80", headline: "Big Sale!", subheadline: "Up to 50% Off", description: "Don't miss our summer sale.", buttonText: "Shop Now", buttonLink: "/shop", buttonColor: "bg-lime-500 hover:bg-lime-600 text-white", highlight: "Get up to 30% off on your first $150 purchase" },
]

export default function AdminBanner() {
  const [banners, setBanners] = useState(mockBanners)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    image: "",
    headline: "",
    subheadline: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    buttonColor: "bg-lime-500 hover:bg-lime-600 text-white",
    highlight: "Get up to 30% off on your first $150 purchase",
  })

  const openAdd = () => {
    setEditing(null)
    setForm({ image: "", headline: "", subheadline: "", description: "", buttonText: "", buttonLink: "", buttonColor: "bg-lime-500 hover:bg-lime-600 text-white", highlight: "Get up to 30% off on your first $150 purchase" })
    setImagePreview(null)
    setShowModal(true)
  }
  const openEdit = (b: any) => {
    setEditing(b)
    setForm(b)
    setImagePreview(b.image)
    setShowModal(true)
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const newBanner = { ...form, image: imagePreview }
    if (editing) {
      setBanners(banners.map(b => b.id === editing.id ? { ...newBanner, id: editing.id } : b))
    } else {
      setBanners([{ ...newBanner, id: Date.now().toString() }, ...banners])
    }
    setShowModal(false)
  }
  const handleDelete = (id: string) => setBanners(banners.filter(b => b.id !== id))

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-codGray">Banners</h1>
          <button className="bg-gradient-to-r from-lime-500 to-elm text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform" onClick={openAdd}>
            <Plus className="h-4 w-4" /> <span>Add Banner</span>
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 font-semibold">Image</th>
                <th className="py-3 px-4 font-semibold">Headline</th>
                <th className="py-3 px-4 font-semibold">Subheadline</th>
                <th className="py-3 px-4 font-semibold">Button</th>
                <th className="py-3 px-4 font-semibold">Highlight</th>
                <th className="py-3 px-4 font-semibold text-center"> </th>
              </tr>
            </thead>
            <tbody>
              {banners.length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-400 py-8">No banners yet.</td></tr>
              )}
              {banners.map(b => (
                <tr key={b.id} className="bg-white border-b">
                  <td className="py-3 px-4 align-top"><img src={b.image} alt="Banner" className="h-16 w-32 object-cover rounded shadow" /></td>
                  <td className="py-3 px-4 align-top font-bold text-lg text-spectra">{b.headline}</td>
                  <td className="py-3 px-4 align-top text-elm">{b.subheadline}</td>
                  <td className="py-3 px-4 align-top"><span className={`px-3 py-1 rounded-full text-white ${b.buttonColor}`}>{b.buttonText}</span></td>
                  <td className="py-3 px-4 align-top text-lime-600 font-semibold">{b.highlight}</td>
                  <td className="py-3 px-4 align-top text-center">
                    <button className="inline-flex items-center justify-center bg-elm hover:bg-spectra text-white rounded p-2 mr-2" onClick={() => openEdit(b)}><Pencil className="h-5 w-5" /></button>
                    <button className="inline-flex items-center justify-center bg-mountbattenPink hover:bg-red-500 text-white rounded p-2" onClick={() => handleDelete(b.id)}><Trash2 className="h-5 w-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative border-4 border-lime-200">
              <div className="text-2xl font-bold mb-4 text-spectra">{editing ? "Edit" : "Add"} Banner</div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-medium mb-1">Image</label>
                  <div className="border-2 border-dashed border-lime-400 rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer hover:border-spectra transition-colors" onClick={() => document.getElementById('banner-image-input')?.click()}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-32 object-contain mb-2 rounded shadow" />
                    ) : (
                      <>
                        <svg width="40" height="40" fill="none" stroke="#A3E635" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="8" rx="2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
                        <div className="font-medium text-codGray mt-2">Upload Banner Image</div>
                        <div className="text-gray-400 text-sm">Upload jpg, png images</div>
                      </>
                    )}
                    <input
                      id="banner-image-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-1">Headline</label>
                    <input className="w-full border border-gray-300 rounded-lg p-3" value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Subheadline</label>
                    <input className="w-full border border-gray-300 rounded-lg p-3" value={form.subheadline} onChange={e => setForm({ ...form, subheadline: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <textarea className="w-full border border-gray-300 rounded-lg p-3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-1">Button Text</label>
                    <input className="w-full border border-gray-300 rounded-lg p-3" value={form.buttonText} onChange={e => setForm({ ...form, buttonText: e.target.value })} />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Button Link</label>
                    <input className="w-full border border-gray-300 rounded-lg p-3" value={form.buttonLink} onChange={e => setForm({ ...form, buttonLink: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Button Color (Tailwind classes)</label>
                  <input className="w-full border border-gray-300 rounded-lg p-3" value={form.buttonColor} onChange={e => setForm({ ...form, buttonColor: e.target.value })} />
                </div>
                <div>
                  <label className="block font-medium mb-1">Highlight</label>
                  <input className="w-full border border-gray-300 rounded-lg p-3" value={form.highlight} onChange={e => setForm({ ...form, highlight: e.target.value })} />
                </div>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="bg-gradient-to-r from-lime-500 to-elm text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform">Save</button>
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