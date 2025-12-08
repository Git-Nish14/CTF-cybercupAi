"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    [heroRef, formRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all required fields", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    toast.info("📤 Sending your message...", {
      position: "bottom-right",
      autoClose: 5000,
    });

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          "Message sent successfully! We'll get back to you soon.",
          {
            position: "bottom-right",
            autoClose: 5000,
          }
        );
        setFormData({
          name: "",
          email: "",
          subject: "",
          category: "general",
          message: "",
        });
      } else {
        toast.error(
          data.message || "Failed to send message. Please try again.",
          {
            position: "bottom-right",
            autoClose: 5000,
          }
        );
      }
    } catch (error) {
      console.error("Support form error:", error);
      toast.error(
        "Connection error. Please check your network and try again.",
        {
          position: "bottom-right",
          autoClose: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Issue" },
    { value: "account", label: "Account Help" },
    { value: "challenge", label: "Challenge Question" },
    { value: "feedback", label: "Feedback" },
    { value: "other", label: "Other" },
  ];

  const quickHelp = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Documentation",
      description: "Find answers in our comprehensive guides",
      link: "/docs",
      color: "from-monarch-900 to-chesapeake",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "FAQ",
      description: "Quick answers to common questions",
      link: "/docs#faq",
      color: "from-chesapeake to-hudson",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
      ),
      title: "Community",
      description: "Join our Discord for live help",
      link: "#",
      color: "from-hudson to-aquatic",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-[#E6EAEE]/20 to-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative px-4 pt-12 pb-6 sm:px-6 lg:px-8 opacity-0 translate-y-4 transition-all duration-700"
      >
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-hudson/30 bg-hudson/10 px-4 py-2 text-sm font-medium text-chesapeake">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Support Center
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-monarch-900 sm:text-5xl md:text-6xl">
            How Can We
            <br />
            <span className="bg-linear-to-r from-monarch-900 via-chesapeake to-hudson bg-clip-text text-transparent">
              Help You Today?
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-monarch-900/70">
            {`We're here to help. Get in touch with our support team or explore our resources below.`}
          </p>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {quickHelp.map((item, idx) => (
              <Link key={idx} href={item.link}>
                <div className="group h-full rounded-xl border border-monarch-900/10 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br ${item.color} text-white shadow-md transition-all group-hover:scale-110 group-hover:rotate-3`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-monarch-900 group-hover:text-chesapeake transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-monarch-900/70">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-chesapeake font-medium text-sm">
                    <span>Learn more</span>
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        ref={formRef}
        className="px-4 py-16 sm:px-6 lg:px-8 opacity-0 translate-y-4 transition-all duration-700"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold text-monarch-900">
              Send Us a Message
            </h2>
            <p className="text-monarch-900/70">
              {`Fill out the form below and we'll get back to you within 48 hours`}
            </p>
          </div>

          <div className="rounded-2xl border border-monarch-900/10 bg-white p-8 shadow-xl">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Name Field */}
              <div className="group">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-monarch-900"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-monarch-900/20 bg-white px-4 py-3 text-monarch-900 placeholder-monarch-900/40 transition-all focus:border-chesapeake focus:outline-none focus:ring-2 focus:ring-chesapeake/20 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-monarch-900"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-monarch-900/20 bg-white px-4 py-3 text-monarch-900 placeholder-monarch-900/40 transition-all focus:border-chesapeake focus:outline-none focus:ring-2 focus:ring-chesapeake/20 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {/* Category Field */}
              <div className="group">
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-monarch-900"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-monarch-900/20 bg-white px-4 py-3 text-monarch-900 transition-all focus:border-chesapeake focus:outline-none focus:ring-2 focus:ring-chesapeake/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Field */}
              <div className="group">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-monarch-900"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-monarch-900/20 bg-white px-4 py-3 text-monarch-900 placeholder-monarch-900/40 transition-all focus:border-chesapeake focus:outline-none focus:ring-2 focus:ring-chesapeake/20 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Brief description"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="mt-6 group">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-monarch-900"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                rows={6}
                className="w-full rounded-lg border border-monarch-900/20 bg-white px-4 py-3 text-monarch-900 placeholder-monarch-900/40 transition-all focus:border-chesapeake focus:outline-none focus:ring-2 focus:ring-chesapeake/20 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your issue or question in detail..."
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-monarch-900 to-chesapeake px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-monarch-900/60">
              We typically respond within 48 hours during business days
            </p>
          </div>
        </div>
      </section>

      <ToastContainer />

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}
