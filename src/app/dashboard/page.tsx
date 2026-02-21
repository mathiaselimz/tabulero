"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">

      {/* Hero Section */}
      <section className="bg-blue-800 text-white text-center py-24 px-6">
        <h1 className="text-5xl font-bold mb-4">
          Fast, Modern Websites for Small Businesses
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          AI‑assisted site builds that look professional, load fast, and help you get found online — at pricing small businesses can afford.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/portfolio">
            <button className="bg-sky-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-500 transition">
              View Portfolio
            </button>
          </Link>
          <Link href="/contact">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Contact Us
            </button>
          </Link>
        </div>
      </section>

      {/* Features / Services */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          What We Build
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="border rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Business Websites</h3>
            <p className="text-gray-700">
              Professional small business websites designed to convert visitors into customers.
            </p>
          </div>
          <div className="border rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Responsive Layouts</h3>
            <p className="text-gray-700">
              Mobile‑first designs that look great on every device — phones, tablets, and desktops.
            </p>
          </div>
          <div className="border rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Ongoing Support Placeholder</h3>
            <p className="text-gray-700">
              Placeholder for future services like maintenance, updates, or checkups.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Portfolio Samples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Placeholder cards */}
          {["Site Example 1", "Site Example 2", "Site Example 3"].map((title) => (
            <div key={title} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-600">Description placeholder for this sample website.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="text-center py-14 px-6">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Start Your Website?
        </h2>
        <Link href="/contact">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
            Contact Us
          </button>
        </Link>
      </section>

    </main>
  );
}



