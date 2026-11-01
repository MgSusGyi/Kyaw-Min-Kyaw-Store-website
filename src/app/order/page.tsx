"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Truck, Store, CheckCircle, ShoppingBag } from "lucide-react";

export default function OrderPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [method, setMethod] = useState<"delivery" | "pickup">("delivery");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    items: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    setForm((f) => ({ ...f, name: user.name }));
    const saved = localStorage.getItem("kmk_orders");
    if (saved) setOrders(JSON.parse(saved));
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || !form.items) return;
    if (method === "delivery" && !form.address) return;

    const order = {
      id: Date.now().toString(),
      ...form,
      method,
      userEmail: user?.email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const updated = [order, ...orders];
    setOrders(updated);
    localStorage.setItem("kmk_orders", JSON.stringify(updated));
    setSubmitted(true);
  };

  if (!user) return null;

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="glass-strong rounded-3xl p-10">
          <CheckCircle className="mx-auto text-green-400 mb-4" size={48} />
          <h1 className="text-2xl font-bold text-white mb-2">Order Received!</h1>
          <p className="text-white/60 mb-6">
            Thank you. We will contact you soon on {form.phone}.
            {method === "delivery"
              ? " Delivery is only available within Hinthada city."
              : " Please come to the shop for pickup."}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-500 transition"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Place an Order</h1>
        <p className="text-white/50">Delivery only within Hinthada · or Pickup at the shop</p>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8">
        {/* Method toggle */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            type="button"
            onClick={() => setMethod("delivery")}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition ${
              method === "delivery"
                ? "border-red-500 bg-red-600/20 text-white"
                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            <Truck size={24} />
            <span className="font-medium">Delivery</span>
            <span className="text-xs opacity-70">Within Hinthada only</span>
          </button>
          <button
            type="button"
            onClick={() => setMethod("pickup")}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition ${
              method === "pickup"
                ? "border-red-500 bg-red-600/20 text-white"
                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            <Store size={24} />
            <span className="font-medium">Pickup</span>
            <span className="text-xs opacity-70">At the shop</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-white/70 mb-1.5">Your Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              placeholder="09xxxxxxxxx"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
            />
          </div>
          {method === "delivery" && (
            <div>
              <label className="block text-sm text-white/70 mb-1.5">
                Delivery Address (Hinthada only)
              </label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
                rows={2}
                placeholder="Street, quarter, landmark..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white resize-none"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-white/70 mb-1.5">Items to Order</label>
            <textarea
              value={form.items}
              onChange={(e) => setForm({ ...form, items: e.target.value })}
              required
              rows={3}
              placeholder="e.g. 2x Black T-shirt (L), 1x Blue Trousers (32)..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white resize-none"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1.5">Notes (optional)</label>
            <input
              type="text"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Size, color preference, etc."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
          >
            <ShoppingBag size={18} />
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
}
