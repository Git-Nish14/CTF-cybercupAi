"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function TermsPage() {
  const contentRef = useRef(null);

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

    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        {
          text: "By accessing or using CTF-Cybercup.ai, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our platform.",
        },
      ],
    },
    {
      title: "Account Registration",
      content: [
        {
          subtitle: "Eligibility",
          text: "You must be at least 13 years old to create an account. Users under 18 should have parental or guardian consent. You are responsible for maintaining the confidentiality of your account credentials.",
        },
        {
          subtitle: "Account Responsibility",
          text: "You are solely responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other breach of security.",
        },
        {
          subtitle: "Accurate Information",
          text: "You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.",
        },
      ],
    },
    {
      title: "Platform Usage",
      content: [
        {
          subtitle: "Permitted Use",
          text: "You may use CTF-Cybercup.ai for lawful purposes only, specifically to participate in cybersecurity challenges, competitions, and educational activities provided on the platform.",
        },
        {
          subtitle: "Prohibited Activities",
          text: "You may not: (a) attempt to gain unauthorized access to any part of the platform or other users' accounts; (b) use automated tools or scripts to access or interact with the platform without permission; (c) interfere with or disrupt the platform's operation; (d) use the platform for any illegal activities; (e) share or distribute challenge solutions or flags outside of authorized channels; (f) engage in cheating, flag sharing, or any form of unfair competition.",
        },
        {
          subtitle: "Challenge Integrity",
          text: "All challenge submissions must be your own work. Collaboration is only permitted when explicitly allowed by the challenge rules. Violations may result in disqualification and account suspension.",
        },
      ],
    },
    {
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Platform Content",
          text: "All content on CTF-Cybercup.ai, including challenges, text, graphics, logos, and software, is the property of CTF-Cybercup.ai or its licensors and is protected by intellectual property laws.",
        },
        {
          subtitle: "User Content",
          text: "By submitting content to the platform (such as challenge solutions or forum posts), you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content in connection with operating the platform.",
        },
        {
          subtitle: "Respect for IP",
          text: "You agree not to reproduce, distribute, or create derivative works from any platform content without explicit permission.",
        },
      ],
    },
    {
      title: "Competitions and Rankings",
      content: [
        {
          subtitle: "Fair Play",
          text: "All participants must compete fairly and ethically. Any attempt to manipulate rankings, exploit platform vulnerabilities for unfair advantage, or engage in unsportsmanlike conduct may result in disqualification.",
        },
        {
          subtitle: "Leaderboard Accuracy",
          text: "We strive to maintain accurate leaderboards, but we reserve the right to adjust rankings if we detect violations or errors.",
        },
        {
          subtitle: "Prizes and Recognition",
          text: "If applicable to specific competitions, prize eligibility and distribution terms will be clearly stated in the competition rules. We reserve the right to withhold prizes in cases of rule violations.",
        },
      ],
    },
    {
      title: "Platform Availability",
      content: [
        {
          text: "We strive to maintain high platform availability, but we do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of the platform at any time, with or without notice. We are not liable for any interruption of service.",
        },
      ],
    },
    {
      title: "Privacy and Data",
      content: [
        {
          text: "Your use of the platform is also governed by our Privacy Policy. By using CTF-Cybercup.ai, you consent to our collection and use of your information as described in the Privacy Policy.",
        },
      ],
    },
    {
      title: "Disclaimers and Limitations",
      content: [
        {
          subtitle: "No Warranty",
          text: "The platform is provided 'as is' and 'as available' without warranties of any kind, either express or implied. We do not warrant that the platform will be error-free or that defects will be corrected.",
        },
        {
          subtitle: "Limitation of Liability",
          text: "To the fullest extent permitted by law, CTF-Cybercup.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the platform.",
        },
        {
          subtitle: "Educational Purpose",
          text: "The challenges and content on this platform are for educational purposes only. You agree not to use any techniques learned on this platform for illegal or unauthorized activities.",
        },
      ],
    },
    {
      title: "Account Termination",
      content: [
        {
          text: "We reserve the right to suspend or terminate your account at any time for violations of these Terms of Service, without prior notice. You may also terminate your account at any time by contacting us or through your account settings.",
        },
      ],
    },
    {
      title: "Governing Law",
      content: [
        {
          text: "These Terms of Service are governed by the laws of the jurisdiction in which CTF-Cybercup.ai operates, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of that jurisdiction.",
        },
      ],
    },
    {
      title: "Changes to Terms",
      content: [
        {
          text: "We reserve the right to modify these Terms of Service at any time. We will notify users of material changes by posting the updated terms on this page and updating the 'Last Updated' date. Your continued use of the platform after such changes constitutes acceptance of the modified terms.",
        },
      ],
    },
    {
      title: "Contact Information",
      content: [
        {
          text: "If you have questions about these Terms of Service, please contact us at legal@ctf-cybercup.ai.",
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Subtle background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-blue-50/50 via-transparent to-blue-100/30" />
      </div>

      {/* Header */}
      <section className="relative px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-medium text-monarch-900 sm:text-sm">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Legal Documents
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Terms of Service
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Last Updated: December 7, 2025
          </p>

          <p className="mx-auto max-w-2xl text-base text-gray-700 sm:text-lg">
            Please read these Terms of Service carefully before using
            CTF-Cybercup.ai. By accessing or using our platform, you agree to be
            bound by these terms.
          </p>
        </div>
      </section>

      {/* Content */}
      <section
        ref={contentRef}
        className="px-4 py-12 opacity-0 translate-y-4 transition-all duration-700 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-r from-monarch-900 to-chesapeake text-white text-sm font-bold">
                    {idx + 1}
                  </span>
                  {section.title}
                </h2>

                <div className="space-y-4">
                  {section.content.map((item, itemIdx) => (
                    <div key={itemIdx}>
                      {item.subtitle && (
                        <h3 className="mb-2 text-lg font-semibold text-gray-800">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-gray-700 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div className="mt-12 rounded-xl border-2 border-red-200 bg-linear-to-br from-red-50 to-red-100/50 p-8">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <svg
                  className="w-8 h-8 text-red-600"
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
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Important Notice
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The skills and techniques you learn on this platform are
                  intended for ethical, educational, and professional purposes
                  only. Unauthorized access to computer systems is illegal.
                  Always obtain proper authorization before testing security on
                  any system you do not own.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 rounded-xl border border-blue-200 bg-linear-to-br from-blue-50 to-blue-100/50 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Questions About These Terms?
            </h2>
            <p className="mb-6 text-gray-700">
              {`If you have any questions or concerns about these Terms of
              Service, please don't hesitate to reach out.`}
            </p>
            <Link
              href="mailto:me.nishpatel.dev"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-monarch-900 to-chesapeake px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Legal Team
            </Link>
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
