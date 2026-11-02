"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { ArrowLeft, Truck, Store, Package } from "lucide-react";

interface Order {
  id: string;
  name: string;
  phone: string;
  address?: string;
  items: string;
  notes?: string;
  method: "delivery" | "pickup";
  userEmail?: string;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    const saved = localStorage.getItem("kmk_orders");
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="p-2 rounded-full glass hover:bg-white/10 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Customer Orders</h1>
          <p className="text-white/50 text-sm">{orders.length} total orders</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <Package className="mx-auto text-white/30 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-white mb-2">No orders yet</h2>
          <p className="text-white/50">
            When customers place orders, they will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="font-semibold text-white text-lg">{order.name}</div>
                  <div className="text-sm text-white/60">{order.phone}</div>
                  {order.userEmail && (
                    <div className="text-xs text-white/40">{order.userEmail}</div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {order.method === "delivery" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                      <Truck size={14} /> Delivery
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                      <Store size={14} /> Pickup
                    </span>
                  )}
                  <span className="text-xs text-white/40">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 mb-3">
                <div className="text-xs text-white/50 mb-1">Items</div>
                <p className="text-white whitespace-pre-wrap">{order.items}</p>
              </div>

              {order.method === "delivery" && order.address && (
                <div className="mb-3">
                  <div className="text-xs text-white/50 mb-1">Delivery Address</div>
                  <p className="text-white/80 text-sm">{order.address}</p>
                </div>
              )}

              {order.notes && (
                <div>
                  <div className="text-xs text-white/50 mb-1">Notes</div>
                  <p className="text-white/70 text-sm">{order.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
