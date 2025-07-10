"use client";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCoupon } from "@/lib/firebase";
import { CheckCircle2, MapPin, Calendar, Tag, User2 } from "lucide-react";

function LoadingSpinner() {
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <div className="border rounded-lg p-6 bg-white shadow flex flex-col items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        <p className="mt-4 text-muted-foreground">Loading coupon details...</p>
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <div className="border rounded-lg p-6 bg-white shadow flex flex-col items-center justify-center min-h-[200px]">
        <div className="text-red-500 text-center">
          <p className="font-medium mb-2">Error</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default function DetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { coupon, loading, error } = useCoupon(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !coupon) {
    return <ErrorMessage message={error || "Coupon not found"} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-2 bg-gradient-to-br from-white via-neutral-100 to-neutral-200 animate-fade-in">
      <div
        className="w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl bg-white/80 border border-neutral-200 animate-fade-in-up relative"
        style={{ animationDelay: "0.1s", animationDuration: "0.7s" }}
      >
        <div className="relative">
          {coupon.screenshotUrl && (
            <div className="relative w-full h-56 bg-neutral-100 flex items-center justify-center overflow-hidden">
              <img
                src={coupon.screenshotUrl}
                alt={coupon.couponType + " image"}
                style={{ objectFit: "contain" }}
                className="rounded-2xl shadow-lg border border-neutral-200 w-auto h-40 max-h-44 mx-auto bg-white"
                sizes="(max-width: 600px) 100vw, 600px"
                loading="eager"
              />
              {coupon.verified && (
                <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black text-white text-xs font-bold shadow-md border border-neutral-800 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" /> Verified
                </span>
              )}
            </div>
          )}
        </div>
        <div className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-extrabold leading-tight tracking-tight text-black drop-shadow-sm">
              {coupon.title}
            </span>
          </div>
          <div className="flex flex-row gap-4 items-center justify-between text-sm text-neutral-500">
            <span className="inline-flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {coupon.couponType}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {coupon.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {coupon.expiry}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-end justify-between">
              <span className="font-extrabold text-4xl text-black px-2 py-1 rounded-xl">
                ₹{coupon.sellingPrice}
              </span>
              <Button
                asChild
                size="lg"
                className="text-lg px-8 bg-black text-white hover:bg-neutral-900 shadow-md transition-all duration-200 hover:scale-105"
              >
                <a href={`/buy/${coupon.id}`}>Buy Now</a>
              </Button>
            </div>
          </div>
          <div className="mt-2 text-base text-neutral-700 font-medium">
            {coupon.description}
          </div>
        </div>
      </div>
    </div>
  );
}
