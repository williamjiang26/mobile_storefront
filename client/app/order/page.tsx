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
  const searchParams = useSearchParams();

  const itemsParam = searchParams.get("items");

  const product = itemsParam
    ? JSON.parse(decodeURIComponent(itemsParam))
    : null;
  const { id, name, price, img, stock } = product;
  // const product = data["products in stock"][0];
  const [formData, setFormData] = useState({
    yogurtFlavor: "",
    size: "",
    fruitAddOns: new Set<string>([]),
    sugar: "",
    ice: "",
    delivery: "",
  });
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
      title: "Sugar level",
      subtitle: "Select a level:",
    },
    //
    { id: 5, title: "Ice level", subtitle: "Select a level:" },
    {
      id: 6,
      title: "Delivery",
      subtitle: "Pick Up or Delivery?",
    },
    {
      id: 7,
      title: "Terms and Agreements",
      subtitle: "Confirm that you have read and agreed",
    },
    {
      id: 8,
      title: "Return policy and Warranty",
      subtitle: "Confirm that you have read and agreed",
    },
  ];
  const [step, setStep] = useState(1);
  const router = useRouter();
  const handleCheckout = () => {
    router.push(`/checkout?${searchParams}`);
    return;
  };
  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const handleFruit = (fruit:string) => {
    // if fruit one is selected, select fruit two, if fruit 2 is selected, do not add,
    // if fruit one or two is selected again deselect fruit
    const { fruitAddOns, ...data } = formData;
    if (fruitAddOns.has(fruit)) {
      fruitAddOns.delete(fruit);
    } else if (fruitAddOns.size < 2) {
      fruitAddOns.add(fruit);
    } else {
      throw new Error("you can add fruit on the side");
    }
    setFormData({fruitAddOns: new Set(fruitAddOns), ...data});
  };
  const MultiForm = () => {
    const Card = ({
      index,
      children,
    }: {
      index: number;
      children: React.ReactNode;
    }) => (
      <div className={`sm:rounded-lg sm:border border-b p-3`}>
        <div className="">{steps[index - 1].title}</div> {children}{" "}
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
    return (
      <div className="cols-span-1 mr-auto w-full border rounded-t-lg sm:border-0">
        {/* multistep form */}
        <form className="space-y-1 px-1">
          <Card index={1}>
            {step === 1 && (
              <div className="flex gap-1 justify-between ">
                {["original", "avocado", "matcha"].map((flavor) => (
                  <div
                    className={`relative overflow-hidden border group rounded-lg px-3 py-2 w-full aspect-square cursor-pointer ${
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
                      src={img} // Fixed the fallback logic string
                      alt={""}
                      fill
                      className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                    />
                    <div className="absolute top-0 left-0 m-3 text-lg">
                      {flavor}
                    </div>
                    <div className="absolute top-0 right-0 m-3 text-sm">
                      + $1
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
                      src={img} // Fixed the fallback logic string
                      alt={""}
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
                      className={`relative overflow-hidden rounded-lg border px-3 py-2 w-full aspect-square group cursor-pointer ${
                        formData.fruitAddOns.has(fruit)
                          ? "border-orange-300"
                          : ""
                      }`}
                      onClick={() => {
                        handleFruit(fruit);
                      }}
                    >
                      <Image
                        src={img} // Fixed the fallback logic string
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
                {["30% sugar", "50% sugar"].map((fruit) => (
                  <div
                    className={`relative overflow-hidden rounded-lg border px-3 py-2 w-full aspect-square group cursor-pointer ${
                      formData.sugar === fruit ? "border-orange-300" : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        sugar: fruit,
                      }))
                    }
                  >
                    <Image
                      src={img} // Fixed the fallback logic string
                      alt={""}
                      fill
                      className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                    />
                    <div className="absolute top-0 left-0 m-3 text-lg">
                      {fruit}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card index={5}>
            {step === 5 && (
              <div className="flex gap-1">
                {["30% ice", "50% ice"].map((fruit) => (
                  <div
                    className={`relative overflow-hidden rounded-lg border px-3 py-2 w-full aspect-square group cursor-pointer ${
                      formData.ice === fruit ? "border-orange-300" : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        ice: fruit,
                      }))
                    }
                  >
                    <Image
                      src={img} // Fixed the fallback logic string
                      alt={""}
                      fill
                      className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
                    />
                    <div className="absolute top-0 left-0 m-3 text-lg">
                      {fruit}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card index={6}>
            {step === 6 && (
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
                      src={img} // Fixed the fallback logic string
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
          <Card index={7}>
            {step === 7 && (
              <div className="flex gap-1">
                {/* terms and agreements */}
                <div className="flex gap-1">
                  <input type="checkbox" />
                  terms and agreements
                </div>
              </div>
            )}
          </Card>
          <Card index={8}>
            {step === 8 && (
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
  };
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
            <div className="font-semibold text-xl">${price}</div>
            <div className="text-xs">
              {formData?.yogurtFlavor} {formData?.size} {[...formData?.fruitAddOns].join(" ")}{" "}
              {formData?.sugar} {formData?.ice} {formData?.delivery}
            </div>
            <div className="">{product["storage instructions"]}</div>
            <div className="text-sm ">{product.description}</div>
          </div>
        </div>
        {/* mobile - drawer, web - multi-step form */}
        <MultiForm />
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

export default Order;
