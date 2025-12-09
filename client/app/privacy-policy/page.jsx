"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function PrivacyPage() {
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
      title: "Information We Collect",
      content: [
        {
          subtitle: "Account Information",
          text: "When you create an account, we collect your username, email address, and password. This information is necessary to provide you with access to our platform and personalize your experience.",
        },
        {
          subtitle: "Competition Data",
          text: "We collect information about your participation in challenges, including submissions, scores, timestamps, and challenge completions. This data is used to track your progress and maintain leaderboards.",
        },
        {
          subtitle: "Technical Information",
          text: "We automatically collect certain information about your device and how you interact with our platform, including IP address, browser type, operating system, and usage patterns.",
        },
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Platform Operations",
          text: "We use your information to operate, maintain, and improve the CTF-Cybercup.ai platform, including processing your challenge submissions and maintaining accurate leaderboards.",
        },
        {
          subtitle: "Communication",
          text: "We may send you emails about platform updates, new challenges, competitions, and security notifications. You can opt out of promotional emails at any time.",
        },
        {
          subtitle: "Security and Integrity",
          text: "We use your information to detect and prevent fraud, abuse, and security incidents, and to maintain the integrity of our competitions.",
        },
      ],
    },
    {
      title: "Information Sharing",
      content: [
        {
          subtitle: "Public Information",
          text: "Your username, challenge completions, and leaderboard rankings may be publicly visible to other platform users. You can adjust your privacy settings to control what information is displayed.",
        },
        {
          subtitle: "Service Providers",
          text: "We may share your information with trusted third-party service providers who assist us in operating our platform, conducting our business, or serving our users.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law or in response to valid requests by public authorities.",
        },
      ],
    },
    {
      title: "Data Security",
      content: [
        {
          text: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
        },
      ],
    },
    {
      title: "Your Rights",
      content: [
        {
          subtitle: "Access and Correction",
          text: "You have the right to access, update, or correct your personal information at any time through your account settings.",
        },
        {
          subtitle: "Data Deletion",
          text: "You may request deletion of your account and associated data by contacting us. Note that some information may be retained for legal or legitimate business purposes.",
        },
        {
          subtitle: "Opt-Out",
          text: "You can opt out of promotional communications by following the unsubscribe instructions in any email we send you.",
        },
      ],
    },
    {
      title: "Cookies and Tracking",
      content: [
        {
          text: "We use cookies and similar tracking technologies to enhance your experience, analyze platform usage, and improve our services. You can control cookies through your browser settings, though this may affect platform functionality.",
        },
      ],
    },
    {
      title: "Children's Privacy",
      content: [
        {
          text: "Our platform is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.",
        },
      ],
    },
    {
      title: "Changes to This Policy",
      content: [
        {
          text: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the 'Last Updated' date. Your continued use of the platform after such changes constitutes your acceptance of the updated policy.",
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Legal Documents
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Privacy Policy
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Last Updated: December 7, 2025
          </p>

          <p className="mx-auto max-w-2xl text-base text-gray-700 sm:text-lg">
            At CTF-Cybercup.ai, we take your privacy seriously. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you use our platform.
          </p>
        </div>
      </section>

      {/* Content */}
      <section
        ref={contentRef}
        className="px-4 py-12 lg:py-8  translate-y-4 transition-all duration-700 sm:px-6 lg:px-8"
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

          {/* Contact Section */}
          <div className="mt-12 rounded-xl border border-blue-200 bg-linear-to-br from-blue-50 to-blue-100/50 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Questions About Your Privacy?
            </h2>
            <p className="mb-6 text-gray-700">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us.
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
              Contact Privacy Team
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
