"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  price?: string;
}

const categoryNames: Record<string, string> = {
  "mens-wear": "Men's Wear",
  tshirts: "T-Shirts",
  trousers: "Trousers",
  shorts: "Shorts",
  accessories: "Accessories",
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("kmk_products");
    if (saved) {
      const all: Product[] = JSON.parse(saved);
      const filtered = all.filter((p) => {
        const cat = p.category.toLowerCase().replace(/['\s&]/g, "");
        const s = slug.replace(/-/g, "");
        return cat.includes(s) || s.includes(cat) || cat === s;
      });
      setProducts(filtered.length > 0 ? filtered : all);
    }
  }, [slug]);

  const title = categoryNames[slug] || "Products";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/#categories"
          className="p-2 rounded-full glass hover:bg-white/10 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-white/50 text-sm">{products.length} items</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <ShoppingBag className="mx-auto text-white/30 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-white mb-2">No products yet</h2>
          <p className="text-white/50 mb-6">
            Admin can add products from the Admin Dashboard → Manage Products.
          </p>
          <Link
            href="/order"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-500 transition"
          >
            Place an Order instead
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="glass rounded-2xl overflow-hidden hover-lift">
              <div className="aspect-square relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-xs text-red-400 mb-1">{p.category}</div>
                <h3 className="font-semibold text-white text-lg">{p.title}</h3>
                {p.price && <p className="text-white/70 mt-1">{p.price}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        {user ? (
          <Link
            href="/order"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-600 text-white font-semibold hover:bg-red-500 transition shadow-lg shadow-red-600/30"
          >
            <ShoppingBag size={18} />
            Place an Order
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-600 text-white font-semibold hover:bg-red-500 transition"
          >
            Login to Order
          </Link>
        )}
      </div>
    </div>
  );
}
