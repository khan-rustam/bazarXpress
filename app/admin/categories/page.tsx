"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "../../../components/AdminLayout"
import { getCurrentUser } from "../../../lib/auth"
import { Search, Plus, Edit, Trash2, MoreHorizontal, Grid3X3 } from "lucide-react"

// Mock categories data
const mockCategories = [
  {
    id: "1",
    name: "Electronics",
    description: "Electronic devices and gadgets",
    productCount: 45,
    status: "active",
    createdDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Fashion",
    description: "Clothing and accessories",
    productCount: 32,
    status: "active",
    createdDate: "2024-01-20",
  },
  {
    id: "3",
    name: "Home & Kitchen",
    description: "Home appliances and kitchen items",
    productCount: 28,
    status: "active",
    createdDate: "2024-02-01",
  },
  {
    id: "4",
    name: "Sports",
    description: "Sports equipment and fitness gear",
    productCount: 15,
    status: "active",
    createdDate: "2024-02-10",
  },
  {
    id: "5",
    name: "Books",
    description: "Books and educational materials",
    productCount: 8,
    status: "inactive",
    createdDate: "2024-02-15",
  },
]

export default function AdminCategories() {
  const [user, setUser] = useState(null)
  const [categories, setCategories] = useState(mockCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    parentId: "",
    image: null as File | null,
    description: "",
    status: "active",
    hide: false,
    popular: false,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<any | null>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "admin") {
      router.push("/")
      return
    }
    setUser(() => currentUser as any)
  }, [router])

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    const newCat = {
      id: Date.now().toString(),
      name: newCategory.name,
      parentId: newCategory.parentId,
      image: imagePreview,
      description: newCategory.description,
      productCount: 0,
      status: newCategory.status,
      hide: newCategory.hide,
      popular: newCategory.popular,
      createdDate: new Date().toISOString().slice(0, 10),
    }
    setCategories([newCat, ...categories])
    setShowModal(false)
    setNewCategory({ name: "", parentId: "", image: null, description: "", status: "active", hide: false, popular: false })
    setImagePreview(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewCategory({ ...newCategory, image: file })
      const reader = new FileReader()
      reader.onload = (ev) => setImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const openEditCategory = (category: any) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      parentId: category.parentId || "",
      image: null,
      description: category.description,
      status: category.status,
      hide: category.hide || false,
      popular: category.popular || false,
    })
    setImagePreview(category.image || null)
    setShowModal(true)
  }

  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault()
    setCategories(categories.map(cat => cat.id === editingCategory.id ? {
      ...editingCategory,
      name: newCategory.name,
      parentId: newCategory.parentId,
      image: imagePreview,
      description: newCategory.description,
      status: newCategory.status,
      hide: newCategory.hide,
      popular: newCategory.popular,
    } : cat))
    setShowModal(false)
    setEditingCategory(null)
    setNewCategory({ name: "", parentId: "", image: null, description: "", status: "active", hide: false, popular: false })
    setImagePreview(null)
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Categories Management</h2>
            <p className="text-text-secondary">Organize your products into categories</p>
          </div>
          <button
            className="bg-brand-primary hover:bg-brand-primary-dark text-text-inverse px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-surface-primary rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Total Categories</p>
                <p className="text-2xl font-bold text-text-primary">{categories.length}</p>
              </div>
              <Grid3X3 className="h-8 w-8 text-brand-info" />
            </div>
          </div>
          <div className="bg-surface-primary rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Active Categories</p>
                <p className="text-2xl font-bold text-brand-success">{categories.filter((c) => c.status === "active").length}</p>
              </div>
              <Grid3X3 className="h-8 w-8 text-brand-success" />
            </div>
          </div>
          <div className="bg-surface-primary rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Inactive Categories</p>
                <p className="text-2xl font-bold text-brand-error">{categories.filter((c) => c.status === "inactive").length}</p>
              </div>
              <Grid3X3 className="h-8 w-8 text-brand-error" />
            </div>
          </div>
          <div className="bg-surface-primary rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">Total Products</p>
                <p className="text-2xl font-bold text-brand-primary">{categories.reduce((sum, c) => sum + c.productCount, 0)}</p>
              </div>
              <Grid3X3 className="h-8 w-8 text-brand-primary" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-surface-primary rounded-lg p-6 shadow-md">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-surface-primary rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{category.name}</h3>
                  <p className="text-text-secondary text-sm mb-3">{category.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-text-tertiary">
                    <span>{category.productCount} products</span>
                    <span>•</span>
                    <span>Created {new Date(category.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.status === "active" ? "bg-brand-success/10 text-brand-success" : "bg-brand-error/10 text-brand-error"
                    }`}
                  >
                    {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-4 border-t border-border-primary">
                <button className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-text-inverse py-2 px-3 rounded text-sm transition-colors">
                  View Products
                </button>
                <button className="p-2 text-text-tertiary hover:text-brand-primary transition-colors" onClick={() => openEditCategory(category)}>
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-text-tertiary hover:text-brand-error transition-colors" onClick={() => handleDeleteCategory(category.id)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Add Category */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-surface-primary rounded-lg shadow-lg max-w-2xl w-full mx-4 p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-semibold text-text-primary">{editingCategory ? "Edit category" : "Create category"}</div>
              </div>
              <form id="add-category-form" onSubmit={editingCategory ? handleEditCategory : handleAddCategory} className="space-y-6">
                <div>
                  <label className="block font-medium mb-1">Category title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full border border-border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    value={newCategory.name}
                    onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Select parent category <span className="text-text-tertiary">(Optional)</span></label>
                  <select
                    className="w-full border border-border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    value={newCategory.parentId}
                    onChange={e => setNewCategory({ ...newCategory, parentId: e.target.value })}
                  >
                    <option value="">-- None --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                {/* Image upload UI */}
                <div>
                  <label className="block font-medium mb-1">Upload Image</label>
                  <div className="border-2 border-dashed border-border-primary rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer hover:border-brand-primary transition-colors" onClick={() => document.getElementById('cat-image-input')?.click()}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-32 object-contain mb-2" />
                    ) : (
                      <>
                        <svg width="40" height="40" fill="none" stroke="currentColor" className="text-text-tertiary" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="8" rx="2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
                        <div className="font-medium text-text-primary mt-2">Upload Image</div>
                        <div className="text-text-tertiary text-sm">Upload jpg, png images with a maximum size of 20 MB</div>
                      </>
                    )}
                    <input
                      id="cat-image-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                {/* Toggles */}
                <div className="flex gap-8 mt-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-brand-primary rounded"
                      checked={newCategory.hide}
                      onChange={e => setNewCategory({ ...newCategory, hide: e.target.checked })}
                    />
                    <span className="text-text-primary font-medium">Hide category</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-brand-primary rounded"
                      checked={newCategory.popular}
                      onChange={e => setNewCategory({ ...newCategory, popular: e.target.checked })}
                    />
                    <span className="text-text-primary font-medium">Popular</span>
                  </label>
                </div>
                <div className="flex gap-2 mt-8">
                  <button
                    type="submit"
                    className="bg-brand-primary hover:bg-brand-primary-dark text-text-primary hover:text-text-inverse font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="11" x2="21" y2="11"/><line x1="19" y1="9" x2="19" y2="13"/></svg>
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-surface-tertiary hover:bg-surface-tertiary-dark text-text-primary hover:bg-border-primary font-semibold py-2 px-6 rounded-lg transition-colors"
                    onClick={() => { setShowModal(false); setImagePreview(null); }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <button
                className="absolute top-3 right-3 text-text-tertiary hover:text-brand-error text-2xl"
                onClick={() => { setShowModal(false); setImagePreview(null); }}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
