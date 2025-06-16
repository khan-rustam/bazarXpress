"use client"

import { useState, useEffect } from "react"
import AdminLayout from "../../../components/AdminLayout"
import { Plus, Pencil, Trash2 } from "lucide-react"
import dynamic from 'next/dynamic'

// Dynamically import the RichTextEditor to ensure it's only rendered on the client
const RichTextEditor = dynamic(() => import('../../../components/RichTextEditor'), { ssr: false })

const mockBlogs = [
  {
    id: "1",
    title: "10 Must-Have Gadgets for 2024",
    author: "Admin",
    date: "2024-05-01",
    status: "published",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    content: "Discover the latest technology trends and gadgets that will revolutionize your daily life.",
  },
]

export default function AdminBlog() {
  const [blogs, setBlogs] = useState(mockBlogs)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: "",
    author: "",
    date: "",
    status: "published",
    image: "",
    content: "", // Content will be a string (HTML)
  })

  const openAdd = () => {
    setEditing(null)
    setForm({
      title: "",
      author: "",
      date: "",
      status: "published",
      image: "",
      content: "", // Empty HTML string for new blog
    })
    setImagePreview(null)
    setShowModal(true)
  }
  const openEdit = (b: any) => {
    setEditing(b)
    setForm({
      ...b,
      content: b.content, // Content is already HTML string
    })
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
    const newBlog = { ...form, image: imagePreview || "" }
    if (editing) {
      setBlogs(blogs.map(b => b.id === editing.id ? { ...newBlog, id: editing.id } : b))
    } else {
      setBlogs([{ ...newBlog, id: Date.now().toString() }, ...blogs])
    }
    setShowModal(false)
  }
  const handleDelete = (id: string) => setBlogs(blogs.filter(b => b.id !== id))

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-codGray">Blogs</h1>
          <button className="bg-gradient-to-r from-spectra to-elm text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform" onClick={openAdd}>
            <Plus className="h-4 w-4" /> <span>Add Blog</span>
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 font-semibold">Image</th>
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Author</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-center"> </th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-400 py-8">No blogs yet.</td></tr>
              )}
              {blogs.map(b => (
                <tr key={b.id} className="bg-white border-b">
                  <td className="py-3 px-4 align-top"><img src={b.image} alt="Blog" className="h-16 w-24 object-cover rounded shadow" /></td>
                  <td className="py-3 px-4 align-top font-bold text-lg text-spectra">{b.title}</td>
                  <td className="py-3 px-4 align-top text-elm">{b.author}</td>
                  <td className="py-3 px-4 align-top">{b.date}</td>
                  <td className="py-3 px-4 align-top"><span className={`px-3 py-1 rounded-full text-white ${b.status === "published" ? "bg-green-500" : "bg-gray-400"}`}>{b.status}</span></td>
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
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative border-4 border-spectra">
              <div className="text-2xl font-bold mb-4 text-spectra">{editing ? "Edit" : "Add"} Blog</div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-medium mb-1">Image</label>
                  <div className="border-2 border-dashed border-spectra rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer hover:border-elm transition-colors" onClick={() => document.getElementById('blog-image-input')?.click()}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-32 object-contain mb-2 rounded shadow" />
                    ) : (
                      <>
                        <svg width="40" height="40" fill="none" stroke="#6C63FF" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="8" rx="2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg>
                        <div className="font-medium text-codGray mt-2">Upload Blog Image</div>
                        <div className="text-gray-400 text-sm">Upload jpg, png images</div>
                      </>
                    )}
                    <input
                      id="blog-image-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input className="w-full border border-gray-300 rounded-lg p-3" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Author</label>
                    <input className="w-full border border-gray-300 rounded-lg p-3" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium mb-1">Date</label>
                    <input className="w-full border border-gray-300 rounded-lg p-3" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Status</label>
                    <select className="w-full border border-gray-300 rounded-lg p-3" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Content</label>
                  <div className="bg-white border border-gray-300 rounded-lg min-h-[120px] p-2">
                    {showModal && (
                      <RichTextEditor value={form.content} onChange={(html) => setForm({ ...form, content: html })} />
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="bg-gradient-to-r from-spectra to-elm text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform">Save</button>
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