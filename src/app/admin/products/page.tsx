"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  price?: string;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    title: "Classic Black T-Shirt",
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    price: "15,000 MMK",
  },
  {
    id: "2",
    title: "Casual Trousers",
    category: "Trousers",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop",
    price: "25,000 MMK",
  },
  {
    id: "3",
    title: "Summer Shorts",
    category: "Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
    price: "12,000 MMK",
  },
];

export default function AdminProductsPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    title: "",
    category: "T-Shirts",
    image: "",
    price: "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    const saved = localStorage.getItem("kmk_products");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem("kmk_products", JSON.stringify(defaultProducts));
    }
  }, [user, isAdmin, router]);

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.image) return;
    const p: Product = {
      id: Date.now().toString(),
      title: form.title,
      category: form.category,
      image: form.image,
      price: form.price || undefined,
    };
    const updated = [p, ...products];
    setProducts(updated);
    localStorage.setItem("kmk_products", JSON.stringify(updated));
    setForm({ title: "", category: "T-Shirts", image: "", price: "" });
  };

  const remove = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("kmk_products", JSON.stringify(updated));
  };

  if (!user || !isAdmin) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Manage Products</h1>
          <p className="text-white/50">Add photos & items for categories</p>
        </div>
        <Link href="/admin" className="text-sm text-red-400 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Add form */}
      <div className="glass-strong rounded-3xl p-6 mb-10">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Plus size={18} className="text-red-400" />
          Add New Product / Photo
        </h2>
        <form onSubmit={addProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
              placeholder="e.g. Red Graphic Tee"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              <option>T-Shirts</option>
              <option>Trousers</option>
              <option>Shorts</option>
              <option>Men&apos;s Wear</option>
              <option>Accessories</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-white/70 mb-1">Image URL</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
              placeholder="https://... (paste image link)"
            />
            <p className="text-xs text-white/40 mt-1">
              Upload your store photo to Imgur / Cloudinary / Vercel Blob and paste the URL here.
            </p>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Price (optional)</label>
            <input
              type="text"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
              placeholder="e.g. 18,000 MMK"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-500 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => (
          <div key={p.id} className="glass rounded-2xl overflow-hidden group">
            <div className="aspect-square relative">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              <button
                onClick={() => remove(p.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-red-400 opacity-0 group-hover:opacity-100 transition hover:bg-red-600 hover:text-white"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-4">
              <div className="text-xs text-red-400 mb-1">{p.category}</div>
              <h3 className="font-medium text-white">{p.title}</h3>
              {p.price && <p className="text-sm text-white/50 mt-1">{p.price}</p>}
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-16 text-white/40">
          <ImageIcon size={48} className="mx-auto mb-4 opacity-30" />
          <p>No products yet. Add your first photo above.</p>
        </div>
      )}
    </div>
  );
}
