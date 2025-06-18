"use client"

import { useState } from "react"
import AdminLayout from "../../../components/AdminLayout"
import { Plus, Eye, Trash2, UploadCloud, Pencil } from "lucide-react"

interface SmartBanner {
  id: string
  image: string // URL
  title: string
  description: string
  link: string
  enabled: boolean
}

const initialBanner: SmartBanner | null = null

export default function AdminSmartBanners() {
  const [banner, setBanner] = useState<SmartBanner | null>(initialBanner)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    link: "",
    enabled: true,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const openAdd = () => {
    setForm({ image: "", title: "", description: "", link: "", enabled: true })
    setImagePreview(null)
    setShowModal(true)
  }
  const openEdit = () => {
    if (!banner) return
    setForm({
      image: banner.image,
      title: banner.title,
      description: banner.description,
      link: banner.link,
      enabled: banner.enabled,
    })
    setImagePreview(banner.image)
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
    const newBanner = { ...form, image: imagePreview || "" }
    setBanner({
      id: banner?.id || Date.now().toString(),
      ...newBanner,
    })
    setShowModal(false)
  }
  const handleDelete = () => setBanner(null)

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto mt-10">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-lg">Smart Banner</div>
            {!banner && (
              <button
                className="bg-brand-primary hover:bg-brand-primary-dark text-white rounded p-2 transition-colors"
                onClick={openAdd}
                aria-label="Add Smart Banner"
              >
                <Plus className="h-6 w-6" />
              </button>
            )}
            {banner && (
              <button
                className="bg-brand-primary hover:bg-brand-primary-dark text-white rounded p-2 transition-colors"
                onClick={openEdit}
                aria-label="Edit Smart Banner"
              >
                <Eye className="h-6 w-6" />
              </button>
            )}
          </div>
          {!banner ? (
            <div className="flex flex-col items-center justify-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" />
              </svg>
              <div className="text-lg text-gray-500 mb-2">No smart banner yet.</div>
              <div className="text-sm text-gray-400 mb-6">Click the + button or the button below to add your first smart banner.</div>
              <button
                className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                onClick={openAdd}
              >
                Add Smart Banner
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-base">Preview</div>
                <div className="flex gap-2">
                  <button
                    className="bg-brand-primary hover:bg-brand-primary-dark text-white rounded p-2 transition-colors"
                    onClick={openEdit}
                    aria-label="Edit Smart Banner"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    className="bg-brand-error hover:bg-brand-error-dark text-white rounded p-2 transition-colors"
                    onClick={handleDelete}
                    aria-label="Delete Smart Banner"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 flex flex-col items-center bg-gray-50">
                {banner.image ? (
                  <img src={banner.image} alt="Banner" className="w-full max-w-xs rounded-lg mb-4" />
                ) : (
                  <div className="w-full max-w-xs h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <UploadCloud className="h-10 w-10 text-gray-400" />
                  </div>
                )}
                <div className="text-lg font-semibold mb-1">{banner.title}</div>
                <div className="text-gray-600 mb-2 text-center">{banner.description}</div>
                {banner.link && (
                  <a href={banner.link} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                    {banner.link}
                  </a>
                )}
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${banner.enabled ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-500"}`}>
                    {banner.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative border-4 border-brand-primary/20">
              <div className="text-2xl font-bold mb-4 text-brand-primary">{banner ? "Edit" : "Add"} Smart Banner</div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-medium mb-1">Image</label>
                  <div className="border-2 border-dashed border-brand-primary/40 rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer hover:border-brand-primary transition-colors" onClick={() => document.getElementById('smart-banner-image-input')?.click()}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-32 object-contain mb-2 rounded shadow" />
                    ) : (
                      <>
                        <UploadCloud className="h-10 w-10 text-brand-primary" />
                        <div className="font-medium text-text-primary mt-2">Upload Banner Image</div>
                        <div className="text-text-secondary text-sm">Upload jpg, png images</div>
                      </>
                    )}
                    <input
                      id="smart-banner-image-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Title</label>
                  <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Banner title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <textarea className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Banner description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
                </div>
                <div>
                  <label className="block font-medium mb-1">Link (optional)</label>
                  <input className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="https://example.com" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={form.enabled} onChange={e => setForm({ ...form, enabled: e.target.checked })} id="enabled" />
                  <label htmlFor="enabled" className="font-medium">Enable Smart Banner</label>
                </div>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="bg-brand-primary hover:bg-brand-primary-dark text-text-inverse font-semibold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform">Save</button>
                  <button type="button" className="bg-surface-tertiary hover:bg-surface-tertiary-dark text-text-primary font-semibold py-2 px-6 rounded-lg transition-colors" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
              <button className="absolute top-3 right-3 text-text-secondary hover:text-brand-error text-2xl" onClick={() => setShowModal(false)} aria-label="Close">&times;</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
} 