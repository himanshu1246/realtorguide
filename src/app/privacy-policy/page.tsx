import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen" style={{ background: "#F8F6FF" }}>
      {/* Header */}
      <div className="pt-20 pb-16" style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)" }}>
        <div className="container mx-auto px-6 md:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white" style={{ color: "#A5B4FC" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Privacy Policy</h1>
          <p className="mt-4 text-lg" style={{ color: "#A5B4FC" }}>Last updated: June 9, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none space-y-10">

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>1. Information We Collect</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>We collect information you provide directly to us, such as when you fill out a contact form, request a strategy session, or communicate with us. This may include your name, email address, phone number, company name, project location, and budget preferences.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>2. How We Use Your Information</h2>
            <p className="mb-4" style={{ color: "#4B5563", lineHeight: "1.8" }}>We use the information we collect to:</p>
            <ul className="space-y-3 ml-6">
              {["Respond to your inquiries and provide requested services", "Send you marketing communications (with your consent)", "Improve our website and services", "Analyze usage trends and measure campaign effectiveness", "Comply with legal obligations"].map((item, i) => (
                <li key={i} className="flex items-start gap-3" style={{ color: "#4B5563" }}>
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: "linear-gradient(135deg, #8B5CF6, #34D399)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>3. Data Security</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>4. Third-Party Services</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>We may use third-party services such as Google Analytics, Meta Pixel, and CRM platforms to help us understand how users interact with our website. These services may collect information about your browsing behavior.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>5. Cookies</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>Our website uses cookies and similar tracking technologies to enhance your browsing experience. You can control cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>6. Your Rights</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>You have the right to access, update, or delete your personal information at any time. To exercise these rights, please contact us at services@realtorguide.in.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E1B4B", fontFamily: "var(--font-syne)" }}>7. Contact Us</h2>
            <p style={{ color: "#4B5563", lineHeight: "1.8" }}>If you have questions about this Privacy Policy, please contact us at:</p>
            <div className="mt-4 p-6 rounded-[30px]" style={{ background: "#FFFFFF", border: "1px solid rgba(139,92,246,0.1)" }}>
              <p className="font-bold" style={{ color: "#1E1B4B" }}>Realtor Guide</p>
              <p style={{ color: "#4B5563" }}>Email: services@realtorguide.in</p>
              <p style={{ color: "#4B5563" }}>Phone: +91 7007319062</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
