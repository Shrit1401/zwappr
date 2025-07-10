"use client";
import {
  useForm,
  FormProvider,
  Controller,
  UseFormSetValue,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { UploadButton } from "@/components/uploadthing";

const couponTypes = ["Hotel", "Flight", "Lounge Access", "Food", "Other"];

export default function SellCouponPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      expiry: "",
      originalValue: "",
      sellingPrice: "",
      location: "",
      couponType: "",
      verify: false,
      code: "",
      usage: "",
      restrictions: "",
      email: "",
      phone: "",
      tags: [] as string[],
    },
  });
  const { handleSubmit, control, watch, setValue } = methods;
  const verify = watch("verify");

  async function onSubmit(data: FormFields) {
    console.log("Form submitted with data:", data);
    console.log("Screenshot URL:", screenshotUrl);

    setIsSubmitting(true);
    try {
      const couponData = {
        title: data.title,
        description: data.description,
        expiry: data.expiry,
        originalValue: parseFloat(data.originalValue),
        sellingPrice: parseFloat(data.sellingPrice),
        location: data.location,
        couponType: data.couponType,
        screenshotUrl,
        verify: data.verify,
        code: data.code,
        usage: data.usage,
        restrictions: data.restrictions,
        email: data.email,
        phone: data.phone,
        tags: data.tags,
        status: "pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      console.log("Saving coupon data to Firebase:", couponData);
      await addDoc(collection(db, "coupons"), couponData);
      console.log("Coupon saved successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error("Error uploading coupon:", error);
      alert("Failed to upload coupon. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Post a Coupon for Sale</h1>
      {submitted ? (
        <div className="p-4 bg-green-100 rounded">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Coupon Posted Successfully!
            </h2>
            <div className="space-y-3 text-base">
              <div>
                <span className="font-medium">What happens next?</span>
                <div>
                  Within the next 24 to 48 hours, we'll get back to you.
                </div>
              </div>
              <div>
                <span className="font-medium">Visibility:</span>
                <div>Your listing will appear on Google and on our page.</div>
              </div>
              <div>
                <span className="font-medium">Notifications:</span>
                <div>We'll also send you a message via WhatsApp or email.</div>
              </div>
              <div>
                <span className="font-medium">Verification:</span>
                <div>We may reach out to you to verify your documents.</div>
              </div>
              <div>
                <span className="font-medium">Note:</span>
                <div>
                  We can change the price for you depending on the demand /
                  demand for the coupon.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              name="title"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Title</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="expiry"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="originalValue"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Value (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} required />
                  </FormControl>
                  <div className="text-xs text-gray-500 mt-1">
                    This is the original value, i.e., the worth of the coupon.
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="sellingPrice"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} required />
                  </FormControl>
                  <div className="text-xs text-gray-500 mt-1">
                    This is the price which a buyer will give you if they
                    accept.
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="location"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      value={field.value || ""}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      {...field}
                      value={field.value || ""}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              name="couponType"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Type</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {couponTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CustomTags
              control={control}
              setValue={setValue}
              tags={watch("tags") || []}
            />
            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Screenshot (optional)
              </label>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Screenshot uploaded:", res);
                  if (res && res[0]) {
                    setScreenshotUrl(res[0].url);
                    alert("Screenshot uploaded successfully!");
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error:", error);
                  alert(`Upload failed: ${error.message}`);
                }}
              />
              {screenshotUrl && (
                <div className="mt-2">
                  <p className="text-sm text-green-600">
                    Screenshot uploaded successfully!
                  </p>
                  <img
                    src={screenshotUrl}
                    alt="Screenshot preview"
                    className="mt-2 max-w-xs rounded"
                  />
                </div>
              )}
              <div className="text-xs text-gray-500 mt-1">
                If you're uploading a screenshot, make sure any official
                information is blurred out.
              </div>
            </div>
            <Controller
              name="verify"
              control={control}
              render={({ field }) => (
                <div className="mt-6 mb-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    id="verify"
                  />
                  <label htmlFor="verify" className="text-sm">
                    Verify this coupon (optional)
                  </label>
                </div>
              )}
            />
            {verify && (
              <div className="border rounded p-4 mb-4">
                <FormField
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="usage"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage Process</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="restrictions"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Restrictions</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting Coupon..." : "Post Coupon"}
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}

type FormFields = {
  title: string;
  description: string;
  expiry: string;
  originalValue: string;
  sellingPrice: string;
  location: string;
  couponType: string;
  verify: boolean;
  code: string;
  usage: string;
  restrictions: string;
  email: string;
  phone: string;
  tags: string[];
};
type CustomTagsProps = {
  control: any;
  setValue: UseFormSetValue<FormFields>;
  tags: string[];
};
function CustomTags({ control, setValue, tags }: CustomTagsProps) {
  const [input, setInput] = useState("");
  function addTag(e: React.FormEvent | React.KeyboardEvent) {
    e.preventDefault();
    if (input && !tags.includes(input)) {
      const newTags = [...tags, input];
      setValue("tags", newTags);
      setInput("");
    }
  }
  function removeTag(tag: string) {
    const newTags = tags.filter((t) => t !== tag);
    setValue("tags", newTags);
  }
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">Custom Tags</label>
      <div className="flex gap-2 mb-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTag(e);
          }}
          placeholder="Add a tag and press Enter"
        />
        <Button type="button" onClick={addTag}>
          Add
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-xs"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
