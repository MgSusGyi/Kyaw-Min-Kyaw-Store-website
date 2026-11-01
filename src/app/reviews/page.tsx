"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Star, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export default function ReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("kmk_reviews");
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      const demo: Review[] = [
        {
          id: "1",
          name: "Aung Aung",
          rating: 5,
          text: "Good quality T-shirts and friendly service. Recommended!",
          date: "2026-09-15",
        },
        {
          id: "2",
          name: "Ma Hla",
          rating: 4,
          text: "Nice trousers. Delivery was fast within Hinthada.",
          date: "2026-08-22",
        },
      ];
      setReviews(demo);
      localStorage.setItem("kmk_reviews", JSON.stringify(demo));
    }
    if (user) setName(user.name);
  }, [user]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return;
    const review: Review = {
      id: Date.now().toString(),
      name,
      rating,
      text: text.trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem("kmk_reviews", JSON.stringify(updated));
    setText("");
    setRating(5);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Customer Reviews</h1>
        <p className="text-white/50">Share your experience with Kyaw Min Kyaw Store</p>
      </div>

      {/* Form */}
      <div className="glass-strong rounded-3xl p-6 sm:p-8 mb-10">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <MessageSquare size={18} className="text-red-400" />
          Leave a Review
        </h2>
        {!user && (
          <p className="text-sm text-white/50 mb-4">
            <Link href="/login" className="text-red-400 hover:underline">
              Login
            </Link>{" "}
            for a better experience, or leave as guest.
          </p>
        )}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1.5">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1.5">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className="p-1"
                >
                  <Star
                    size={28}
                    className={s <= rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1.5">Your Review</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={3}
              placeholder="How was your experience?"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white resize-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-500 transition"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* List */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-white">{r.name}</div>
              <div className="text-xs text-white/40">{r.date}</div>
            </div>
            <div className="flex gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={s <= r.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"}
                />
              ))}
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
