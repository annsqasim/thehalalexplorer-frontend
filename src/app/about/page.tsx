import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | The Halal Explorer - Empowering Muslim Travelers",
  description: "Learn about The Halal Explorer's mission to make travel easier for Muslims worldwide. Verified halal guides, prayer facilities, and community-driven insights.",
  keywords: ["about", "The Halal Explorer", "Muslim travel", "halal travel", "mission", "team"],
  openGraph: {
    title: "About Us | The Halal Explorer",
    description: "Our mission to empower every Muslim traveler with trusted halal travel information.",
  },
};

const stats = [
  { value: "50+", label: "Countries Covered" },
  { value: "1,200+", label: "Mosques Listed" },
  { value: "500k", label: "Community Members" },
  { value: "850+", label: "Halal Guides" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920"
          alt="Travelers exploring together"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Empowering Every <span className="text-primary">Muslim Traveler</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              We started with a simple question: How can we make the beauty of the world more accessible to those who seek it while honoring their faith?
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 -mt-20 relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold">
                  M
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
              </div>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  The Halal Explorer was born out of a passion for discovery and a commitment to inclusivity. We believe that travel is one of the most enriching experiences a human can have, and faith should never be a barrier to exploration.
                </p>
                <p>
                  Our platform provides curated, verified, and community-driven insights into destinations across the globe. From identifying the best local halal eateries to mapping out accessible prayer spaces, we handle the logistics so you can focus on the journey.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/20 px-6 py-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                  <span className="text-primary font-bold">✓</span>
                  <span className="font-semibold text-emerald-900 dark:text-emerald-100">Verified Listings</span>
                </div>
                <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/20 px-6 py-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                  <span className="text-primary font-bold">✓</span>
                  <span className="font-semibold text-emerald-900 dark:text-emerald-100">Community Driven</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800"
                  alt="Travel and culture"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 hidden md:block max-w-xs">
                <p className="italic text-slate-600 dark:text-slate-400 mb-4">
                  &quot;We want every Muslim traveler to feel at home, no matter where they are in the world.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <div>
                    <div className="font-bold text-sm">The Halal Explorer Team</div>
                    <div className="text-xs text-slate-500">Our Promise</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto bg-primary rounded-[40px] p-12 text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-4xl font-serif font-bold mb-6 relative z-10">Be Part of the Journey</h2>
          <p className="text-white/80 text-lg mb-10 relative z-10 leading-relaxed">
            Whether you&apos;re a traveler looking for advice or a local business wanting to be listed, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Get in Touch
            </Link>
            <Link
              href="/destinations"
              className="px-8 py-4 bg-primary border border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
            >
              Browse Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
