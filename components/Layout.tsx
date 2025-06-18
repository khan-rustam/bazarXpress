import type { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"
import NewsletterModal from "./NewsletterModal"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-surface-primary">
      <Header />
      <main className="pt-28">{children}</main>
      <Footer />
      <NewsletterModal />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}
