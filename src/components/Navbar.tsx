"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, ShoppingBag, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/#categories", label: "Categories" },
    { href: "/reviews", label: "Reviews" },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-red-600/30 group-hover:scale-105 transition">
            KMK
          </div>
          <div className="hidden sm:block">
            <div className="font-semibold text-white leading-tight">ကျော်မင်းကျော်</div>
            <div className="text-[10px] text-white/50 tracking-wider">HINTHADA</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition",
                pathname === l.href
                  ? "bg-red-600/20 text-red-400"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link
                href="/chat"
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
                title="Chat with Admin"
              >
                <MessageCircle size={20} />
              </Link>
              <Link
                href="/order"
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
                title="Order"
              >
                <ShoppingBag size={20} />
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="p-2 rounded-full hover:bg-red-600/20 text-red-400 transition"
                  title="Admin"
                >
                  <LayoutDashboard size={20} />
                </Link>
              )}
              <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
                <span className="text-sm text-white/70">{user.name}</span>
                <button
                  onClick={logout}
                  className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-red-400 transition"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-500 transition shadow-lg shadow-red-600/30"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/10 text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-strong border-t border-white/10 px-4 py-4 space-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-xl text-white/80 hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
          {user && (
            <>
              <Link href="/chat" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-white/80 hover:bg-white/5">
                Chat with Admin
              </Link>
              <Link href="/order" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-white/80 hover:bg-white/5">
                Place Order
              </Link>
              {isAdmin && (
                <Link href="/admin" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-red-400 hover:bg-red-600/10">
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-600/10"
              >
                Logout ({user.name})
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
