"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/header";
import data from "../data.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Button from "../components/slideButton";
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
      title: "Delivery",
      subtitle: "Pick Up or Delivery?",
    },
    {
      id: 5,
      title: "Terms and Agreements",
      subtitle: "Confirm that you have read and agreed",
    },
    {
      id: 6,
      title: "Return policy and Warranty",
      subtitle: "Confirm that you have read and agreed",
    },
  ];
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    yogurtFlavor: "",
    size: "",
    fruitAddOns: "",
    delivery: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  //
  const searchParams = useSearchParams();
  const itemsParam = searchParams.get("items");
  const product = itemsParam
    ? JSON.parse(decodeURIComponent(itemsParam))
    : null;
  const { id, name, price, img, stock } = product;
  // const product = data["products in stock"][0];
  const handleCheckout = () => {
    router.push(`/checkout?items=${searchParams}`); // if (!response.ok)
    return;
  };


  const Card = ({
    index,
    children,
  }: {
    index: number;
    children: React.ReactNode;
  }) => {
    return (
      <div className={`rounded-lg p-3 border`}>
        <div className=""> {steps[index - 1].title}</div>

        {children}
        {index == step && (
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="rounded-lg bg-slate-50 border hover:bg-slate-300/50 px-5 py-3 text-sm font-medium text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            {step < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-lg bg-yellow-500 px-5 py-3 text-sm font-semibold text-white hover:bg-yellow-600"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckout}
                className="rounded-lg bg-yellow-500 px-5 py-3 text-sm font-semibold text-white hover:bg-yellow-600"
              >
                Submit
              </button>
            )}
          </div>
        )}
      </div>
    );
  };
  const add_ons = ["medium, ", "30% sugar, ", "to-go"];
  const questions = [{ question: "Portion size", selections: [{ id:1, answer:"small"},{id:2, answer:"medium"},{id:3, answer:"large"}]},{ question: "Sugar level", selections: [{ id:1, answer:"30% sugar"},{id:2, answer:"50% sugar"}]}, { question: "Ice level", selections: [{ id:1, answer:"30% ice"},{id:2, answer:"50% ice"}]},  ]
  return (
    <div className="flex flex-col justify-between w-full ">
      <Header />
      <div className="mt-29 sm:mt-50 w-full sm:w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2">
        {/* <div className="absolute top-0 left-0 ">back</div> */}
        <div className="cols-span-1 rounded-lg ml-auto w-full mb-10">
          {/* product image */}
          <div className="rounded-md px-1 flex sm:h-full justify-center items-center">
            <div className="relative rounded-lg aspect-square h-50 overflow-hidden group cursor-pointer">
              <Image
                src={img}
                alt=""
                fill
                className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100 rounded-lg"
              />
            </div>
          </div>
          <div className=" flex flex-col w-[80%] mx-auto space-y-1">
            <div className="text-xl">{name}</div>
            <div className="font-semibold text-xl">{price}</div>
            <div className=" ">{add_ons}</div>
            <div className=" ">{product["storage instructions"]}</div>
            <div className="text-sm ">{product.description}</div>
          </div>
        </div>
        {/* mobile - drawer, web - multi-step form */}
        <div className="cols-span-1 border rounded-t-lg">
          {questions.map((q) => (<div className=""><div className="">{q.question}</div>
            {isSelected && (<div className="">choices</div>)}
            </div>))}
          {/* <Accordion type="single" collapsible defaultValue="item-1" className="border-none">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
        </div>
      </div>
    </div>
  );
};

const Order = () => {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-zinc-500">
          {" "}
          Loading checkout forms...{" "}
        </div>
      }
    >
      {" "}
      <Page />{" "}
    </Suspense>
  );
};
const MultiForm = () => (
  <div className="cols-span-1 rounded-r-lg mr-auto w-full">
    {/* multistep form */}
    <form className="space-y-1 px-1">
      <Card index={1}>
        {step === 1 && (
          <div className="flex gap-1 justify-between ">
            {["original", "avocado", "matcha"].map((flavor) => (
              <div
                className={`relative overflow-hidden border group rounded-lg px-3 py-2 w-full aspect-square cursor-pointer ${
                  formData.yogurtFlavor === flavor ? "border-orange-300" : ""
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
                    "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png"
                  } // Fixed the fallback logic string
                  alt={""}
                  fill
                  className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                />
                <div className="absolute top-0 left-0 m-3 text-lg">
                  {flavor}
                </div>
                <div className="absolute top-0 right-0 m-3 text-sm">+ $1</div>
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
                className={`relative overflow-hidden rounded-lg border px-3 py-2 w-full aspect-square group cursor-pointer ${
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
                    "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png"
                  } // Fixed the fallback logic string
                  alt={""}
                  fill
                  className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                />
                <div className="absolute top-0 left-0 m-3 text-lg">{size}</div>
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
                  className={`relative overflow-hidden rounded-lg border px-3 py-2 w-full aspect-square group cursor-pointer ${
                    formData.fruitAddOns === fruit ? "border-orange-300" : ""
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
                      "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png"
                    } // Fixed the fallback logic string
                    alt={""}
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
            {["pick up", "delivery"].map((option) => (
              <div
                className={`relative overflow-hidden rounded-lg border px-3 py-2 w-full aspect-square group cursor-pointer ${
                  formData.delivery === option ? "border-orange-300" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    delivery: option,
                  }))
                }
              >
                <Image
                  src={
                    "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/Screen+Shot+2026-05-16+at+2.45.40+PM.png"
                  } // Fixed the fallback logic string
                  alt={""}
                  fill
                  className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                />
                <div className="absolute top-0 left-0 m-3 text-lg">
                  {option}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      <Card index={5}>
        {step === 5 && (
          <div className="flex gap-1">
            {/* terms and agreements */}
            <div className="flex gap-1">
              <input type="checkbox" />
              terms and agreements
            </div>
          </div>
        )}
      </Card>
      <Card index={6}>
        {step === 6 && (
          <div className="flex gap-1">
            {/* return policy */}
            <div className="flex gap-1">
              <input type="checkbox" />
              return policy
            </div>
          </div>
        )}
      </Card>
    </form>
  </div>
);
export default Order;
