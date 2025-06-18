"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Layout from "../../components/Layout"
import { getCurrentUser, setCurrentUser, type User } from "../../lib/auth"
import { UserIcon, Mail, Phone, MapPin, Calendar, Edit3, Save, X } from "lucide-react"
import Link from "next/link"

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
  })
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth/login")
      return
    }
    setUser(currentUser)
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      phone: "",
      address: "",
      dateOfBirth: "",
    })
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, name: formData.name, email: formData.email }
      setCurrentUser(updatedUser)
      setUser(updatedUser)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: "",
        address: "",
        dateOfBirth: "",
      })
    }
    setIsEditing(false)
  }

  if (!user) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm flex items-center space-x-2">
            <Link href="/" className="text-gray-500 hover:text-brand-primary transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-codGray font-medium">Profile</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-primary-dark px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-200">{user.email}</p>
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mt-2">
                  {user.role === "admin" ? "Administrator" : "Customer"}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-codGray">Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-codGray mb-2">
                  <UserIcon className="inline h-4 w-4 mr-2" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-codGray">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-codGray mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-codGray">{user.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-codGray mb-2">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-codGray">{formData.phone || "Not provided"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-codGray mb-2">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-codGray">
                    {formData.dateOfBirth || "Not provided"}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-codGray mb-2">
                  <MapPin className="inline h-4 w-4 mr-2" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-codGray">{formData.address || "Not provided"}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">0</span>
            </div>
            <h3 className="text-lg font-semibold text-codGray mb-2">Total Orders</h3>
            <p className="text-gray-600">Orders placed</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-brand-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">0</span>
            </div>
            <h3 className="text-lg font-semibold text-codGray mb-2">Wishlist Items</h3>
            <p className="text-gray-600">Saved products</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-mountbattenPink rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">$0</span>
            </div>
            <h3 className="text-lg font-semibold text-codGray mb-2">Total Spent</h3>
            <p className="text-gray-600">Lifetime value</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
