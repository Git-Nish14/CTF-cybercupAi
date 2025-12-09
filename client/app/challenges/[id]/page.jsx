"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { apiRequest } from "../../../lib/api";

export default function ChallengeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const successTimeoutRef = useRef(null);

  const [challenge, setChallenge] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [attemptError, setAttemptError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingAttempt, setLoadingAttempt] = useState(false);
  const [hasCompletedChallenge, setHasCompletedChallenge] = useState(false);

  // Load challenge info
  useEffect(() => {
    async function loadChallenge() {
      try {
        const data = await apiRequest(`/api/problems/${id}`);
        setChallenge(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load challenge");
      }
    }
    if (id) loadChallenge();
  }, [id]);

  useEffect(() => {
    if (successMessage) {
      const handleDismiss = () => {
        setSuccessMessage("");
        if (successTimeoutRef.current) {
          clearTimeout(successTimeoutRef.current);
        }
      };

      window.addEventListener("click", handleDismiss);
      window.addEventListener("scroll", handleDismiss);

      return () => {
        window.removeEventListener("click", handleDismiss);
        window.removeEventListener("scroll", handleDismiss);
      };
    }
  }, [successMessage]);

  // Load attempts for current user
  const loadAttempts = async () => {
    if (!user) return;
    try {
      const data = await apiRequest(`/api/attempts/mine/${id}`);
      setAttempts(data);

      // Check if user has already completed this challenge
      const hasCorrect = data.some((a) => a.result === "correct");
      setHasCompletedChallenge(hasCorrect);
    } catch (err) {
      console.error(err);
      setAttemptError(err.message || "Failed to load attempts");
    }
  };

  useEffect(() => {
    if (id && user) {
      loadAttempts();
    } else {
      setAttempts([]);
      setHasCompletedChallenge(false);
    }
  }, [id, user]);

  const onSubmitFlag = async (e) => {
    e.preventDefault();

    if (!answer.trim()) {
      setAttemptError("Flag cannot be empty.");
      return;
    }

    if (!user) {
      setAttemptError("You must be logged in to submit a flag.");
      return;
    }

    if (hasCompletedChallenge) {
      setAttemptError("You have already completed this challenge!");
      return;
    }

    setAttemptError("");
    setSuccessMessage("");
    setLoadingAttempt(true);

    try {
      const result = await apiRequest(`/api/attempts/${id}`, {
        method: "POST",
        body: JSON.stringify({ answers: [answer] }),
      });
      setAnswer("");
      setSuccessMessage(result.message || "Attempt submitted successfully!");

      // Clear any existing timeout
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }

      // Set new timeout to clear message after 10 seconds
      successTimeoutRef.current = setTimeout(() => {
        setSuccessMessage("");
      }, 10000);

      await loadAttempts();
    } catch (err) {
      console.error(err);
      setAttemptError(err.message || "Failed to submit attempt");
    } finally {
      setLoadingAttempt(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const d = difficulty?.toLowerCase();
    if (d === "easy") return "text-green-600 bg-green-50 border-green-200";
    if (d === "medium") return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (d === "hard") return "text-red-600 bg-red-50 border-red-200";
    return "text-monarch bg-[#E6EAEE] border-monarch/10";
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

  if (error && !challenge) {
    return (
      <div className="min-h-screen bg-linear-to-b from-white via-[#E6EAEE]/20 to-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="rounded-xl border border-red-500/20 bg-red-50 p-6">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-6 w-6 shrink-0 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-red-800">
                  Error Loading Challenge
                </h3>
                <p className="mt-1 text-sm text-red-600">{error}</p>
                <button
                  onClick={() => router.push("/challenges")}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Back to Challenges
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-white via-[#E6EAEE]/20 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[#98C5EA]/30 border-t-[#0D6BA8]"></div>
          <p className="text-monarch/70">Loading challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-[#E6EAEE]/20 to-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/challenges")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-monarch/70 transition-colors hover:text-[#0D6BA8]"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Challenges
        </button>

        {/* Challenge Header */}
        <div className="mb-8 rounded-2xl border border-monarch/10 bg-white p-8 shadow-lg">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${getDifficultyColor(
                challenge.difficulty
              )}`}
            >
              {getDifficultyIcon(challenge.difficulty)}
              {challenge.difficulty || "Unknown"}
            </span>
            {challenge.points && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0D6BA8]/20 bg-[#0D6BA8]/10 px-3 py-1.5 text-sm font-semibold text-[#0D6BA8]">
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
                {challenge.points} pts
              </span>
            )}
            {challenge.category && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-monarch/10 bg-monarch/5 px-3 py-1.5 text-sm font-medium text-monarch">
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
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                {challenge.category}
              </span>
            )}
          </div>

          <h1 className="mb-4 text-3xl font-bold text-monarch sm:text-4xl">
            {challenge.title}
          </h1>

          <p className="text-lg leading-relaxed text-monarch/70">
            {challenge.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Submit Flag Section */}
            <div className="mb-8 rounded-2xl border border-monarch/10 bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#98C5EA]/20 to-[#0D6BA8]/20">
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
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-monarch">Submit Flag</h2>
              </div>

              {!user ? (
                <div className="rounded-xl border border-[#0D6BA8]/20 bg-[#98C5EA]/5 p-6">
                  <div className="mb-4 flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#0D6BA8]"
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
                    <div>
                      <h3 className="font-semibold text-monarch">
                        Login Required
                      </h3>
                      <p className="mt-1 text-sm text-monarch/70">
                        Please login to attempt this challenge and track your
                        progress.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push("/login")}
                    className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-monarch to-[#0D6BA8] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105"
                  >
                    Go to Login
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
                </div>
              ) : (
                <>
                  {hasCompletedChallenge && (
                    <div className="mb-4 flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-50 p-4">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold text-green-700">
                          Challenge Completed!
                        </p>
                        <p className="text-sm text-green-600">
                          You have already solved this challenge.
                        </p>
                      </div>
                    </div>
                  )}

                  {attemptError && (
                    <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-50 p-4">
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
                      <p className="text-sm text-red-600">{attemptError}</p>
                    </div>
                  )}

                  {successMessage && (
                    <div className="mb-4 flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-50 p-4">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-green-600">{successMessage}</p>
                    </div>
                  )}

                  <form onSubmit={onSubmitFlag} className="space-y-4">
                    <div>
                      <label
                        htmlFor="flag"
                        className="mb-2 block text-sm font-medium text-monarch"
                      >
                        Flag
                      </label>
                      <input
                        id="flag"
                        type="text"
                        placeholder="flag{enter_your_flag_here}"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        disabled={loadingAttempt || hasCompletedChallenge}
                        className="w-full rounded-lg border border-monarch/20 bg-white px-4 py-3 text-monarch placeholder-monarch/40 transition-all focus:border-[#0D6BA8] focus:outline-none focus:ring-2 focus:ring-[#0D6BA8]/20 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loadingAttempt || hasCompletedChallenge}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-monarch to-[#0D6BA8] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {loadingAttempt ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Flag
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
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Attempts History */}
            <div className="rounded-2xl border border-monarch/10 bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#98C5EA]/20 to-[#0D6BA8]/20">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-monarch">
                  Your Attempts
                </h2>
              </div>

              {!user ? (
                <div className="rounded-xl border border-monarch/10 bg-monarch/5 p-6 text-center">
                  <svg
                    className="mx-auto mb-3 h-12 w-12 text-monarch/40"
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
                  <p className="text-monarch/70">Login to see your attempts.</p>
                </div>
              ) : attempts.length === 0 ? (
                <div className="rounded-xl border border-monarch/10 bg-monarch/5 p-6 text-center">
                  <svg
                    className="mx-auto mb-3 h-12 w-12 text-monarch/40"
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
                  <p className="text-monarch/70">
                    No attempts yet. Be the first to try!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {attempts.map((a) => (
                    <div
                      key={a._id}
                      className="rounded-lg border border-monarch/10 bg-monarch/5 p-4 transition-all hover:border-[#0D6BA8]/30 hover:bg-[#98C5EA]/5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {a.result === "correct" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                              <svg
                                className="h-3 w-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Correct
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
                              <svg
                                className="h-3 w-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Incorrect
                            </span>
                          )}
                          <span className="text-sm text-monarch/60">
                            {new Date(a.createdAt).toLocaleString()}
                          </span>
                        </div>
                        {a.answers && a.answers.length > 0 && (
                          <code className="rounded bg-monarch/10 px-2 py-1 text-xs font-mono text-monarch">
                            {a.answers.join(", ")}
                          </code>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-monarch/10 bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-bold text-monarch">
                Challenge Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-monarch/70">Difficulty</span>
                  <span
                    className={`text-sm font-semibold ${
                      challenge.difficulty?.toLowerCase() === "easy"
                        ? "text-green-600"
                        : challenge.difficulty?.toLowerCase() === "medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {challenge.difficulty || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-monarch/70">Points</span>
                  <span className="text-sm font-semibold text-[#0D6BA8]">
                    {challenge.points || "N/A"}
                  </span>
                </div>
                {challenge.category && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-monarch/70">Category</span>
                    <span className="text-sm font-semibold text-monarch">
                      {challenge.category}
                    </span>
                  </div>
                )}
                {user && attempts.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-monarch/70">
                      Your Attempts
                    </span>
                    <span className="text-sm font-semibold text-monarch">
                      {attempts.length}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-monarch/10">
                <button
                  onClick={() => router.push("/leaderboard")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#0D6BA8]/20 bg-[#0D6BA8]/5 px-4 py-2.5 text-sm font-medium text-[#0D6BA8] transition-all hover:bg-[#0D6BA8]/10"
                >
                  View Leaderboard
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
