"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "user" | "admin" | null;

interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple demo credentials (change in production)
const DEMO_USERS = [
  { name: "Admin", email: "admin@kyawminkyaw.com", password: "admin123", role: "admin" as const },
  { name: "Demo User", email: "user@example.com", password: "user123", role: "user" as const },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("kmk_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const login = (email: string, password: string) => {
    const found = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      const u = { name: found.name, email: found.email, role: found.role };
      setUser(u);
      localStorage.setItem("kmk_user", JSON.stringify(u));
      return true;
    }
    // Allow any email/password as regular user for demo
    if (email && password.length >= 4) {
      const u = { name: email.split("@")[0], email, role: "user" as const };
      setUser(u);
      localStorage.setItem("kmk_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    if (!name || !email || password.length < 4) return false;
    const u = { name, email, role: "user" as const };
    setUser(u);
    localStorage.setItem("kmk_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kmk_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAdmin: user?.role === "admin",
      }}
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
