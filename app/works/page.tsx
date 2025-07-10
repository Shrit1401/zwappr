"use client";
import { Button } from "@/components/ui/button";
import { seedSampleData } from "@/lib/firebase";
import { useState } from "react";

export default function WorksPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        How Our Platform Works
      </h1>

      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            1. Buying Coupons
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold">Browse Available Coupons</h3>
                <p className="text-gray-700">
                  Users can browse through verified and unverified coupons in
                  our directory
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold">Pay 20% Upfront</h3>
                <p className="text-gray-700">
                  Buyers pay 20% of the coupon value upfront to secure the
                  purchase
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold">Coupon Verification</h3>
                <p className="text-gray-700">
                  Our system verifies the coupon's authenticity and validity
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold">Complete Payment</h3>
                <p className="text-gray-700">
                  Once verified, we collect the remaining 80% from the buyer
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                5
              </div>
              <div>
                <h3 className="font-semibold">Receive Coupon Details</h3>
                <p className="text-gray-700">
                  Buyer receives complete coupon details and can use it
                  immediately
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-800">
            2. Selling Coupons
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold">List Your Coupon</h3>
                <p className="text-gray-700">
                  Sellers can list their coupons by filling out basic details
                  (coupon type, value, expiry, etc.)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold">Optional Verification</h3>
                <p className="text-gray-700">
                  Sellers can choose to verify their coupon by providing
                  personal details that anyone can use
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold">Verification Process</h3>
                <p className="text-gray-700">
                  If verification is chosen, our team verifies the coupon
                  authenticity
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold">Verified vs Unverified</h3>
                <p className="text-gray-700">
                  Verified coupons get a special tag and appear higher in search
                  results. Unverified coupons are still visible but without the
                  verification badge
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                5
              </div>
              <div>
                <h3 className="font-semibold">Earn Money</h3>
                <p className="text-gray-700">
                  Once sold, sellers receive their payment after our platform
                  fee ({process.env.NEXT_PUBLIC_PLATFORM_FEE}%)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-800">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-700">For Buyers</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Secure 20% upfront payment system</li>
                <li>• Verified coupon guarantee</li>
                <li>• Instant coupon delivery</li>
                <li>• Money-back protection</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-700">For Sellers</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Flexible verification options</li>
                <li>• Higher visibility for verified coupons</li>
                <li>• Secure payment processing</li>
                <li>• Easy listing process</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
