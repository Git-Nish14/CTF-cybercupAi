"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const data = await apiRequest("/api/auth/me", {
          method: "GET",
        });
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadCurrentUser();
  }, []);

  const register = async (name, email, password) => {
    const data = await apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    setUser(data);
    return data;
  };

  const login = async (email, password) => {
    const data = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(data);
    return data;
  };

  const googleLogin = async (credential) => {
    const data = await apiRequest("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    });
    setUser(data);
    return data;
  };

  const logout = async () => {
    await apiRequest("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, register, login, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
