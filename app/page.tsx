"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center">
      <section className="w-full text-center py-24 px-4">
        <h1 className="heading italic text-5xl sm:text-6xl font-extrabold mb-4 text-black drop-shadow">
          zwappr
        </h1>
        <p className="text-xl sm:text-2xl text-neutral-700 mb-8 max-w-2xl mx-auto">
          India's trusted marketplace to buy and sell unused reward coupons from
          credit cards and loyalty programs. Verified sellers. Escrow
          protection. No scams.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/browse">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-neutral-800"
            >
              Browse Coupons
            </Button>
          </Link>
          <Link href="/sell">
            <Button
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-neutral-100"
            >
              Sell a Coupon
            </Button>
          </Link>
        </div>
      </section>
      <section className="w-full max-w-4xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="mb-2 text-3xl">🔒</span>
            <h2 className="text-xl font-semibold mb-2 text-black">
              Escrow Protection
            </h2>
            <p className="text-neutral-600">
              Your money is safe. We hold payment until you get your coupon.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2 text-3xl">✅</span>
            <h2 className="text-xl font-semibold mb-2 text-black">
              Verified Sellers
            </h2>
            <p className="text-neutral-600">
              Top sellers are verified for extra trust. Look for the badge.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2 text-3xl">⚡</span>
            <h2 className="text-xl font-semibold mb-2 text-black">
              Easy & Fast
            </h2>
            <p className="text-neutral-600">
              List, browse, and buy in minutes. No more Telegram or Reddit
              scams.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full max-w-3xl mx-auto py-8 px-4">
        <div className="bg-neutral-100 rounded-xl shadow p-8 text-center">
          <h3 className="text-lg font-semibold mb-2 text-black">Why zwappr?</h3>
          <p className="mb-4 text-neutral-600">
            Thousands of happy users have found value, trust, and great deals on
            zwappr. Join the community and never let your rewards go to waste!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse">
              <Button className="bg-black text-white hover:bg-neutral-800">
                Start Browsing
              </Button>
            </Link>
            <Link href="/sell">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-neutral-200"
              >
                Post a Coupon
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white border border-neutral-200 rounded-xl shadow p-8 text-center">
          <h3 className="text-lg font-semibold mb-2 text-black">Contact Us</h3>
          <div className="mb-2 text-neutral-700">
            Email:{" "}
            <a href="mailto:shrit1401@gmail.com" className="underline">
              shrit1401@gmail.com
            </a>
          </div>
          <div className="text-neutral-700">
            Phone: <span className="font-mono">+91 9667271155</span>
          </div>
          <Button className="mt-3 hover:bg-neutral-800">
            <a target="_blank" href="https://wa.me/9667271155">
              WhatsApp Us
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
