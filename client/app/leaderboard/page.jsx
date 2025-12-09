"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "../../lib/api";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        setError("");
        const data = await apiRequest("/api/leaderboard");
        setLeaderboard(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 shadow-lg">
          <svg
            className="h-8 w-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-gray-300 to-gray-500 shadow-lg">
          <svg
            className="h-7 w-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-orange-400 to-orange-600 shadow-lg">
          <svg
            className="h-6 w-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      );
    }
    return (
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-monarch-900 to-[#0D6BA8]">
        <span className="text-xl font-bold text-white">#{rank}</span>
      </div>
    );
  };

  const getTopThreeCard = (user, rank) => {
    const colors = {
      1: {
        from: "from-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-700",
      },
      2: {
        from: "from-gray-50",
        border: "border-gray-300",
        text: "text-gray-700",
      },
      3: {
        from: "from-orange-50",
        border: "border-orange-200",
        text: "text-orange-700",
      },
    };
    const color = colors[rank];

    return (
      <div
        key={user._id || user.userId}
        className={`relative overflow-hidden rounded-2xl border-2 ${color.border} bg-linear-to-br ${color.from} to-white p-6 shadow-xl`}
      >
        <div className="absolute right-4 top-4 opacity-10">
          <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div className="relative flex flex-col items-center text-center">
          {getRankBadge(rank)}
          <h3 className="mt-4 text-xl font-bold text-monarch-900">
            {user.name || user.userId?.name || "Anonymous"}
          </h3>
          <p className="mt-1 text-sm text-monarch-900/60">
            {user.email || user.userId?.email || ""}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 w-full">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {user.solvedCount || 0}
              </div>
              <div className="text-xs text-monarch-900/60">Solved</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-monarch-900">
                {user.totalAttempts || 0}
              </div>
              <div className="text-xs text-monarch-900/60">Attempts</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-white via-[#E6EAEE]/20 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[#98C5EA]/30 border-t-[#0D6BA8]"></div>
          <p className="text-monarch-900/70">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const topThree = leaderboard.slice(0, 3);
  const allUsers = leaderboard;

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-white via-[#E6EAEE]/20 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-3 inline-block">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#98C5EA]">
              Competition Rankings
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-monarch-900 sm:text-5xl">
            Leaderboard
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-monarch-900/70">
            Compete with fellow Monarchs and rise to the top. Track your
            progress and see how you rank against the best.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-monarch-900/10 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#98C5EA]/20 to-[#0D6BA8]/20">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="text-2xl font-bold text-monarch-900">
              {leaderboard.length}
            </div>
            <div className="text-sm text-monarch-900/60">
              Active Competitors
            </div>
          </div>

          <div className="rounded-xl border border-monarch-900/10 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-green-100 to-green-200">
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
            <div className="text-2xl font-bold text-monarch-900">
              {topThree[0]?.solvedCount || 0}
            </div>
            <div className="text-sm text-monarch-900/60">Problems Solved</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-50 p-4">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && leaderboard.length === 0 && !error && (
          <div className="rounded-2xl border border-monarch-900/10 bg-white p-12 text-center shadow-sm">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-monarch-900">
              No Rankings Yet
            </h3>
            <p className="mb-6 text-monarch-900/70">
              Be the first to solve challenges and claim the top spot!
            </p>
            <Link href="/problems">
              <button className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-monarch-900 to-[#0D6BA8] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105">
                View Challenges
              </button>
            </Link>
          </div>
        )}

        {/* Top 3 Podium */}
        {topThree.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-monarch-900">
              Top Performers
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {topThree.map((user, idx) => getTopThreeCard(user, idx + 1))}
            </div>
          </div>
        )}

        {/* All Rankings */}
        {allUsers.length > 0 && (
          <div className="rounded-2xl border border-monarch-900/10 bg-white shadow-lg">
            <div className="border-b border-monarch-900/10 px-8 py-6">
              <h2 className="text-2xl font-bold text-monarch-900">
                All Rankings
              </h2>
              <p className="mt-1 text-sm text-monarch-900/70">
                Complete leaderboard standings
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-monarch-900/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-monarch-900">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-monarch-900">
                      Competitor
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-monarch-900">
                      Solved
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-monarch-900">
                      Attempts
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-monarch-900">
                      Accuracy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-monarch-900/10">
                  {allUsers.map((user, idx) => {
                    const rank = idx + 1;
                    const accuracy =
                      user.totalAttempts > 0
                        ? Math.round(
                            (user.solvedCount / user.totalAttempts) * 100
                          )
                        : 0;

                    return (
                      <tr
                        key={user._id || user.userId}
                        className="transition-colors hover:bg-[#98C5EA]/5"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {rank <= 3 ? (
                              getRankBadge(rank)
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-monarch-900 to-[#0D6BA8]">
                                <span className="font-semibold text-white">
                                  {rank}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-monarch-900">
                              {user.name || user.userId?.name || "Anonymous"}
                            </div>
                            <div className="text-sm text-monarch-900/60">
                              {user.email || user.userId?.email || ""}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
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
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {user.solvedCount || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-lg font-semibold text-monarch-900">
                            {user.totalAttempts || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-monarch-900/10">
                              <div
                                className="h-full rounded-full bg-linear-to-r from-monarch-900 to-[#0D6BA8]"
                                style={{ width: `${accuracy}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-monarch-900">
                              {accuracy}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Call to Action */}
        {leaderboard.length > 0 && (
          <div className="mt-12 rounded- border border-monarch-900/10 bg-linear-to-r from-monarch-900 to-[#0D6BA8] p-8 text-center shadow-xl">
            <h3 className="mb-2 text-2xl font-bold text-white!">
              Ready to Compete?
            </h3>
            <p className="mb-6 text-[#98C5EA]">
              Join the challenge and prove your skills. Every problem solved
              brings you closer to the top.
            </p>
            <Link href="/challenges">
              <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-monarch-900 shadow-lg transition-all hover:scale-105">
                View Challenges
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
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
