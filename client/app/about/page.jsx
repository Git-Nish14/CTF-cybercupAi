"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AboutPage() {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
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

    [heroRef, missionRef, valuesRef, teamRef, ctaRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const values = [
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
      title: "Innovation",
      description:
        "Pushing boundaries with cutting-edge cybersecurity challenges that mirror real-world threats.",
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Community",
      description:
        "Building a global network of security professionals who learn, compete, and grow together.",
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Excellence",
      description:
        "Maintaining the highest standards in challenge quality, platform security, and user experience.",
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Education",
      description:
        "Empowering learners at every level with practical, hands-on cybersecurity training.",
    },
  ];

  const stats = [
    { number: "2025", label: "Founded" },
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Challenges" },
    { number: "50+", label: "Countries" },
  ];

  const features = [
    {
      title: "Real-World Scenarios",
      description:
        "Our challenges are designed by industry professionals to reflect actual security vulnerabilities and attack vectors you'll encounter in the field.",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
    },
    {
      title: "Continuous Learning",
      description:
        "New challenges added weekly across multiple categories including web exploitation, cryptography, reverse engineering, and forensics.",
      icon: (
        <svg
          className="w-5 h-5"
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
    },
    {
      title: "Competitive Environment",
      description:
        "Compete globally on our live leaderboard, participate in time-bound events, and earn recognition for your achievements.",
      icon: (
        <svg
          className="w-5 h-5"
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
    },
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-hudson/5 via-transparent to-chesapeake/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-hudson/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-chesapeake/10 rounded-full blur-3xl" />
      </div>
      <section
        ref={heroRef}
        className="relative px-4 pt-12 pb-8 sm:px-6 lg:px-8 opacity-0 translate-y-4 transition-all duration-700"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About CTF-Cybercup.ai
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-monarch-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Empowering The Next
              <br />
              <span className="bg-linear-to-r from-monarch-900 via-chesapeake to-hudson bg-clip-text text-transparent">
                Generation of Hackers
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-3xl text-lg text-monarch-900/70 sm:text-xl">
              {` We're building the world's most comprehensive platform for cybersecurity education through competitive, hands-on challenges.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 mt-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-monarch-900/10 bg-white p-6 text-center shadow-sm hover:shadow-lg transition-all"
              >
                <div className="mb-2 bg-linear-to-r from-monarch-900 via-chesapeake to-hudson bg-clip-text text-3xl sm:text-4xl font-bold text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-monarch-900/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        ref={missionRef}
        className="px-4 py-16 sm:px-6 lg:px-8 opacity-0 translate-y-4 transition-all duration-700"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-widest text-chesapeake">
                Our Mission
              </span>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-monarch-900 sm:text-4xl md:text-5xl">
                Forward-Focused on
                <span className="block bg-linear-to-r from-chesapeake to-hudson bg-clip-text text-transparent">
                  Securing Tomorrow
                </span>
              </h2>
              <div className="space-y-4 text-lg text-monarch-900/70">
                <p>
                  At CTF-Cybercup.ai, we believe that the best way to learn
                  cybersecurity is by doing. Our mission is to provide a
                  platform where aspiring security professionals can develop
                  real-world skills through practical, competitive challenges.
                </p>
                <p>
                  {`Born from the vision of making advanced cybersecurity training accessible to everyone, we've created a community where learners of all levels can test their skills, compete globally, and grow alongside the industry's brightest minds.`}
                </p>
                <p>
                  {`Whether you're a student exploring security for the first time or a seasoned professional sharpening your edge, CTF-Cybercup.ai offers the challenges, community, and recognition you need to succeed.`}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl border border-monarch-900/10 bg-linear-to-br from-monarch-900 to-chesapeake p-8 sm:p-12 shadow-2xl">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-hudson blur-3xl" />
                  <div className="absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-aquatic blur-3xl" />
                </div>

                <div className="relative space-y-6">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex gap-4 items-start group">
                      <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm text-white group-hover:bg-white/30 transition-all">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white! mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-white">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={valuesRef}
        className="bg-linear-to-b from-wisconsin-gray/30 to-transparent px-4 py-16 sm:px-6 lg:px-8 opacity-0 translate-y-4 transition-all duration-700"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest text-chesapeake">
              Core Values
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-monarch-900 sm:text-4xl md:text-5xl">
              What Drives Us Forward
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-monarch-900/70">
              Our values shape everything we do, from challenge design to
              community building.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-monarch-900/10 bg-white p-6 transition-all hover:scale-105 hover:border-chesapeake/50 hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-monarch-900 to-chesapeake text-white shadow-md transition-all group-hover:scale-110 group-hover:rotate-3">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-monarch-900 transition-colors group-hover:text-chesapeake">
                  {value.title}
                </h3>
                <p className="text-sm text-monarch-900/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        ref={teamRef}
        className="px-4 py-16 sm:px-6 lg:px-8 opacity-0 translate-y-4 transition-all duration-700"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-monarch-900/10 shadow-2xl">
                <div className="aspect-4/3 bg-linear-to-br from-monarch-900 via-chesapeake to-hudson flex items-center justify-center p-12">
                  <div className="text-center space-y-6">
                    <svg
                      className="w-24 h-24 mx-auto text-white/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div className="text-white">
                      <p className="text-4xl font-bold mb-2">10,000+</p>
                      <p className="text-lg text-white/80">
                        Security Enthusiasts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-widest text-chesapeake">
                Join The Community
              </span>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-monarch-900 sm:text-4xl">
                Built By Hackers,
                <span className="block bg-linear-to-r from-chesapeake to-hudson bg-clip-text text-transparent">
                  For Hackers
                </span>
              </h2>
              <div className="space-y-4 text-lg text-monarch-900/70 mb-8">
                <p>
                  Our platform is shaped by security professionals, educators,
                  and competitors who understand what it takes to excel in
                  cybersecurity.
                </p>
                <p>
                  {`From beginners taking their first steps into security to experienced penetration testers sharpening their skills, our community welcomes everyone who's passionate about learning and improving.`}
                </p>
                <p>
                  Join thousands of hackers worldwide who are pushing
                  boundaries, sharing knowledge, and building the future of
                  cybersecurity together.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="rounded-xl border border-monarch-900/10 bg-white p-4 shadow-sm flex-1 min-w-[140px]">
                  <div className="text-2xl font-bold text-chesapeake mb-1">
                    50+
                  </div>
                  <div className="text-sm text-monarch-900/70">Countries</div>
                </div>
                <div className="rounded-xl border border-monarch-900/10 bg-white p-4 shadow-sm flex-1 min-w-[140px]">
                  <div className="text-2xl font-bold text-chesapeake mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-monarch-900/70">Support</div>
                </div>
                <div className="rounded-xl border border-monarch-900/10 bg-white p-4 shadow-sm flex-1 min-w-[140px]">
                  <div className="text-2xl font-bold text-chesapeake mb-1">
                    100%
                  </div>
                  <div className="text-sm text-monarch-900/70">Free Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={ctaRef}
        className="px-4 py-16 sm:px-6 lg:px-8 opacity-0 translate-y-4 transition-all duration-700"
      >
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-monarch-900 via-chesapeake to-monarch-900 p-8 sm:p-12 md:p-16 text-white shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-hudson blur-3xl" />
              <div className="absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-aquatic blur-3xl" />
            </div>

            <div className="relative z-10 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white!">
                Ready to Start Your Journey?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
                Join our growing community of security professionals and start
                solving challenges today.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/register">
                  <button className="group w-full sm:w-auto rounded-full bg-white px-8 py-3.5 font-bold text-monarch-900 shadow-xl transition-all hover:scale-105 hover:bg-hudson hover:text-white">
                    <span className="flex items-center justify-center gap-2">
                      Create Free Account
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
                    </span>
                  </button>
                </Link>
                <Link href="/challenges">
                  <button className="w-full sm:w-auto rounded-full border-2 border-white/40 px-8 py-3.5 font-semibold backdrop-blur-sm transition-all hover:border-white hover:bg-white/10">
                    Browse Challenges
                  </button>
                </Link>
              </div>
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
