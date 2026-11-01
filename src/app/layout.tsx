import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ကျော်မင်းကျော် စတိုး | Kyaw Min Kyaw Store - Hinthada",
  description: "Men's wear, T-shirts, Trousers & more. Delivery within Hinthada. Quality clothing store in Hinthada, Myanmar.",
  keywords: "Kyaw Min Kyaw, Hinthada, clothing, men's wear, Myanmar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-mesh antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="glass border-t border-white/10 py-8 mt-16">
            <div className="max-w-6xl mx-auto px-4 text-center text-sm text-white/60">
              <p className="mb-2 font-medium text-white/80">ကျော်မင်းကျော် စတိုး · Kyaw Min Kyaw Store</p>
              <p>36, Man Ba Khine St, Arr Kar Shop House, Hinthada, Myanmar</p>
              <p className="mt-1">Phone: (044) 098580686</p>
              <p className="mt-4 text-xs">© {new Date().getFullYear()} Kyaw Min Kyaw Store. All rights reserved.</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
