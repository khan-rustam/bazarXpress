import Layout from "../../components/Layout"
import Link from "next/link"
import { Shield, User, Lock, Mail, Globe, Cookie, Users, RefreshCw, ArrowUp } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[260px] flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80" alt="Privacy Policy" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center py-12">
          <div className="bg-white/90 rounded-2xl shadow-2xl px-8 py-10 max-w-2xl mx-auto flex flex-col items-center text-center backdrop-blur-md">
            <Shield className="h-10 w-10 text-spectra mb-4" />
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-spectra">Privacy Policy</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-spectra via-neptune to-elm rounded-full mb-6 animate-pulse" />
            <p className="text-lg md:text-xl text-gray-700 font-medium mb-2">Last updated: March 15, 2024</p>
            <p className="text-gray-600">Your privacy is important to us. This policy explains how we collect, use, and protect your information at BazarXpress.</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-codGray mb-4"><User className="h-6 w-6 text-spectra" /> 1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                At BazarXpress, we collect information you provide directly to us, such as when you create an account,
                make a purchase, or contact us for support. This may include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Personal information (name, email address, phone number)</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Purchase history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-codGray mb-4"><Lock className="h-6 w-6 text-spectra" /> 2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Process and fulfill your orders</li>
                <li>Provide customer service and support</li>
                <li>Send you order confirmations and shipping updates</li>
                <li>Personalize your shopping experience</li>
                <li>Send promotional emails (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-codGray mb-4"><Users className="h-6 w-6 text-spectra" /> 3. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>With service providers who help us operate our business</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-codGray mb-4"><RefreshCw className="h-6 w-6 text-spectra" /> 4. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no method of transmission over the internet is
                100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-codGray mb-4"><Mail className="h-6 w-6 text-spectra" /> 5. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Access and update your personal information</li>
                <li>Delete your account and personal data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-codGray mb-4"><Cookie className="h-6 w-6 text-spectra" /> 6. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and
                personalize content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-codGray mb-4"><User className="h-6 w-6 text-spectra" /> 7. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-codGray mb-4"><RefreshCw className="h-6 w-6 text-spectra" /> 8. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-codGray mb-4"><Globe className="h-6 w-6 text-spectra" /> 9. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">Email: privacy@BazarXpress.com</p>
                <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-700">Address: 123 Commerce Street, Business District, New York, NY 10001</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 bg-spectra text-white p-4 rounded-full shadow-xl hover:bg-elm transition-colors animate-fade-in"
        aria-label="Back to Top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </Layout>
  )
}
