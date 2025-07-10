"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";
import Image from "next/image";
import { useCoupon, submitPurchase } from "@/lib/firebase";
import { useParams } from "next/navigation";

const BUYERS_CUT = Number(process.env.NEXT_PUBLIC_BUYERS_CUT);
function LoadingSpinner() {
  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <div className="border rounded-lg p-6 bg-white shadow flex flex-col items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        <p className="mt-4 text-muted-foreground">Loading coupon details...</p>
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <div className="border rounded-lg p-6 bg-white shadow flex flex-col items-center justify-center min-h-[200px]">
        <div className="text-red-500 text-center">
          <p className="font-medium mb-2">Error</p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default function BuyPage() {
  const params = useParams();
  const id = params.id as string;
  const { coupon, loading, error } = useCoupon(id);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [transactionId, setTransactionId] = useState("");

  if (loading) return <LoadingSpinner />;
  if (error || !coupon)
    return <ErrorMessage message={error || "Coupon not found"} />;

  const price = coupon.sellingPrice;
  const upfront = Math.round(price * (BUYERS_CUT / 100));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const result = await submitPurchase({
        couponId: id,
        email,
        phone,
        transactionId,
      });
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.error || "Failed to submit purchase");
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to submit purchase"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Buy Coupon</h1>
      <div className="mb-2 text-lg font-semibold">{coupon.title}</div>
      <div className="mb-2 text-muted-foreground">
        {coupon.couponType} &bull; {coupon.location}
      </div>
      {submitted ? (
        <div className="p-4 bg-green-100 rounded mb-4">
          Thank you! Your payment and details have been received.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Phone Number</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 p-4 bg-neutral-100 border border-neutral-200 rounded">
            <div className="mb-2 font-semibold">Payment Instructions</div>
            <div className="mb-2">
              Upfront Payment:{" "}
              <span className="font-mono text-lg font-bold">₹{upfront}</span> (
              {BUYERS_CUT}% of total price)
            </div>
            <div className="flex flex-col items-center gap-2 my-4">
              <Image
                src="/upi.png"
                alt="UPI QR"
                width={480}
                height={480}
                className="rounded-xl"
              />
            </div>
            <div className="mb-1">
              Or pay to UPI ID:{" "}
              <span className="font-mono font-black">shrit1401@oksbi</span>
            </div>
            <div className="mb-1">
              Or to phone:{" "}
              <span className="font-mono font-black">9667271155</span>
            </div>
            <div className="mt-2 text-sm text-neutral-600">
              We hold your payment in escrow until you receive the coupon.
            </div>
            <div className="mt-2 text-xs text-neutral-500">
              After verification, you will be contacted to pay the remaining{" "}
              <span className="font-mono font-black">₹{price - upfront}</span>{" "}
              to complete the purchase.
            </div>
            <div className="mt-4 text-sm text-neutral-700 font-medium">
              If everything works well, you'll receive your coupon within 3
              days.
            </div>
            <div className="mt-4 text-xs text-blue-700">
              Once you pay, please enter your transaction ID below to ensure
              your payment is legit and reaches us.
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Transaction ID</label>
            <Input
              type="number"
              value={transactionId}
              onChange={(e) =>
                setTransactionId(e.target.value.replace(/[^0-9]/g, ""))
              }
              required
              placeholder="Enter your transaction ID"
            />
            <div className="text-xs text-neutral-500 mt-1">
              You can find this in your UPI app after payment.
            </div>
          </div>
          <Button
            className="w-full mb-4"
            type="submit"
            disabled={!email || !phone || !transactionId || submitting}
          >
            {submitting ? "Submitting..." : `I Have Paid ₹${upfront}`}
          </Button>
          {submitError && (
            <div className="text-red-500 text-sm text-center mt-2">
              {submitError}
            </div>
          )}
        </form>
      )}
      <div className="text-center text-sm text-neutral-500">
        After payment, you will receive the coupon details by email
        (shrit1401@gmail.com) or WhatsApp.
      </div>
    </div>
  );
}
