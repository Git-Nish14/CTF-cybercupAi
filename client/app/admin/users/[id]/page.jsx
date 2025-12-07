"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import { apiRequest } from "../../../../lib/api";

export default function AdminUserDetailPage() {
  const params = useParams();
  const userId = params?.id;

  const { user: currentUser, loading } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [error, setError] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    if (loading) return;
    if (!currentUser || !currentUser.isAdmin) return;

    async function loadData() {
      try {
        setDataLoading(true);
        const [u, a] = await Promise.all([
          apiRequest(`/api/users/${userId}`),
          apiRequest(`/api/users/${userId}/attempts`),
        ]);
        setUserInfo(u);
        setAttempts(a);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load user data");
      } finally {
        setDataLoading(false);
      }
    }

    loadData();
  }, [userId, currentUser, loading]);

  if (loading && !currentUser) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-white to-[#E6EAEE] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#98C5EA]/30 border-t-[#0D6BA8]"></div>
          <p className="text-monarch-900/70">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-white to-[#E6EAEE] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-monarch-900 to-[#0D6BA8] shadow-lg">
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
          <p className="text-monarch-900/70">You must be logged in as admin.</p>
        </div>
      </div>
    );
  }

  if (!currentUser.isAdmin) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-white to-[#E6EAEE] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-red-500 to-red-600 shadow-lg">
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

  if (error) {
    return (
      <div className="w-full bg-linear-to-b from-white to-[#E6EAEE]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-500/20 bg-red-50 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-red-500 to-red-600 shadow-lg">
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              Error Loading User
            </h2>
            <p className="text-red-700 mb-6">{error}</p>
            <Link href="/admin/users">
              <button className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-monarch-900 to-[#0D6BA8] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105">
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Users
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (dataLoading || !userInfo) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-white to-[#E6EAEE] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#98C5EA]/30 border-t-[#0D6BA8]"></div>
          <p className="text-monarch-900/70">Loading user data...</p>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (difficulty) => {
    const d = difficulty?.toLowerCase();
    if (d === "easy") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-600">
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          Easy
        </span>
      );
    }
    if (d === "medium") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-600">
          <svg
            className="h-3 w-3"
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
          Medium
        </span>
      );
    }
    if (d === "hard") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600">
          <svg
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
          </svg>
          Hard
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full border border-[#828A8F]/20 bg-[#828A8F]/10 px-2.5 py-0.5 text-xs font-medium text-[#828A8F]">
        Unknown
      </span>
    );
  };

  const getResultBadge = (result) => {
    const r = result?.toLowerCase();
    if (r === "correct") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          <svg
            className="h-3.5 w-3.5"
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
          CORRECT
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        INCORRECT
      </span>
    );
  };

  const successfulAttempts = attempts.filter(
    (a) => a.result?.toLowerCase() === "pass"
  ).length;
  const failedAttempts = attempts.filter(
    (a) => a.result?.toLowerCase() === "fail"
  ).length;

  return (
    <div className="w-full bg-linear-to-b from-white via-[#E6EAEE]/20 to-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/admin/users">
            <button className="inline-flex items-center gap-2 text-[#0D6BA8] transition-colors hover:text-monarch-900">
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="font-medium">Back to Users</span>
            </button>
          </Link>
        </div>

        {/* User Profile Card */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-monarch-900/10 bg-white shadow-lg">
          <div className="bg-white px-6 py-4">
            <div className="flex items-center gap-6">
              <h2 className="mb-0 text-3xl font-bold text-monarch-900">
                {userInfo.name}
              </h2>
            </div>
          </div>

          <div className="grid gap-6 p-8 sm:grid-cols-2">
            <div>
              <div className="mb-1 text-sm font-medium text-monarch-900/60">
                Email Address
              </div>
              <div className="flex items-center gap-2 text-monarch-900">
                <svg
                  className="h-5 w-5 text-[#0D6BA8]"
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
                <span className="font-medium">{userInfo.email}</span>
              </div>
            </div>

            <div>
              <div className="mb-1 text-sm font-medium text-monarch-900/60">
                Member Since
              </div>
              <div className="flex items-center gap-2 text-monarch-900">
                <svg
                  className="h-5 w-5 text-[#0D6BA8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">
                  {new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-monarch-900/10 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#98C5EA]/20 to-[#0D6BA8]/20">
                <svg
                  className="h-6 w-6 text-[#0D6BA8]"
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
              <div>
                <div className="text-2xl font-bold text-monarch-900">
                  {attempts.length}
                </div>
                <div className="text-sm text-monarch-900/60">
                  Total Attempts
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
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
              </div>
              <div>
                <div className="text-2xl font-bold text-green-700">
                  {successfulAttempts}
                </div>
                <div className="text-sm text-green-600">Successful</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-700">
                  {failedAttempts}
                </div>
                <div className="text-sm text-red-600">Failed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Attempts Section */}
        <div className="rounded-2xl border border-monarch-900/10 bg-white shadow-lg">
          <div className="border-b border-monarch-900/10 px-8 py-6">
            <h2 className="text-2xl font-bold text-monarch-900">
              Problem Attempts
            </h2>
            <p className="mt-1 text-sm text-monarch-900/70">
              Complete history of challenge submissions
            </p>
          </div>

          {attempts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#98C5EA]/20 to-[#0D6BA8]/20">
                <svg
                  className="h-8 w-8 text-[#0D6BA8]"
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
              <h3 className="mb-2 text-lg font-semibold text-monarch-900">
                No Attempts Yet
              </h3>
              <p className="text-monarch-900/70">{`This user hasn't attempted any problems.`}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-monarch-900/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-monarch-900">
                      Problem
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-monarch-900">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-monarch-900">
                      Result
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-monarch-900">
                      Submitted Answers
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-monarch-900">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-monarch-900/10">
                  {attempts.map((a) => (
                    <tr
                      key={a._id}
                      className="transition-colors hover:bg-[#98C5EA]/5"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-monarch-900">
                          {a.problemId?.title || (
                            <span className="italic text-monarch-900/50">
                              Deleted problem
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {getDifficultyBadge(a.problemId?.difficulty)}
                      </td>
                      <td className="px-6 py-4">{getResultBadge(a.result)}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {a.answers && a.answers.length > 0 ? (
                            a.answers.map((answer, idx) => (
                              <span
                                key={idx}
                                className="inline-block rounded-md border border-monarch-900/20 bg-monarch-900/5 px-2 py-0.5 text-xs font-mono text-monarch-900"
                              >
                                {answer}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm italic text-monarch-900/50">
                              No answers
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-monarch-900/70">
                        {new Date(a.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
