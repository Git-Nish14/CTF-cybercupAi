"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { apiRequest } from "../../../lib/api";

export default function AdminProblemsPage() {
  const { user } = useAuth();
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await apiRequest("/api/problems");
        setProblems(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load problems");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleDelete = async (problemId, problemTitle) => {
    if (
      !confirm(
        `Are you sure you want to delete "${problemTitle}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setDeleting(problemId);
      setError("");

      await apiRequest(`/api/problems/${problemId}`, {
        method: "DELETE",
      });

      // Remove the deleted problem from state
      setProblems(problems.filter((p) => p._id !== problemId));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete problem");
    } finally {
      setDeleting(null);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-white to-wisconsin-gray px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-monarch-900 to-hudson shadow-lg">
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

  if (!user.isAdmin) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-white to-wisconsin-gray px-4">
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

  const filteredProblems =
    filter === "all"
      ? problems
      : problems.filter((p) => p.difficulty?.toLowerCase() === filter);

  const getDifficultyColor = (difficulty) => {
    const d = difficulty?.toLowerCase();
    if (d === "easy") return "text-green-600 bg-green-50 border-green-200";
    if (d === "medium") return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (d === "hard") return "text-red-600 bg-red-50 border-red-200";
    return "text-monarch-900/70 bg-wisconsin-gray border-monarch-900/10";
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

  return (
    <div className="w-full bg-linear-to-b from-white via-wisconsin-gray/20 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/admin">
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
            <span className="font-medium">Back to Admin Dashboard</span>
          </button>
        </Link>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-block">
              <span className="text-xs font-semibold uppercase tracking-widest text-hudson">
                Challenge Management
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-monarch-900 sm:text-4xl">
              Manage Problems
            </h1>
            <p className="mt-2 text-monarch-900/70">
              Create, edit, and manage CTF challenges
            </p>
          </div>
          <Link href="/admin/problems/new">
            <button className="group flex items-center gap-2 rounded-full bg-linear-to-r from-monarch-900 to-chesapeake px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Create New Problem</span>
            </button>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-50 p-4">
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

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["all", "easy", "medium", "hard"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === f
                  ? "bg-linear-to-r from-monarch-900 to-chesapeake text-white shadow-md"
                  : "border border-monarch-900/20 bg-white text-monarch-900 hover:border-chesapeake/50 hover:bg-hudson/5"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-hudson/30 border-t-chesapeake"></div>
              <p className="text-monarch-900/70">Loading problems...</p>
            </div>
          </div>
        ) : filteredProblems.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-monarch-900/10 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-hudson/20 to-chesapeake/20">
              <svg
                className="h-8 w-8 text-chesapeake"
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
              No problems found
            </h3>
            <p className="mb-6 text-monarch-900/70">
              {filter === "all"
                ? "Get started by creating your first challenge"
                : `No ${filter} problems available`}
            </p>
            {filter === "all" && (
              <Link href="/admin/problems/new">
                <button className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-monarch-900 to-chesapeake px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105">
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create First Problem
                </button>
              </Link>
            )}
          </div>
        ) : (
          /* Problems Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProblems.map((problem) => (
              <div
                key={problem._id}
                className="group relative overflow-hidden rounded-xl border border-monarch-900/10 bg-white p-6 shadow-sm transition-all hover:border-chesapeake/50 hover:shadow-lg"
              >
                {/* Difficulty Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getDifficultyColor(
                      problem.difficulty
                    )}`}
                  >
                    {getDifficultyIcon(problem.difficulty)}
                    {problem.difficulty || "Unknown"}
                  </span>
                </div>

                {/* Title & Category */}
                <h3 className="mb-2 text-lg font-bold text-monarch-900 transition-colors group-hover:text-chesapeake">
                  {problem.title}
                </h3>
                {/* Description Preview */}
                {problem.description && (
                  <p className="mb-4 line-clamp-2 text-sm text-monarch-900/70">
                    {problem.description}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/problems/${problem._id}/edit`}
                    className="flex-1"
                  >
                    <button className="group/btn flex w-full items-center justify-center gap-2 rounded-full border border-chesapeake/40 bg-white px-4 py-2.5 text-sm font-medium text-chesapeake transition-all hover:border-chesapeake hover:bg-hudson/5">
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(problem._id, problem.title)}
                    disabled={deleting === problem._id}
                    className="flex items-center justify-center rounded-lg border border-monarch-900/10 bg-white p-2.5 text-monarch-900/60 transition-all hover:border-red-500/40 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleting === problem._id ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                    ) : (
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {!loading && problems.length > 0 && (
          <div className="mt-8 rounded-xl border border-monarch-900/10 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-4">
              <div className="text-center">
                <div className="mb-1 text-2xl font-bold text-monarch-900">
                  {problems.length}
                </div>
                <div className="text-sm text-monarch-900/60">
                  Total Problems
                </div>
              </div>
              <div className="text-center rounded-full">
                <div className="mb-1 text-2xl font-bold text-green-600">
                  {
                    problems.filter(
                      (p) => p.difficulty?.toLowerCase() === "easy"
                    ).length
                  }
                </div>
                <div className="text-sm text-monarch-900/60 rounded-full">
                  Easy
                </div>
              </div>
              <div className="text-center rounded-full">
                <div className="mb-1 text-2xl font-bold text-yellow-600">
                  {
                    problems.filter(
                      (p) => p.difficulty?.toLowerCase() === "medium"
                    ).length
                  }
                </div>
                <div className="text-sm text-monarch-900/60 rounded-full">
                  Medium
                </div>
              </div>
              <div className="text-center rounded-full">
                <div className="mb-1 text-2xl font-bold text-red-600">
                  {
                    problems.filter(
                      (p) => p.difficulty?.toLowerCase() === "hard"
                    ).length
                  }
                </div>
                <div className="text-sm text-monarch-900/60 rounded-full">
                  Hard
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
