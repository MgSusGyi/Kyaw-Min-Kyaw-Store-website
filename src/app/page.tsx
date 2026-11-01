"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Shirt, Shirt, ShoppingBag, Truck, Store, MessageCircle, Star, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "mens-wear",
    title: "Men's Wear",
    titleMm: "အမျိုးသား အဝတ်အထည်",
    description: "Premium shirts, jackets & more",
    icon: Shirt,
    color: "from-red-600/20 to-red-900/10",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=400&fit=crop",
  },
  {
    id: "tshirts",
    title: "T-Shirts",
    titleMm: "တီရှပ်များ",
    description: "Casual & graphic tees",
    icon: Shirt,
    color: "from-orange-600/20 to-red-900/10",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
  },
  {
    id: "trousers",
    title: "Trousers",
    titleMm: "ဘောင်းဘီများ",
    description: "Formal & casual pants",
    icon: Shirt,
    color: "from-rose-600/20 to-red-900/10",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=400&fit=crop",
  },
  {
    id: "shorts",
    title: "Shorts",
    titleMm: "ဘောင်းဘီတို",
    description: "Comfortable everyday shorts",
    icon: Shirt,
    color: "from-red-700/20 to-red-950/10",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=400&fit=crop",
  },
  {
    id: "accessories",
    title: "Accessories",
    titleMm: "အသုံးအဆောင်များ",
    description: "Belts, caps, socks & more",
    icon: ShoppingBag,
    color: "from-red-800/20 to-black/20",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
  },
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-red-300 mb-6">
              <Store size={14} />
              <span>Hinthada · Arr Kar Shop House</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              ကျော်မင်းကျော်
              <span className="block text-red-500 mt-1">စတိုး</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 mb-8 leading-relaxed">
              Quality men&apos;s clothing in the heart of Hinthada.
              <br className="hidden sm:block" />
              T-shirts, trousers, shorts & more — with local delivery & pickup.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#categories"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-600 text-white font-semibold hover:bg-red-500 transition shadow-xl shadow-red-600/30"
              >
                Browse Categories
                <ArrowRight size={18} />
              </a>
              {user ? (
                <Link
                  href="/order"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass text-white font-medium hover:bg-white/10 transition"
                >
                  <ShoppingBag size={18} />
                  Place Order
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass text-white font-medium hover:bg-white/10 transition"
                >
                  Login to Order / Chat
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-6 text-center hover-lift">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center mx-auto mb-4">
              <Truck className="text-red-400" size={24} />
            </div>
            <h3 className="font-semibold text-white mb-1">Delivery in Hinthada</h3>
            <p className="text-sm text-white/50">Fast delivery within the city only</p>
          </div>
          <div className="glass rounded-2xl p-6 text-center hover-lift">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center mx-auto mb-4">
              <Store className="text-red-400" size={24} />
            </div>
            <h3 className="font-semibold text-white mb-1">Pickup Available</h3>
            <p className="text-sm text-white/50">Collect your order at the shop</p>
          </div>
          <div className="glass rounded-2xl p-6 text-center hover-lift">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="text-red-400" size={24} />
            </div>
            <h3 className="font-semibold text-white mb-1">Chat with Admin</h3>
            <p className="text-sm text-white/50">Ask anything after login</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Our Categories</h2>
          <p className="text-white/50">Browse our collection of quality clothing</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative overflow-hidden rounded-2xl glass hover-lift cursor-pointer"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-black/80`} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <cat.icon size={18} className="text-red-400" />
                  <h3 className="text-xl font-semibold text-white">{cat.title}</h3>
                </div>
                <p className="text-sm text-white/60 mb-1">{cat.titleMm}</p>
                <p className="text-sm text-white/50">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/50 mb-4">Want to order or ask about sizes & availability?</p>
          {user ? (
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/order"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-500 transition"
              >
                <ShoppingBag size={18} /> Place Order
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-white font-medium hover:bg-white/10 transition"
              >
                <MessageCircle size={18} /> Chat Admin
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-500 transition"
            >
              Login to Order or Chat
            </Link>
          )}
        </div>
      </section>

      {/* Reviews teaser */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="glass rounded-3xl p-8 sm:p-12 text-center">
          <Star className="mx-auto text-red-400 mb-4" size={32} />
          <h2 className="text-2xl font-bold text-white mb-2">Customer Reviews</h2>
          <p className="text-white/50 mb-6 max-w-md mx-auto">
            See what customers say about Kyaw Min Kyaw Store or leave your own review.
          </p>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/15 transition"
          >
            View & Leave Reviews
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
