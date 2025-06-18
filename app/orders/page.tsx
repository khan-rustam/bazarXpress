"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Layout from "../../components/Layout"
import Link from "next/link"
import { useAppSelector } from '../../lib/store';
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-03-15",
    status: "delivered",
    total: 299.99,
    items: [
      { name: "Wireless Bluetooth Headphones", quantity: 1, price: 79.99 },
      { name: "Smart Fitness Watch", quantity: 1, price: 199.99 },
    ],
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-002",
    date: "2024-03-10",
    status: "shipped",
    total: 149.99,
    items: [{ name: "Premium Coffee Maker", quantity: 1, price: 149.99 }],
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD-003",
    date: "2024-03-05",
    status: "processing",
    total: 89.97,
    items: [{ name: "Organic Cotton T-Shirt", quantity: 3, price: 29.99 }],
    trackingNumber: null,
  },
]

const statusConfig = {
  processing: {
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    label: "Processing",
  },
  shipped: {
    icon: Truck,
    color: "text-blue-600",
    bg: "bg-blue-100",
    label: "Shipped",
  },
  delivered: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
    label: "Delivered",
  },
}

export default function Orders() {
  const user = useAppSelector((state) => state.auth.user);
  const [orders, setOrders] = useState(mockOrders)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">Loading...</div>
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
            <span className="text-codGray font-medium">My Orders</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-codGray">My Orders</h1>
          <span className="text-gray-600">{orders.length} orders</span>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-codGray mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">When you place your first order, it will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
              const statusColor = statusConfig[order.status as keyof typeof statusConfig].color
              const statusBg = statusConfig[order.status as keyof typeof statusConfig].bg
              const statusLabel = statusConfig[order.status as keyof typeof statusConfig].label

              return (
                <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-lg font-semibold text-codGray">Order {order.id}</h3>
                          <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusBg}`}>
                          <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                          <span className={`text-sm font-medium ${statusColor}`}>{statusLabel}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-brand-primary">${order.total.toFixed(2)}</p>
                        {order.trackingNumber && (
                          <p className="text-sm text-gray-500">Tracking: {order.trackingNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-codGray">{item.name}</h4>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-codGray">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="bg-gray-50 px-6 py-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 text-brand-primary hover:text-brand-primary-dark font-medium">
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                        {order.status === "delivered" && (
                          <button className="text-brand-primary hover:text-brand-primary-dark font-medium">Write Review</button>
                        )}
                        {order.trackingNumber && (
                          <button className="text-brand-primary hover:text-brand-primary-dark font-medium">Track Package</button>
                        )}
                      </div>
                      {order.status === "delivered" && (
                        <button className="bg-brand-primary hover:bg-brand-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}
