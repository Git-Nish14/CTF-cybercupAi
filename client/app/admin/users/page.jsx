"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { apiRequest } from "../../../lib/api";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await apiRequest("/api/users");
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    if (user?.isAdmin) {
      load();
    }
  }, [user]);

  if (!user) {
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

  if (!user.isAdmin) {
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

  const filteredUsers = users
    .filter((u) => u._id !== user._id && u.email !== user.email)
    .filter((u) => {
      if (filter === "admin") return u.isAdmin;
      if (filter === "user") return !u.isAdmin;
      return true;
    })
    .filter((u) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        u.name?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query)
      );
    });

  return (
    <div className="w-full bg-linear-to-b from-white via-[#E6EAEE]/20 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
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
          <div className="mb-8">
            <div className="mb-2 inline-block">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#98C5EA]">
                User Management
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-monarch-900 sm:text-4xl">
              Manage Users
            </h1>
            <p className="mt-2 text-monarch-900/70">
              View and manage all registered users
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
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-monarch-900/20 bg-white py-2.5 pl-10 pr-4 text-monarch-900 placeholder-monarch-900/40 transition-all focus:border-[#0D6BA8] focus:outline-none focus:ring-2 focus:ring-[#0D6BA8]/20"
              />
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#98C5EA]/30 border-t-[#0D6BA8]"></div>
                <p className="text-monarch-900/70">Loading users...</p>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-monarch-900">
                No users found
              </h3>
              <p className="text-monarch-900/70">
                {searchQuery
                  ? "Try adjusting your search query"
                  : filter === "all"
                  ? "No users registered yet"
                  : `No ${filter} users found`}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-monarch-900/10 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-linear-to-r from-monarch-900 to-[#0D6BA8] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Joined
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-monarch-900/10">
                    {filteredUsers.map((u) => (
                      <tr
                        key={u._id}
                        className="transition-colors hover:bg-[#98C5EA]/5"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-monarch-900 to-[#0D6BA8] text-sm font-semibold text-white">
                              {u.name?.charAt(0).toUpperCase() || "?"}
                            </div>
                            <div className="font-medium text-monarch-900">
                              {u.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-monarch-900/70">
                          {u.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-monarch-900/70">
                          {new Date(u.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/admin/users/${u._id}`}>
                            <button className="inline-flex items-center gap-2 rounded-full border border-[#0D6BA8]/40 bg-white px-4 py-2 text-sm font-medium text-[#0D6BA8] transition-all hover:border-[#0D6BA8] hover:bg-[#98C5EA]/5">
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              View Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
