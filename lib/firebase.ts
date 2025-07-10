import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCXQwzHmYxSkaEt6fznO8NaqQu-_gUTqD4",
  authDomain: "cp-bazaar.firebaseapp.com",
  projectId: "cp-bazaar",
  storageBucket: "cp-bazaar.firebasestorage.app",
  messagingSenderId: "200494053685",
  appId: "1:200494053685:web:d8d6293662e9f827edb47c",
  measurementId: "G-RXY3317C6G",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface Coupon {
  id: string;
  title: string;
  couponType: string;
  location: string;
  expiry: string;
  sellingPrice: number;
  verified: boolean;
  description: string;
  createdAt: Date;
  sellerId: string;
  screenshotUrl: string;
}

export function useCoupon(id: string) {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoupon() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const couponDoc = doc(db, "coupons", id);
        const couponSnapshot = await getDoc(couponDoc);

        if (couponSnapshot.exists()) {
          const data = couponSnapshot.data();
          setCoupon({
            id: couponSnapshot.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
          } as Coupon);
        } else {
          setError("Coupon not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch coupon");
      } finally {
        setLoading(false);
      }
    }

    fetchCoupon();
  }, [id]);

  return { coupon, loading, error };
}

export async function seedSampleData() {
  const sampleCoupons = [
    {
      title: "Taj Hotel 1 Night Stay",
      type: "Hotel",
      location: "Mumbai",
      expiry: "2024-12-31",
      price: 4000,
      verified: true,
      description: "1 night stay at Taj Mumbai. Breakfast included.",
      sellerId: "seller1",
      createdAt: new Date(),
    },
    {
      title: "Indigo Flight Voucher",
      type: "Flight",
      location: "Delhi",
      expiry: "2024-10-15",
      price: 1500,
      verified: false,
      description: "₹2000 Indigo voucher. Valid on all domestic flights.",
      sellerId: "seller2",
      createdAt: new Date(),
    },
    {
      title: "Lounge Access Pass",
      type: "Lounge Access",
      location: "Bangalore",
      expiry: "2024-09-01",
      price: 700,
      verified: true,
      description: "1-time access to premium airport lounge.",
      sellerId: "seller3",
      createdAt: new Date(),
    },
    {
      title: "Domino's Pizza Offer",
      type: "Food",
      location: "Chennai",
      expiry: "2024-08-20",
      price: 200,
      verified: false,
      description: "Buy 1 Get 1 Free on medium pizzas.",
      sellerId: "seller4",
      createdAt: new Date(),
    },
  ];

  try {
    const couponsRef = collection(db, "coupons");
    const promises = sampleCoupons.map((coupon) => addDoc(couponsRef, coupon));
    await Promise.all(promises);
    console.log("Sample data seeded successfully");
    return true;
  } catch (error) {
    console.error("Error seeding sample data:", error);
    return false;
  }
}

export async function submitPurchase({
  couponId,
  email,
  phone,
  transactionId,
}: {
  couponId: string;
  email: string;
  phone: string;
  transactionId: string;
}) {
  try {
    const purchasesRef = collection(db, "purchases");
    const docRef = await addDoc(purchasesRef, {
      couponId,
      email,
      phone,
      transactionId,
      createdAt: new Date(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
