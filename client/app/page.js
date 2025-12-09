"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

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

    [heroRef, featuresRef, statsRef, ctaRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Real-World Scenarios",
      description:
        "Practice with challenges mirroring actual cybersecurity threats.",
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
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      title: "Competitive Rankings",
      description:
        "Climb the leaderboard and compete with professionals worldwide.",
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Multi-Category Challenges",
      description:
        "Master web exploitation, cryptography, forensics, and more.",
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Live Competitions",
      description:
        "Join time-bound events and showcase your skills in real-time.",
    },
  ];

  //just for demo purposes
  const stats = [
    { number: "10K+", label: "Hackers" },
    { number: "500+", label: "Challenges" },
    { number: "50+", label: "Events" },
    { number: "24/7", label: "Access" },
  ];

  return (
    <div className="w-full bg-white">
      {/* Subtle background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-hudson/5 via-transparent to-chesapeake/5" />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative px-4 lg:pt-4 pt-16 pb-20 sm:px-6 lg:px-8 opacity-0 translate-y-4 transition-all duration-700"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-monarch-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Master Cybersecurity
              <br />
              <span className="bg-linear-to-r from-monarch-900 via-chesapeake to-hudson bg-clip-text text-transparent">
                Through Competition
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-base text-monarch-900/70 sm:text-lg md:text-xl">
              Challenge yourself with real-world hacking scenarios. Compete
              globally, earn recognition, and level up your security skills.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/register" className="w-full sm:w-auto">
                <button className="group relative w-full overflow-hidden rounded-full bg-linear-to-r from-monarch-900 to-chesapeake px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Now
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
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-chesapeake to-hudson opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </Link>
              <Link href="/challenges" className="w-full sm:w-auto">
                <button className="w-full rounded-full border-2 border-chesapeake/40 px-8 py-3.5 text-base font-semibold text-monarch-900 transition-all hover:border-chesapeake hover:bg-hudson/5 sm:w-auto">
                  View Challenges
                </button>
              </Link>
            </div>
          </div>

          {/* Terminal */}
          <div className="mx-auto mt-12 max-w-4xl rounded-xl border border-hudson/20 bg-linear-to-br from-monarch-950 to-monarch-900 p-4 shadow-xl sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-sarah-sand" />
              <div className="h-3 w-3 rounded-full bg-hudson" />
              <span className="ml-2 text-xs text-silver sm:text-sm">
                terminal@cybercup:~$
              </span>
            </div>
            <div className="space-y-2 font-mono text-xs sm:text-sm">
              <div className="flex items-center text-hudson">
                <span className="text-aquatic">$ </span>
                <span className="ml-1">
                  ctf-tool scan --target challenge-01
                </span>
              </div>
              <div className="pl-4 text-silver/70">
                Scanning for vulnerabilities...
              </div>
              <div className="flex items-center gap-2 pl-4 text-aquatic">
                <svg
                  className="h-3 w-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Found SQL injection point</span>
              </div>
              <div className="flex items-center gap-2 pl-4 text-aquatic">
                <svg
                  className="h-3 w-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>XSS vulnerability detected</span>
              </div>
              <div className="flex items-center gap-2 pl-4 text-hudson">
                <svg
                  className="h-3 w-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Flag location identified</span>
              </div>
              <div className="flex items-center pt-1 text-coastal">
                <span className="mr-2 animate-pulse">▊</span>
                <span className="font-semibold">
                  Ready to capture the flag?
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="bg-linear-to-b from-wisconsin-gray/30 to-transparent px-4 py-16 opacity-0 translate-y-4 transition-all duration-700 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-monarch-900/10 bg-white p-6 text-center transition-all hover:scale-105 hover:border-chesapeake/50 hover:shadow-lg"
              >
                <div className="mb-2 bg-linear-to-r from-monarch-900 via-chesapeake to-hudson bg-clip-text text-3xl font-bold text-transparent transition-transform group-hover:scale-110 sm:text-4xl">
                  {stat.number}
                </div>
                <div className="text-xs font-medium uppercase tracking-wider text-monarch-900/70 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="px-4 py-16 opacity-0 translate-y-4 transition-all duration-700 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-chesapeake">
              Platform Features
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-monarch-900 sm:text-4xl md:text-5xl">
              Why Choose{" "}
              <span className="bg-linear-to-r from-monarch-900 via-chesapeake to-hudson bg-clip-text text-transparent">
                CTF-Cybercup.ai
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-monarch-900/70 sm:text-lg">
              Everything you need to become a cybersecurity expert
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-monarch-900/10 bg-white p-6 transition-all hover:scale-[1.02] hover:border-chesapeake/50 hover:shadow-xl sm:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-monarch-900 to-chesapeake text-white shadow-md transition-all group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-bold text-monarch-900 transition-colors group-hover:text-chesapeake sm:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-monarch-900/70 sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="px-4 py-16 opacity-0 translate-y-4 transition-all duration-700 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-monarch-900 via-chesapeake to-monarch-900 p-8 text-white shadow-2xl sm:p-12 md:p-16">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-hudson blur-3xl" />
              <div className="absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-aquatic blur-3xl" />
            </div>

            <div className="relative z-10 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white!">
                Ready to Test Your Skills?
              </h2>

              <p className="mx-auto mb-8 max-w-2xl text-base text-white/90 sm:text-lg md:text-xl">
                Join thousands of security professionals competing in real-time
                challenges.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link href="/register" className="w-full sm:w-auto">
                  <button className="group w-full rounded-full bg-white px-8 py-3.5 text-base font-bold text-monarch-900 shadow-xl transition-all hover:scale-105 hover:bg-hudson hover:text-white hover:shadow-2xl sm:w-auto">
                    <span className="flex items-center justify-center gap-2">
                      Create Free Account
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
                    </span>
                  </button>
                </Link>
                <Link href="/leaderboard" className="w-full sm:w-auto">
                  <button className="w-full rounded-full border-2 border-white/40 px-8 py-3.5 text-base font-semibold backdrop-blur-sm transition-all hover:border-white hover:bg-white/10 sm:w-auto">
                    View Leaderboard
                  </button>
                </Link>
              </div>
              <p className="mt-6 text-xs uppercase tracking-wider text-white/70 sm:text-sm">
                Secure the flag · Stay forward-focused
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}
