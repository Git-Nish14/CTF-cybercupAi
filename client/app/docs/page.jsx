"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");
  const heroRef = useRef(null);

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

    if (heroRef.current) observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  const navigation = [
    {
      id: "getting-started",
      title: "Getting Started",
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: "challenges",
      title: "Challenges",
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      id: "scoring",
      title: "Scoring System",
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "categories",
      title: "Categories",
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
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
    },
    {
      id: "leaderboard",
      title: "Leaderboard",
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
    {
      id: "faq",
      title: "FAQ",
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const content = {
    "getting-started": {
      title: "Getting Started",
      sections: [
        {
          heading: "Welcome to CTF-Cybercup.ai",
          content:
            "CTF-Cybercup.ai is a competitive cybersecurity platform where you can test your hacking skills through Capture The Flag (CTF) challenges. Whether you're a beginner or an experienced security professional, we have challenges suited for all skill levels.",
        },
        {
          heading: "Creating Your Account",
          content:
            "To get started, create a free account by clicking the 'Register' button in the navigation bar. You'll need to provide a username, email address, and password. Once registered, you can immediately start solving challenges and climbing the leaderboard.",
        },
        {
          heading: "Your First Challenge",
          content:
            "Navigate to the 'Challenges' page to browse available challenges. Start with 'Easy' difficulty challenges to familiarize yourself with the platform. Each challenge will have a description, difficulty level, and point value. Submit flags in the format: flag{your_answer_here}",
        },
        {
          heading: "Flag Format",
          content:
            "All flags follow the standard format: flag{...}. Make sure to submit the complete flag including the 'flag{' prefix and '}' suffix. Flags are case-sensitive unless otherwise specified in the challenge description.",
        },
      ],
    },
    challenges: {
      title: "Understanding Challenges",
      sections: [
        {
          heading: "Challenge Structure",
          content:
            "Each challenge contains a title, description, difficulty level, point value, and category. Read the description carefully as it often contains hints. Some challenges may include downloadable files or links to external resources.",
        },
        {
          heading: "Difficulty Levels",
          content:
            "Challenges are categorized into three difficulty levels: Easy (100-200 points), Medium (300-500 points), and Hard (600-1000 points). Start with easier challenges to build your skills before attempting harder ones.",
        },
        {
          heading: "Submitting Solutions",
          content:
            "Once you've solved a challenge, submit your flag using the submission form on the challenge page. You'll receive immediate feedback on whether your submission is correct. Incorrect submissions are tracked but don't penalize your score.",
        },
        {
          heading: "Challenge Hints",
          content:
            "Some challenges may offer hints that can be revealed at the cost of points. Consider whether you need the hint before revealing it, as it will reduce your total score for that challenge.",
        },
      ],
    },
    scoring: {
      title: "Scoring System",
      sections: [
        {
          heading: "Point Values",
          content:
            "Each challenge has a fixed point value based on its difficulty. Easy challenges: 100-200 points, Medium challenges: 300-500 points, Hard challenges: 600-1000 points. Your total score is the sum of all successfully solved challenges.",
        },
        {
          heading: "First Blood Bonus",
          content:
            "The first person to solve a challenge receives a 'First Blood' bonus of 10% additional points. This incentivizes quick and accurate problem-solving skills.",
        },
        {
          heading: "Leaderboard Rankings",
          content:
            "Your position on the leaderboard is determined by your total points. In case of a tie, the user who reached that score first is ranked higher. Rankings are updated in real-time as challenges are solved.",
        },
        {
          heading: "Score Persistence",
          content:
            "Your score and solved challenges are permanently saved to your account. You can view your progress and solved challenges on your profile page at any time.",
        },
      ],
    },
    categories: {
      title: "Challenge Categories",
      sections: [
        {
          heading: "Web Exploitation",
          content:
            "Web challenges involve finding and exploiting vulnerabilities in web applications. Common vulnerabilities include SQL injection, Cross-Site Scripting (XSS), Server-Side Request Forgery (SSRF), and authentication bypasses.",
        },
        {
          heading: "Cryptography",
          content:
            "Crypto challenges require you to break encryption schemes, decode ciphers, or find weaknesses in cryptographic implementations. Topics include classical ciphers, RSA, AES, hash functions, and more.",
        },
        {
          heading: "Reverse Engineering",
          content:
            "Reverse engineering challenges involve analyzing compiled binaries to understand their functionality. You'll need tools like IDA Pro, Ghidra, or radare2 to disassemble and decompile programs.",
        },
        {
          heading: "Forensics",
          content:
            "Forensics challenges require you to analyze files, memory dumps, network captures, or disk images to extract hidden information. Common tools include Wireshark, Volatility, and Autopsy.",
        },
        {
          heading: "Binary Exploitation",
          content:
            "Binary exploitation (pwn) challenges involve finding and exploiting vulnerabilities in compiled programs. Common vulnerabilities include buffer overflows, format string bugs, and use-after-free vulnerabilities.",
        },
        {
          heading: "Miscellaneous",
          content:
            "Misc challenges don't fit neatly into other categories. They may involve OSINT, steganography, programming puzzles, or other creative problem-solving tasks.",
        },
      ],
    },
    leaderboard: {
      title: "Leaderboard Guide",
      sections: [
        {
          heading: "Global Rankings",
          content:
            "The leaderboard displays all users ranked by their total points. You can see the top performers and track your progress against other competitors. The leaderboard updates in real-time as challenges are solved.",
        },
        {
          heading: "User Profiles",
          content:
            "Click on any username to view their public profile, which shows their solved challenges, total points, and join date. Use this to learn from top performers and see which challenges are most popular.",
        },
        {
          heading: "Filtering Options",
          content:
            "Use the filter options to view rankings by specific time periods (all-time, monthly, weekly) or by specific categories. This helps you see who's excelling in particular areas.",
        },
        {
          heading: "Your Progress",
          content:
            "Your current rank and score are highlighted on the leaderboard. Track your improvement over time and set goals to climb higher in the rankings.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      sections: [
        {
          heading: "Is CTF-Cybercup.ai free to use?",
          content:
            "Yes! CTF-Cybercup.ai is completely free to use. All challenges, features, and leaderboard access are available to all registered users at no cost.",
        },
        {
          heading: "What if I get stuck on a challenge?",
          content:
            "Don't worry! Start by carefully re-reading the challenge description. Search for writeups of similar CTF challenges online. Join our community Discord server to discuss challenges (without sharing direct solutions). Remember, learning from struggles is part of the process!",
        },
        {
          heading: "Can I compete in teams?",
          content:
            "Currently, CTF-Cybercup.ai is designed for individual competition. However, team-based competitions and collaborative features are planned for future updates. Stay tuned!",
        },
        {
          heading: "How often are new challenges added?",
          content:
            "We add new challenges weekly across various categories and difficulty levels. Follow our announcements or enable notifications to stay updated on new challenge releases.",
        },
        {
          heading: "What tools do I need?",
          content:
            "Most challenges can be solved with common security tools like Burp Suite, Wireshark, Python, and a web browser. Specific challenges may require specialized tools, which will be mentioned in the challenge description.",
        },
        {
          heading: "Can I create and submit my own challenges?",
          content:
            "We're currently building a challenge submission system for the community. In the meantime, if you have challenge ideas, please contact us through the support page.",
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-[#E6EAEE]/20 to-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative px-4 pt-12 pb-8 sm:px-6 lg:px-8 opacity-0 translate-y-4 transition-all duration-700"
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Documentation
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-monarch-900 sm:text-5xl md:text-6xl">
            Everything You Need to
            <br />
            <span className="bg-linear-to-r from-monarch-900 via-chesapeake to-hudson bg-clip-text text-transparent">
              Get Started
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-monarch-900/70">
            Comprehensive guides and documentation to help you master the
            platform
          </p>

          {/* Search Bar */}
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-monarch-900/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-monarch-900/20 bg-white py-3 pl-12 pr-4 text-monarch-900 placeholder-monarch-900/40 transition-all focus:border-chesapeake focus:outline-none focus:ring-2 focus:ring-chesapeake/20"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-monarch-900/10 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-monarch-900/70">
                  Contents
                </h3>
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                        activeSection === item.id
                          ? "bg-linear-to-r from-monarch-900 to-chesapeake text-white"
                          : "text-monarch-900/70 hover:bg-hudson/10 hover:text-chesapeake"
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 rounded-lg border border-chesapeake/20 bg-chesapeake/5 p-4">
                  <h4 className="mb-2 font-semibold text-monarch-900">
                    Need Help?
                  </h4>
                  <p className="mb-3 text-sm text-monarch-900/70">
                    {`Can't find what you're looking for?`}
                  </p>
                  <Link href="/support">
                    <button className="w-full rounded-lg bg-linear-to-r from-monarch-900 to-chesapeake px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105">
                      Contact Support
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border border-monarch-900/10 bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-3xl font-bold text-monarch-900">
                  {content[activeSection].title}
                </h2>

                <div className="space-y-8">
                  {content[activeSection].sections.map((section, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-chesapeake pl-6"
                    >
                      <h3 className="mb-3 text-xl font-bold text-monarch-900">
                        {section.heading}
                      </h3>
                      <p className="leading-relaxed text-monarch-900/70">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quick Links */}
                <div className="mt-8 grid gap-4 border-t border-monarch-900/10 pt-8 sm:grid-cols-2">
                  <Link href="/challenges">
                    <div className="group rounded-lg border border-monarch-900/10 p-4 transition-all hover:border-chesapeake/50 hover:shadow-lg">
                      <div className="mb-2 flex items-center gap-2 text-chesapeake">
                        <svg
                          className="h-5 w-5"
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
                        <span className="font-semibold">Browse Challenges</span>
                      </div>
                      <p className="text-sm text-monarch-900/70">
                        Start solving challenges now
                      </p>
                    </div>
                  </Link>

                  <Link href="/leaderboard">
                    <div className="group rounded-lg border border-monarch-900/10 p-4 transition-all hover:border-chesapeake/50 hover:shadow-lg">
                      <div className="mb-2 flex items-center gap-2 text-chesapeake">
                        <svg
                          className="h-5 w-5"
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
                        <span className="font-semibold">View Leaderboard</span>
                      </div>
                      <p className="text-sm text-monarch-900/70">
                        See top competitors
                      </p>
                    </div>
                  </Link>
                </div>
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
