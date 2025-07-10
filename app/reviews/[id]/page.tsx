"use client";

import { useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ReviewsPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const [submitted, setSubmitted] = useState(false);
  const methods = useForm({ defaultValues: { rating: "", review: "" } });
  const { handleSubmit, control } = methods;
  function onSubmit() {
    setSubmitted(true);
  }
  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">
        Leave a Review for Coupon #{id}
      </h1>
      {submitted ? (
        <div className="p-4 bg-green-100 rounded">
          Thank you for your feedback!
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              name="rating"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (1-5)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={5} {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="review"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">
              Submit Review
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
