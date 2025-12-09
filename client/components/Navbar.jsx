"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Error logging out");
    }
  };

  const isActive = (href) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 border-b border-monarch-900/10 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-monarch-900 via-chesapeake to-hudson shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
            <span className="text-lg font-bold text-white">C</span>
            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-hudson/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="hidden sm:block">
            <span className="block text-lg font-semibold bg-linear-to-r from-monarch-900 to-chesapeake bg-clip-text text-transparent">
              CTF-Cybercup.ai
            </span>
            <span className="block text-[10px] uppercase tracking-wider text-silver">
              Forward-Focused
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {(!user || !user.isAdmin) && (
            <Link
              href="/challenges"
              className={`group relative px-4 py-2 text-sm font-medium transition-all ${
                isActive("/challenges")
                  ? "text-monarch-900"
                  : "text-monarch-900/70 hover:text-monarch-900"
              }`}
            >
              <span className="relative z-10">Challenges</span>
              {isActive("/challenges") && (
                <div className="absolute inset-0 rounded-lg bg-hudson/10 border border-hudson/30" />
              )}
              {!isActive("/challenges") && (
                <div className="absolute inset-0 rounded-lg bg-monarch-900/5 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </Link>
          )}

          {user?.isAdmin && (
            <Link
              href="/admin"
              className={`group relative px-4 py-2 text-sm font-medium transition-all ${
                isActive("/admin")
                  ? "text-monarch-900"
                  : "text-monarch-900/70 hover:text-monarch-900"
              }`}
            >
              <span className="relative z-10">Admin Panel</span>
              {isActive("/admin") && (
                <div className="absolute inset-0 rounded-lg bg-hudson/10 border border-hudson/30" />
              )}
              {!isActive("/admin") && (
                <div className="absolute inset-0 rounded-lg bg-monarch-900/5 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </Link>
          )}

          <Link
            href="/leaderboard"
            className={`group relative px-4 py-2 text-sm font-medium transition-all ${
              isActive("/leaderboard")
                ? "text-monarch-900"
                : "text-monarch-900/70 hover:text-monarch-900"
            }`}
          >
            <span className="relative z-10">Leaderboard</span>
            {isActive("/leaderboard") && (
              <div className="absolute inset-0 rounded-lg bg-hudson/10 border border-hudson/30" />
            )}
            {!isActive("/leaderboard") && (
              <div className="absolute inset-0 rounded-lg bg-monarch-900/5 opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </Link>
        </div>

        {/* Desktop User Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-3 rounded-xl border border-monarch-900/10 bg-wisconsin-gray px-4 py-2 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-monarch-900 to-hudson text-sm font-bold text-white shadow-md">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex flex-col">
                  <span className="max-w-[150px] truncate text-sm font-medium text-monarch-900">
                    {user.name}
                  </span>
                  {user.isAdmin && (
                    <span className="text-[10px] uppercase tracking-wider text-hudson">
                      Administrator
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full border border-red-500/20 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition-all hover:bg-red-100 hover:border-red-500/30 hover:shadow"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-full text-sm font-medium text-monarch-900 transition-colors hover:text-chesapeake"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="group relative overflow-hidden rounded-full bg-linear-to-r from-monarch-900 to-chesapeake px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-105"
              >
                <span className="relative z-10">Register</span>
                <div className="absolute inset-0 bg-linear-to-r from-chesapeake to-hudson opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-lg p-2 text-monarch-900 transition-colors hover:bg-wisconsin-gray md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="animate-slide-down border-t border-monarch-900/10 bg-white px-4 pb-4 pt-3 shadow-lg md:hidden">
          {(!user || !user.isAdmin) && (
            <Link
              href="/challenges"
              className={`mb-2 block rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                isActive("/challenges")
                  ? "bg-hudson/10 border border-hudson/30 text-monarch-900"
                  : "text-monarch-900/70 hover:bg-wisconsin-gray hover:text-monarch-900"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Challenges
            </Link>
          )}

          {user?.isAdmin && (
            <Link
              href="/admin"
              className={`mb-2 block rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                isActive("/admin")
                  ? "bg-hudson/10 border border-hudson/30 text-monarch-900"
                  : "text-monarch-900/70 hover:bg-wisconsin-gray hover:text-monarch-900"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}

          <Link
            href="/leaderboard"
            className={`mb-3 block rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              isActive("/leaderboard")
                ? "bg-hudson/10 border border-hudson/30 text-monarch-900"
                : "text-monarch-900/70 hover:bg-wisconsin-gray hover:text-monarch-900"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Leaderboard
          </Link>

          <div className="mt-4 border-t border-monarch-900/10 pt-4">
            {user ? (
              <>
                <div className="mb-3 flex items-center gap-3 rounded-lg border border-monarch-900/10 bg-wisconsin-gray px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-monarch-900 to-hudson font-bold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-monarch-900">
                      {user.name}
                    </span>
                    {user.isAdmin && (
                      <span className="text-xs uppercase tracking-wide text-hudson">
                        Administrator
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-lg border border-red-500/20 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="mb-2 block rounded-lg px-4 py-3 text-center text-sm font-medium text-monarch-900 transition-all hover:bg-wisconsin-gray"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block rounded-lg bg-linear-to-r from-monarch-900 to-chesapeake px-4 py-3 text-center font-semibold text-white shadow-md transition-all hover:shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.24s ease-out;
        }
      `}</style>
    </nav>
  );
}
