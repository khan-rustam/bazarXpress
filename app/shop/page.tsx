import Layout from "../../components/Layout"
import Link from "next/link"
import { Suspense } from "react"
import ShopClientContent from '../../components/ShopClientContent'

export default function Shop({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm flex items-center space-x-2">
            <Link href="/" className="text-gray-500 hover:text-spectra transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-codGray font-medium">Shop</span>
          </nav>
        </div>
      </div>
      <Suspense fallback={<div>Loading shop content...</div>}>
        <ShopClientContent searchParams={searchParams} />
      </Suspense>
    </Layout>
  )
}
