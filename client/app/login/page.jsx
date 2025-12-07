"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, loading } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (user) {
      if (user.isAdmin) {
        router.replace("/admin");
      } else {
        router.replace("/challenges");
      }
    }
  }, [user, loading, router]);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const data = await login(form.email, form.password);

      if (data.isAdmin) router.push("/admin");
      else router.push("/challenges");
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
      setIsLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-hudson/30 border-t-chesapeake"></div>
          <p className="text-lg text-monarch-900">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-linear-to-b from-white via-wisconsin-gray/20 to-white px-4 py-12 sm:px-6 lg:px-8">
      {/* Subtle background effects */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-hudson/5 via-transparent to-chesapeake/5"></div>
        <div className="absolute left-1/3 top-1/4 h-96 w-96 animate-pulse rounded-full bg-chesapeake/10 blur-3xl"></div>
        <div
          className="absolute bottom-1/4 right-1/3 h-96 w-96 animate-pulse rounded-full bg-hudson/10 blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Login Card */}
        <div className="rounded-2xl border border-monarch-900/10 bg-white p-8 shadow-xl backdrop-blur-sm">
          <div className="mb-8">
            <h2 className="mb-2 bg-linear-to-r from-monarch-900 via-chesapeake to-hudson bg-clip-text text-3xl font-bold text-transparent">
              Welcome Back
            </h2>
            <p className="text-monarch-900/70">
              Login to continue your hacking journey
            </p>
          </div>

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

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-monarch-900"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="hacker@cybercup.ai"
                value={form.email}
                onChange={onChange}
                required
                className="w-full rounded-lg border border-monarch-900/20 bg-white px-4 py-3 text-monarch-900 placeholder-monarch-900/40 transition-all focus:border-chesapeake focus:outline-none focus:ring-2 focus:ring-chesapeake/20"
              />
            </div>

            {/* Password Field with Eye Toggle */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-monarch-900"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-monarch-900/20 bg-white px-4 py-3 pr-12 text-monarch-900 placeholder-monarch-900/40 transition-all focus:border-chesapeake focus:outline-none focus:ring-2 focus:ring-chesapeake/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-monarch-900/60 transition-colors hover:bg-hudson/10 hover:text-chesapeake"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-full bg-linear-to-r from-monarch-900 to-chesapeake py-3.5 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-linear-to-r from-chesapeake to-hudson opacity-0 transition-opacity group-hover:opacity-100" />
              {isLoading ? (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Logging in...</span>
                </span>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Login
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
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-monarch-900/70">
              {"Don't have an account? "}
              <Link
                href="/register"
                className="font-semibold text-chesapeake transition-colors hover:text-hudson"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-monarch-900/60">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Secure login with encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
