"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const steps = [
    { id: 1, title: "Yogurt Flavor", subtitle: "Select a yogurt flavor:" },
    { id: 2, title: "Size", subtitle: "Choose a size:" },
    {
      id: 3,
      title: "Fruit Flavor (select any two)",
      subtitle: "Select a fruit flavor:",
    },
    {
      id: 4,
      title: "Terms and Agreements",
      subtitle: "Confirm that you have read and agreed",
    },
    {
      id: 5,
      title: "Return policy and Warranty",
      subtitle: "Confirm that you have read and agreed",
    },
  ];
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    yogurtFlavor: "",
    size: "",
    fruitAddOns: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const Card = ({
    index,
    children,
  }: {
    index: number;
    children: React.ReactNode;
  }) => {
    return (
      <div className={`rounded-lg p-1 `}>
        <div className=""> {steps[index - 1].title}</div>

        {children}
        {index == step && (
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            {step < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Submit
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-between h-screen mx-auto w-full gap-1">
      <div className="rounded-lg ml-auto w-full">
        {/* product image */}{" "}
        <button
          type="button"
          onClick={() => {
            router.push("/catalog");
          }}
          className="rounded-lg border px-5 py-3 m-1 text-sm font-medium   disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        <div className="rounded-md p-1">
          <div className="relative rounded-lg aspect-square bg-zinc-100 p-1">
            <Image
              src={
                "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/images.jpg"
              }
              alt=""
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="font-semibold p-1">yogurt</div>
        </div>
      </div>
      {/* Form */}
      <div className="rounded-l-lg mr-auto w-full p-1 bg-slate-100">
        {/* multistep form */}
        <form className="space-y-1 ">
          <Card index={1}>
            {step === 1 && (
              <div className="flex gap-1 justify-between ">
                {["original", "avocado", "matcha"].map((flavor) => (
                  <div
                    className={`relative overflow-hidden border rounded-lg px-3 py-2 w-full aspect-square cursor-pointer ${
                      formData.yogurtFlavor === flavor
                        ? "border-orange-300"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        yogurtFlavor: flavor,
                      }))
                    }
                  >
                    <Image
                      src={
                        "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png" ||
                        "/placeholder.png"
                      } // Fixed the fallback logic string
                      alt={"" || "Feature"}
                      fill
                      className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                    />
                    <div className="absolute top-0 left-0 m-3 text-lg">
                      {flavor}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card index={2}>
            {step === 2 && (
              <div className="flex gap-1 justify-between">
                {["small", "medium", "large"].map((size) => (
                  <div
                    className={`relative overflow-hidden rounded-lg border px-3 py-2 w-full aspect-square cursor-pointer ${
                      formData.size === size ? "border-orange-300" : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        size: size,
                      }))
                    }
                  >
                    <Image
                      src={
                        "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png" ||
                        "/placeholder.png"
                      } // Fixed the fallback logic string
                      alt={"" || "Feature"}
                      fill
                      className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                    />
                    <div className="absolute top-0 left-0 m-3 text-lg">
                      {size}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card index={3}>
            {step === 3 && (
              <div className="flex gap-1">
                {["strawberry", "banana", "blueberry", "mango", "peach"].map(
                  (fruit) => (
                    <div
                      className={`relative overflow-hidden rounded-lg border px-3 py-2 w-full aspect-square cursor-pointer ${
                        formData.fruitAddOns === fruit
                          ? "border-orange-300"
                          : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          fruitAddOns: fruit,
                        }))
                      }
                    >
                      <Image
                        src={
                          "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png" ||
                          "/placeholder.png"
                        } // Fixed the fallback logic string
                        alt={"" || "Feature"}
                        fill
                        className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                      />
                      <div className="absolute top-0 left-0 m-3 text-lg">
                        {fruit}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </Card>
          <Card index={4}>
            {step === 4 && (
              <div className="flex gap-1">
                {/* terms and agreements */}
                <div>
                  <input type="checkbox" />
                  terms and agreements
                </div>
              </div>
            )}
          </Card>
          <Card index={5}>
            {step === 5 && (
              <div className="flex gap-1">
                {/* return policy */}
                <div>
                  <input type="checkbox" />
                  return policy
                </div>
              </div>
            )}
          </Card>
        </form>
      </div>
    </div>
  );
};
export default Page;
