"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { LayoutDashboard, Image, MessageCircle, ShoppingBag, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ orders: 0, reviews: 0, messages: 0 });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    const orders = JSON.parse(localStorage.getItem("kmk_orders") || "[]");
    const reviews = JSON.parse(localStorage.getItem("kmk_reviews") || "[]");
    const chat = JSON.parse(localStorage.getItem("kmk_chat") || "[]");
    setStats({
      orders: orders.length,
      reviews: reviews.length,
      messages: chat.length,
    });
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) return null;

  const cards = [
    {
      title: "Manage Products",
      desc: "Upload & edit category photos",
      href: "/admin/products",
      icon: Image,
      color: "text-red-400",
    },
    {
      title: "Chat with Customers",
      desc: "Reply to customer messages",
      href: "/chat",
      icon: MessageCircle,
      color: "text-blue-400",
    },
    {
      title: "View Orders",
      desc: `${stats.orders} orders received`,
      href: "/order",
      icon: ShoppingBag,
      color: "text-green-400",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <LayoutDashboard className="text-red-400" size={28} />
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <p className="text-white/50">Welcome, {user.name}. Manage your store here.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="glass rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-white">{stats.orders}</div>
          <div className="text-sm text-white/50">Orders</div>
        </div>
        <div className="glass rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-white">{stats.reviews}</div>
          <div className="text-sm text-white/50">Reviews</div>
        </div>
        <div className="glass rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-white">{stats.messages}</div>
          <div className="text-sm text-white/50">Chat Messages</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="glass rounded-2xl p-6 hover-lift group"
          >
            <c.icon className={`${c.color} mb-4`} size={28} />
            <h3 className="font-semibold text-white mb-1 group-hover:text-red-300 transition">
              {c.title}
            </h3>
            <p className="text-sm text-white/50 mb-4">{c.desc}</p>
            <span className="inline-flex items-center gap-1 text-sm text-red-400">
              Open <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 glass rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-2">Demo Credentials</h3>
        <p className="text-sm text-white/50">
          Admin login: <code className="text-red-300">admin@kyawminkyaw.com</code> /{" "}
          <code className="text-red-300">admin123</code>
        </p>
        <p className="text-xs text-white/40 mt-3">
          Note: Data is stored in browser localStorage for this demo. For production, connect
          a real database (Neon, Supabase, etc.).
        </p>
      </div>
    </div>
  );
}
