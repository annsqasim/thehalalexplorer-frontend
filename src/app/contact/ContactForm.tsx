"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CONTACT_EMAIL = "annsqasim@yahoo.com";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || "Contact from The Halal Explorer");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920"
          alt="Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-transparent dark:from-slate-900/95 dark:via-slate-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Have questions about a destination or need help planning your next halal-friendly adventure? We&apos;re here to help you explore the world with peace of mind.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 bg-white dark:bg-slate-800/50 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 block">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 block">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 block">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={6}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[160px]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-[2rem] p-8">
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                  Contact Details
                </h3>
                <div className="space-y-5">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all text-primary">
                      @
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                      <p className="text-slate-700 dark:text-slate-200 font-medium">{CONTACT_EMAIL}</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800/50 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Quick Answers</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">How do you verify Halal status?</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Our team consults local certification bodies and traveler reviews to ensure accuracy.</p>
                  </div>
                  <hr className="border-slate-100 dark:border-slate-700" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Can I contribute a guide?</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Absolutely! We love hearing from fellow explorers. Send us your ideas via the form.</p>
                  </div>
                  <Link href="/faq" className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all">
                    View Full FAQ →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
