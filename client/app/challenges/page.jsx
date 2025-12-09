"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../lib/api";

export default function ChallengesPage() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await apiRequest("/api/problems");
        setChallenges(data);

        // If user is logged in, fetch their solved problems
        if (user) {
          try {
            const response = await apiRequest("/api/attempts/mine/solved");
            const solvedIds = new Set(
              (response.solvedProblemIds || []).map((id) => String(id))
            );
            setSolvedProblems(solvedIds);
          } catch (err) {
            console.error("Failed to load user solves:", err);
          }
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load challenges");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  const handleChallengeClick = async (e, challengeId) => {
    // Check if already solved before navigation
    if (user && solvedProblems.has(challengeId)) {
      e.preventDefault();
      const confirmed = window.confirm(
        "You have already solved this problem. No more attempts allowed.\n\nDo you want to view the challenge details?"
      );
      if (confirmed) {
        window.location.href = `/challenges/${challengeId}`;
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    const d = difficulty?.toLowerCase();
    if (d === "easy") return "text-green-600 bg-green-50 border-green-200";
    if (d === "medium") return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (d === "hard") return "text-red-600 bg-red-50 border-red-200";
    return "text-monarch-900/70 bg-[#E6EAEE] border-monarch-900/10";
  };

  const getDifficultyIcon = (difficulty) => {
    const d = difficulty?.toLowerCase();
    if (d === "easy") {
      return (
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
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      );
    }
    if (d === "medium") {
      return (
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      );
    }
    if (d === "hard") {
      return (
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
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
        </svg>
      );
    }
    return null;
  };

  const filteredChallenges = challenges
    .filter((c) => {
      if (filter === "all") return true;
      return c.difficulty?.toLowerCase() === filter;
    })
    .filter((c) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        c.title?.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query) ||
        c.category?.toLowerCase().includes(query)
      );
    });

  const easyCount = challenges.filter(
    (c) => c.difficulty?.toLowerCase() === "easy"
  ).length;
  const mediumCount = challenges.filter(
    (c) => c.difficulty?.toLowerCase() === "medium"
  ).length;
  const hardCount = challenges.filter(
    (c) => c.difficulty?.toLowerCase() === "hard"
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-white via-[#E6EAEE]/20 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[#98C5EA]/30 border-t-[#0D6BA8]"></div>
          <p className="text-monarch-900/70">Loading challenges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-white via-[#E6EAEE]/20 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-3 inline-block">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#98C5EA]">
              CTF Competition
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-monarch-900 sm:text-5xl">
            Challenges
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-monarch-900/70">
            Test your skills and solve cybersecurity challenges. From beginner
            to expert, find your next breakthrough.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mb-12 grid gap-6 sm:grid-cols-4">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="text-2xl font-bold text-monarch-900">
              {challenges.length}
            </div>
            <div className="text-sm text-monarch-900/60">Total Challenges</div>
          </div>

          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="text-2xl font-bold text-green-700">{easyCount}</div>
            <div className="text-sm text-green-600">Easy</div>
          </div>

          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
              <svg
                className="h-6 w-6 text-yellow-600"
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
            </div>
            <div className="text-2xl font-bold text-yellow-700">
              {mediumCount}
            </div>
            <div className="text-sm text-yellow-600">Medium</div>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
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
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
            </div>
            <div className="text-2xl font-bold text-red-700">{hardCount}</div>
            <div className="text-sm text-red-600">Hard</div>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-monarch-900/40"
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
            </div>
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-monarch-900/20 bg-white py-2.5 pl-10 pr-4 text-monarch-900 placeholder-monarch-900/40 transition-all focus:border-[#0D6BA8] focus:outline-none focus:ring-2 focus:ring-[#0D6BA8]/20"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {["all", "easy", "medium", "hard"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-linear-to-r from-monarch-900 to-[#0D6BA8] text-white shadow-md"
                    : "border border-monarch-900/20 bg-white text-monarch-900 hover:border-[#0D6BA8]/50 hover:bg-[#98C5EA]/5"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
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
        {!loading && filteredChallenges.length === 0 && !error && (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-monarch-900">
              No Challenges Found
            </h3>
            <p className="text-monarch-900/70">
              {searchQuery
                ? "Try adjusting your search query"
                : filter === "all"
                ? "No challenges available yet"
                : `No ${filter} challenges available`}
            </p>
          </div>
        )}

        {/* Challenges Grid */}
        {filteredChallenges.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredChallenges.map((challenge) => {
              const isSolved = solvedProblems.has(String(challenge._id));

              return (
                <div
                  key={challenge._id}
                  onClick={(e) => handleChallengeClick(e, challenge._id)}
                  className="cursor-pointer"
                >
                  <Link href={`/challenges/${challenge._id}`}>
                    <div className="group relative h-full overflow-hidden rounded-xl border border-monarch-900/10 bg-white p-6 shadow-sm transition-all hover:border-[#0D6BA8]/50 hover:shadow-xl hover:-translate-y-1">
                      {/* Completed Badge - Top Right Corner */}
                      {user && isSolved && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-green-500 to-emerald-600 px-3 py-1.5 shadow-lg">
                            <svg
                              className="h-4 w-4 text-white"
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
                            <span className="text-xs font-bold text-white">
                              COMPLETED
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      <div className="mb-4 flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getDifficultyColor(
                            challenge.difficulty
                          )}`}
                        >
                          {getDifficultyIcon(challenge.difficulty)}
                          {challenge.difficulty || "Unknown"}
                        </span>
                        {challenge.points && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-[#0D6BA8]/20 bg-[#0D6BA8]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0D6BA8]">
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
                            {challenge.points} pts
                          </span>
                        )}
                      </div>

                      <h3 className="mb-3 text-xl font-bold text-monarch-900 transition-colors group-hover:text-[#0D6BA8]">
                        {challenge.title}
                      </h3>

                      {challenge.description && (
                        <p className="mb-4 line-clamp-3 text-sm text-monarch-900/70">
                          {challenge.description}
                        </p>
                      )}

                      {challenge.category && (
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1.5 rounded-md border border-monarch-900/10 bg-monarch-900/5 px-2.5 py-1 text-xs font-medium text-monarch-900">
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
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                              />
                            </svg>
                            {challenge.category}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-[#0D6BA8] font-medium text-sm">
                        <span>
                          {isSolved ? "View Challenge" : "Start Challenge"}
                        </span>
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

                      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#98C5EA]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {filteredChallenges.length > 0 && (
          <div className="mt-12 rounded-2xl border border-monarch-900/10 bg-linear-to-r from-monarch-900 to-[#0D6BA8] p-8 text-center shadow-xl">
            <h3 className="mb-2 text-2xl font-bold text-white!">
              View Your Progress
            </h3>
            <p className="mb-6 text-[#98C5EA]">
              Check the leaderboard to see how you rank against other
              competitors.
            </p>
            <Link href="/leaderboard">
              <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-monarch-900 shadow-lg transition-all hover:scale-105">
                View Leaderboard
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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
