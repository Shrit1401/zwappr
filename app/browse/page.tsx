"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Coupon {
  id: string;
  title: string;
  type: string;
  location: string;
  expiry: string;
  sellingPrice: number;
  verified: boolean;
}

const types = ["All", "Hotel", "Flight", "Lounge Access", "Food"];

export default function BrowsePage() {
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const couponsCollection = collection(db, "coupons");
        const couponsSnapshot = await getDocs(couponsCollection);
        const couponsData = couponsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Coupon[];
        setCoupons(couponsData);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const filtered = coupons
    .filter(
      (c) =>
        (type === "All" || c.type === type) &&
        (location === "" ||
          c.location.toLowerCase().includes(location.toLowerCase())) &&
        (search === "" || c.title.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (a.verified && !b.verified) return -1;
      if (!a.verified && b.verified) return 1;
      return 0;
    });

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Browse Coupons</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading coupons...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Browse Coupons</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-40"
        />
        <Input
          placeholder="Search title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={() => {
            setType("All");
            setLocation("");
            setSearch("");
          }}
        >
          Reset
        </Button>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-lg text-muted-foreground">No coupons found</div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="border rounded-lg p-5 bg-white shadow-sm flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">{c.title}</span>
                {c.verified && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                    Verified
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {c.type} &bull; {c.location}
              </div>
              <div className="text-sm">Expires: {c.expiry}</div>
              <div className="font-bold text-xl mt-2">₹{c.sellingPrice}</div>
              <Button asChild className="mt-2">
                <a href={`/details/${c.id}`}>View Details</a>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
