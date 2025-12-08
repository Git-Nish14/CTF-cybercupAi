"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../lib/api";

export default function AdminHomePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProblems: 0,
    totalUsers: 0,
    totalAttempts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await apiRequest("/api/stats/overview");
        setStats({
          totalProblems: data.totalProblems || 0,
          totalUsers: data.totalUsers || 0,
          totalAttempts: data.totalAttempts || 0,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    }

    if (user?.isAdmin) {
      loadStats();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-white to-wisconsin-gray">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-monarch-900 to-hudson shadow-lg">
            <svg
              className="h-8 w-8 text-white"
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
          </div>
          <h2 className="text-xl font-semibold text-monarch-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-monarch-900/70">
            You must be logged in as admin to access this area.
          </p>
        </div>
      </div>
    );
  }

  if (!user.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-white to-wisconsin-gray">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-red-600 shadow-lg">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-monarch-900 mb-2">
            Access Denied
          </h2>
          <p className="text-monarch-900/70">
            This area is restricted to administrators only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-wisconsin-gray/30 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex-1">
              <div className="mb-2 inline-block">
                <span className="text-xs font-semibold uppercase tracking-widest text-hudson">
                  Administration Portal
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-monarch-900 sm:text-5xl mb-3">
                CyberCup AI Dashboard
              </h1>
              <p className="text-lg text-monarch-900/70 max-w-2xl">
                Forward-focused control panel for managing problems, monitoring
                users, and tracking competition activity.
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-monarch-900/10 bg-white px-6 py-4 shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-monarch-900 to-hudson text-xl font-bold text-white shadow-md">
                {user.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="leading-tight">
                <p className="max-w-[180px] truncate text-base font-semibold text-monarch-900">
                  {user.name || "Admin"}
                </p>
                <p className="text-xs uppercase tracking-wider text-hudson">
                  Administrator · CyberCup CTF
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Link
                href="/admin/problems"
                className="group relative overflow-hidden rounded-3xl border border-monarch-900/10 bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-linear-to-br from-hudson/20 to-transparent transition-transform group-hover:scale-150" />

                <div className="relative">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-monarch-900 to-chesapeake shadow-md">
                    <svg
                      className="h-7 w-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>

                  <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-hudson">
                    Challenges
                  </span>

                  <h3 className="mb-3 text-2xl font-bold text-monarch-900">
                    Manage Problems
                  </h3>

                  <p className="mb-6 text-sm text-monarch-900/70 leading-relaxed">
                    Create, edit, and retire challenges across all categories.
                    Set difficulty levels and manage flags.
                  </p>

                  <div className="flex items-center text-sm font-medium text-chesapeake group-hover:text-hudson transition-colors">
                    Go to problems
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
              <Link
                href="/admin/users"
                className="group relative overflow-hidden rounded-3xl border border-monarch-900/10 bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-linear-to-br from-aquatic/20 to-transparent transition-transform group-hover:scale-150" />

                <div className="relative">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-chesapeake to-aquatic shadow-md">
                    <svg
                      className="h-7 w-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>

                  <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-aquatic">
                    Players
                  </span>

                  <h3 className="mb-3 text-2xl font-bold text-monarch-900">
                    Users & Attempts
                  </h3>

                  <p className="mb-6 text-sm text-monarch-900/70 leading-relaxed">
                    Inspect solves, review failed attempts, and monitor
                    suspicious activity in real time.
                  </p>

                  <div className="flex items-center text-sm font-medium text-chesapeake group-hover:text-aquatic transition-colors">
                    View users
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
            </div>
            <div className="rounded-3xl border border-monarch-900/10 bg-linear-to-br from-sarah-sand to-community-sand p-8 shadow-md">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-monarch-900">
                Quick Tips
              </h2>
              <ul className="space-y-3 text-sm text-monarch-900/80">
                <li className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-chesapeake"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Keep test flags separate from production flags to maintain
                    security.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-chesapeake"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Rotate challenge secrets between competitive events for
                    integrity.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-chesapeake"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Watch for bursty attempts from single IP ranges—potential
                    automation.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-monarch-900/10 bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-hudson">
                System Snapshot
              </h2>
              <div className="space-y-4">
                <div className="rounded-2xl bg-linear-to-br from-wisconsin-gray to-white p-4 text-center border border-monarch-900/5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-monarch-900/60">
                    Problems
                  </p>
                  {loading ? (
                    <div className="flex justify-center py-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-monarch-900/20 border-t-chesapeake"></div>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold bg-linear-to-r from-monarch-900 to-chesapeake bg-clip-text text-transparent">
                      {stats.totalProblems}
                    </p>
                  )}
                </div>
                <div className="rounded-2xl bg-linear-to-br from-wisconsin-gray to-white p-4 text-center border border-monarch-900/5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-monarch-900/60">
                    Users
                  </p>
                  {loading ? (
                    <div className="flex justify-center py-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-chesapeake/20 border-t-hudson"></div>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold bg-linear-to-r from-chesapeake to-hudson bg-clip-text text-transparent">
                      {stats.totalUsers - 1}
                    </p>
                  )}
                </div>
                <div className="rounded-2xl bg-linear-to-br from-wisconsin-gray to-white p-4 text-center border border-monarch-900/5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-monarch-900/60">
                    Attempts
                  </p>
                  {loading ? (
                    <div className="flex justify-center py-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-aquatic/20 border-t-coastal"></div>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold bg-linear-to-r from-aquatic to-coastal bg-clip-text text-transparent">
                      {stats.totalAttempts}
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-4 text-xs text-monarch-900/60 leading-relaxed">
                Live statistics updated from your backend API. Refresh the page
                to see the latest data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
