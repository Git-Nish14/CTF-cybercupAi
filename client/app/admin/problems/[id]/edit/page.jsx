"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../../../context/AuthContext";
import { apiRequest } from "../../../../../lib/api";

export default function EditProblemPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    flagAnswer: "",
    difficulty: "easy",
    category: "",
    points: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadProblem() {
      try {
        setLoading(true);
        const data = await apiRequest(`/api/problems/admin/${params.id}`);
        setForm({
          title: data.title || "",
          description: data.description || "",
          flagAnswer: data.flagAnswer || "",
          difficulty: data.difficulty || "easy",
          category: data.category || "",
          points: data.points || "",
        });
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load problem");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadProblem();
    }
  }, [params.id]);

  if (!user) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-white to-wisconsin-gray px-4">
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
          <p className="text-monarch-900/70">You must be logged in as admin.</p>
        </div>
      </div>
    );
  }

  if (!user.isAdmin) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-white to-wisconsin-gray px-4">
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

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate all required fields
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!form.flagAnswer.trim()) {
      setError("Flag answer is required");
      return;
    }
    if (!form.difficulty) {
      setError("Difficulty is required");
      return;
    }

    setSubmitting(true);

    try {
      await apiRequest(`/api/problems/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      router.push("/admin/problems");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update problem");
      setSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === "easy")
      return "border-green-500 bg-green-50 text-green-700";
    if (difficulty === "medium")
      return "border-yellow-500 bg-yellow-50 text-yellow-700";
    if (difficulty === "hard") return "border-red-500 bg-red-50 text-red-700";
    return "";
  };

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-linear-to-b from-white via-wisconsin-gray/20 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-hudson/30 border-t-chesapeake"></div>
          <p className="text-monarch-900/70">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-linear-to-b from-white via-wisconsin-gray/20 to-white min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/problems"
            className="inline-flex items-center gap-2 text-sm font-medium text-chesapeake hover:text-monarch-900 transition-colors mb-6"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Problems
          </Link>
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-hudson">
              Challenge Editing
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-monarch-900 sm:text-4xl">
            Edit Problem
          </h1>
          <p className="mt-2 text-monarch-900/70">
            Update the CTF challenge details
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-full border border-red-500/20 bg-red-50 px-6 py-4">
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

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="rounded-3xl border border-monarch-900/10 bg-white p-6 shadow-sm">
            {/* Title */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-monarch-900">
                Title
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., SQL Injection Challenge"
                value={form.title}
                onChange={onChange}
                required
                className="w-full rounded-full border border-monarch-900/20 bg-white px-6 py-3 text-monarch-900 placeholder:text-monarch-900/40 focus:border-chesapeake focus:outline-none focus:ring-2 focus:ring-chesapeake/20 transition-all"
              />
            </div>

            {/* Difficulty */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-monarch-900">
                Difficulty
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["easy", "medium", "hard"].map((diff) => (
                  <label
                    key={diff}
                    className={`relative flex cursor-pointer items-center justify-center rounded-full border-2 px-4 py-3 text-sm font-medium transition-all ${
                      form.difficulty === diff
                        ? getDifficultyColor(diff) + " shadow-sm"
                        : "border-monarch-900/20 bg-white text-monarch-900/70 hover:border-chesapeake/30 hover:bg-hudson/5"
                    }`}
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      value={diff}
                      checked={form.difficulty === diff}
                      onChange={onChange}
                      className="sr-only"
                    />
                    <span className="capitalize">{diff}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-monarch-900">
                Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Describe the challenge, provide hints, and any necessary context..."
                value={form.description}
                onChange={onChange}
                required
                rows={6}
                className="w-full rounded-3xl border border-monarch-900/20 bg-white px-6 py-4 text-monarch-900 placeholder:text-monarch-900/40 focus:border-chesapeake focus:outline-none focus:ring-2 focus:ring-chesapeake/20 transition-all resize-y"
              />
            </div>

            {/* Flag Answer */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-monarch-900">
                Flag Answer
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="flagAnswer"
                  placeholder="CTF{example_flag_here}"
                  value={form.flagAnswer}
                  onChange={onChange}
                  required
                  className="w-full rounded-full border border-monarch-900/20 bg-white px-6 py-3 pr-12 text-monarch-900 placeholder:text-monarch-900/40 focus:border-chesapeake focus:outline-none focus:ring-2 focus:ring-chesapeake/20 transition-all font-mono"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
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
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-xs text-monarch-900/60">
                The correct flag that participants must submit to solve this
                challenge
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-full bg-linear-to-r from-monarch-900 to-chesapeake px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Save Changes</span>
                </>
              )}
            </button>
            <Link href="/admin/problems">
              <button
                type="button"
                className="rounded-full border border-monarch-900/20 bg-white px-8 py-3 font-semibold text-monarch-900 transition-all hover:border-chesapeake/50 hover:bg-hudson/5"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
