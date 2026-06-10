import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen" style={{ background: "#F8F6FF" }}>
      {/* Header */}
      <div className="pt-20 pb-16" style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)" }}>
        <div className="container mx-auto px-6 md:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white" style={{ color: "#A5B4FC" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Terms of Service</h1>
          <p className="mt-4 text-lg" style={{ color: "#A5B4FC" }}>Last updated: June 9, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none space-y-10">

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>1. Agreement to Terms</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>By accessing our website and using our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access our website or use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>2. Services</h2>
            <p className="mb-4" style={{ color: "#4B5563", lineHeight: "1.8" }}>Realtor Guide provides real estate marketing services including but not limited to:</p>
            <ul className="space-y-3 ml-6">
              {["Social media marketing and management", "Performance marketing (Google Ads, Meta Ads)", "Content production (video, photography, drone)", "Website development and CRM setup", "Lead generation and automation systems", "WhatsApp and chat automation"].map((item, i) => (
                <li key={i} className="flex items-start gap-3" style={{ color: "#4B5563" }}>
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: "linear-gradient(135deg, #8B5CF6, #34D399)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>3. Payment Terms</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>Payment terms will be outlined in individual service agreements. All fees are non-refundable unless otherwise stated. Late payments may incur additional charges as specified in your service agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>4. Intellectual Property</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>All content created by Realtor Guide, including but not limited to videos, graphics, copy, and website designs, remains the intellectual property of Realtor Guide until full payment is received. Upon completion of payment, ownership transfers to the client as specified in the service agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>5. Limitation of Liability</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>Realtor Guide shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by you for the specific service in question.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>6. Termination</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>Either party may terminate the service agreement with 30 days written notice. In the event of termination, the client will be responsible for payment of all services rendered up to the termination date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>7. Governing Law</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Mumbai.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>8. Contact</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>For questions regarding these terms, please contact us:</p>
            <div className="mt-4 p-6 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid rgba(139,92,246,0.1)" }}>
              <p className="font-bold" style={{ color: "#1E1B4B" }}>Realtor Guide</p>
              <p style={{ color: "#4B5563" }}>Email: hello@realtorguide.com</p>
              <p style={{ color: "#4B5563" }}>Phone: +91 98765 43210</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
