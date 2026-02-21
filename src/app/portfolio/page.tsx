"use client";
import Link from "next/link";

export default function PortfolioPage() {
  const portfolioItems = [
    { title: "Website Sample 1", description: "Placeholder description for this sample site." },
    { title: "Website Sample 2", description: "Placeholder description for this sample site." },
    { title: "Website Sample 3", description: "Placeholder description for this sample site." },
  ];

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-20">

      {/* Page Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Explore some sample websites we’ve built using AI-assisted tools. These are placeholders for now and will be replaced with your actual projects.
        </p>
      </section>

      {/* Portfolio Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {portfolioItems.map((item) => (
          <div key={item.title} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6">
            {/* Placeholder Image */}
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </section>

      {/* CTA to Contact */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Like What You See?</h2>
        <p className="text-gray-700 mb-6">Reach out to us to get your own professional AI-assisted website built.</p>
        <Link href="/contact">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
            Contact Us
          </button>
        </Link>
      </section>

    </main>
  );
}



