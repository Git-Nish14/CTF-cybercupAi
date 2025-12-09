"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register, googleLogin, user, loading } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const googleButtonRef = useRef(null);
  const [validation, setValidation] = useState({
    email: { valid: null, message: "" },
    password: { valid: null, message: "" },
    name: { valid: null, message: "" },
  });

  useEffect(() => {
    if (loading) return;
    if (user) {
      if (user.isAdmin) router.replace("/admin");
      else router.replace("/challenges");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!googleButtonRef.current) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (
        !window.google ||
        !window.google.accounts ||
        !window.google.accounts.id
      )
        return;

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            setError("");
            setIsLoading(true);
            const data = await googleLogin(response.credential);
            if (data.isAdmin) router.push("/admin");
            else router.push("/challenges");
          } catch (err) {
            console.error(err);
            setError(err.message || "Google sign up failed");
            setIsLoading(false);
          }
        },
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        width: "100%",
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [googleButtonRef, googleLogin, router]);

  const validateEmail = (email) => {
    if (!email) {
      return { valid: null, message: "" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    return {
      valid: isValid,
      message: isValid
        ? "Valid email format"
        : "Please enter a valid email address",
    };
  };

  const validatePassword = (password) => {
    if (!password) {
      return { valid: null, message: "" };
    }
    const checks = {
      length: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };

    const isValid =
      checks.length && checks.hasUpper && checks.hasLower && checks.hasNumber;

    if (isValid) {
      return { valid: true, message: "Strong password" };
    }

    const messages = [];
    if (!checks.length) messages.push("at least 8 characters");
    if (!checks.hasUpper) messages.push("one uppercase letter");
    if (!checks.hasLower) messages.push("one lowercase letter");
    if (!checks.hasNumber) messages.push("one number");

    return {
      valid: false,
      message: `Password must contain ${messages.join(", ")}`,
    };
  };

  const validateName = (name) => {
    if (!name) {
      return { valid: null, message: "" };
    }
    const isValid = name.trim().length >= 2;
    return {
      valid: isValid,
      message: isValid ? "Valid name" : "Name must be at least 2 characters",
    };
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    // Live validation
    let validationResult;
    if (name === "email") {
      validationResult = validateEmail(value);
    } else if (name === "password") {
      validationResult = validatePassword(value);
    } else if (name === "name") {
      validationResult = validateName(value);
    }

    setValidation((v) => ({
      ...v,
      [name]: validationResult,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Final validation before submit
    const emailValidation = validateEmail(form.email);
    const passwordValidation = validatePassword(form.password);
    const nameValidation = validateName(form.name);

    if (
      !emailValidation.valid ||
      !passwordValidation.valid ||
      !nameValidation.valid
    ) {
      setError("Please fix all validation errors before submitting");
      return;
    }

    setIsLoading(true);
    try {
      const data = await register(form.name, form.email, form.password);
      if (data.isAdmin) router.push("/admin");
      else router.push("/challenges");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
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
        {/* Register Card */}
        <div className="rounded-2xl border border-monarch-900/10 bg-white p-8 shadow-xl backdrop-blur-sm">
          <div className="mb-8">
            <h2 className="mb-2 bg-linear-to-r from-monarch-900 via-chesapeake to-hudson bg-clip-text text-3xl font-bold text-transparent">
              Join the Competition
            </h2>
            <p className="text-monarch-900/70">
              Create your account and start hacking
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
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-monarch-900"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={onChange}
                required
                className={`w-full rounded-lg border bg-white px-4 py-3 text-monarch-900 placeholder-monarch-900/40 transition-all focus:outline-none focus:ring-2 ${
                  validation.name.valid === null
                    ? "border-monarch-900/20 focus:border-chesapeake focus:ring-chesapeake/20"
                    : validation.name.valid
                    ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                    : "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                }`}
              />
              {validation.name.valid !== null && (
                <div className="mt-2 flex items-center gap-2">
                  {validation.name.valid ? (
                    <svg
                      className="h-4 w-4 text-green-600"
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
                  ) : (
                    <svg
                      className="h-4 w-4 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <p
                    className={`text-xs ${
                      validation.name.valid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {validation.name.message}
                  </p>
                </div>
              )}
            </div>

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
                className={`w-full rounded-lg border bg-white px-4 py-3 text-monarch-900 placeholder-monarch-900/40 transition-all focus:outline-none focus:ring-2 ${
                  validation.email.valid === null
                    ? "border-monarch-900/20 focus:border-chesapeake focus:ring-chesapeake/20"
                    : validation.email.valid
                    ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                    : "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                }`}
              />
              {validation.email.valid !== null && (
                <div className="mt-2 flex items-center gap-2">
                  {validation.email.valid ? (
                    <svg
                      className="h-4 w-4 text-green-600"
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
                  ) : (
                    <svg
                      className="h-4 w-4 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <p
                    className={`text-xs ${
                      validation.email.valid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {validation.email.message}
                  </p>
                </div>
              )}
            </div>

            {/* Password Field */}
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
                  className={`w-full rounded-lg border bg-white px-4 py-3 pr-12 text-monarch-900 placeholder-monarch-900/40 transition-all focus:outline-none focus:ring-2 ${
                    validation.password.valid === null
                      ? "border-monarch-900/20 focus:border-chesapeake focus:ring-chesapeake/20"
                      : validation.password.valid
                      ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                      : "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  }`}
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
              {validation.password.valid !== null && (
                <div className="mt-2 flex items-start gap-2">
                  {validation.password.valid ? (
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
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
                  ) : (
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <p
                    className={`text-xs ${
                      validation.password.valid
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {validation.password.message}
                  </p>
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-4 w-4 rounded border-monarch-900/30 text-chesapeake focus:ring-chesapeake/20"
              />
              <label htmlFor="terms" className="text-sm text-monarch-900/70">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-chesapeake transition-colors hover:text-hudson"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-chesapeake transition-colors hover:text-hudson"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={
                isLoading ||
                !validation.email.valid ||
                !validation.password.valid ||
                !validation.name.valid
              }
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
                  <span>Creating account...</span>
                </span>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Create Account
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
          {/* Divider */}
          <div className="mt-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-monarch-900/10" />
            <span className="text-xs uppercase tracking-wide text-monarch-900/40">
              or
            </span>
            <div className="h-px flex-1 bg-monarch-900/10" />
          </div>
          {/* Google Sign Up button */}{" "}
          <div className="mt-4">
            <div ref={googleButtonRef} className="flex justify-center" />
          </div>
          <div className="mt-8 text-center">
            <p className="text-monarch-900/70">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-chesapeake transition-colors hover:text-hudson"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
