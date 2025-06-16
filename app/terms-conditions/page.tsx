import Layout from "../../components/Layout"
import Link from "next/link"

export default function TermsConditions() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm flex items-center space-x-2">
            <Link href="/" className="text-gray-500 hover:text-spectra transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-codGray font-medium">Terms & Conditions</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-codGray mb-8">Terms and Conditions</h1>
          <p className="text-gray-600 mb-8">Last updated: March 15, 2024</p>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using BazarXpress ("we," "our," or "us"), you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">2. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily download one copy of the materials on BazarXpress for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">3. Account Registration</h2>
              <p className="text-gray-700 mb-4">
                To access certain features of our service, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">4. Product Information and Pricing</h2>
              <p className="text-gray-700 mb-4">
                We strive to provide accurate product descriptions and pricing information. However:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>We do not warrant that product descriptions are accurate, complete, or error-free</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to correct any errors in pricing or product information</li>
                <li>Colors and images may vary from actual products due to display settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">5. Orders and Payment</h2>
              <p className="text-gray-700 mb-4">By placing an order, you agree to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Provide valid payment information</li>
                <li>Pay all charges incurred by your account</li>
                <li>Accept that we may cancel orders for any reason</li>
                <li>Understand that order confirmation does not guarantee product availability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">6. Shipping and Delivery</h2>
              <p className="text-gray-700 mb-4">Shipping and delivery terms:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Risk of loss passes to you upon delivery to the carrier</li>
                <li>You are responsible for providing accurate shipping information</li>
                <li>Additional charges may apply for expedited shipping</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">7. Returns and Refunds</h2>
              <p className="text-gray-700 mb-4">Our return policy includes:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>30-day return window for most items</li>
                <li>Items must be in original condition and packaging</li>
                <li>Return shipping costs may apply</li>
                <li>Refunds processed within 5-10 business days</li>
                <li>Some items may be non-returnable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">8. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">You may not use our service:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>
                  To violate any international, federal, provincial, or state regulations, rules, laws, or local
                  ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights or the intellectual property rights of
                  others
                </li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no case shall BazarXpress, our directors, officers, employees, affiliates, agents, contractors,
                interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any
                direct, indirect, incidental, punitive, special, or consequential damages of any kind.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">10. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify, defend, and hold harmless BazarXpress and our parent, subsidiaries, affiliates,
                partners, officers, directors, agents, contractors, licensors, service providers, subcontractors,
                suppliers, interns, and employees from any claim or demand made by any third party.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice
                or liability, under our sole discretion, for any reason whatsoever, including but not limited to a
                breach of the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-codGray mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to update, change, or replace any part of these Terms and Conditions by posting
                updates and/or changes to our website. It is your responsibility to check this page periodically for
                changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-codGray mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">Questions about the Terms and Conditions should be sent to us at:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">Email: legal@BazarXpress.com</p>
                <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-700">Address: 123 Commerce Street, Business District, New York, NY 10001</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}
