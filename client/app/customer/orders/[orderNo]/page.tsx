"use client";
import Image from "next/image";
import Header from "@/app/components/header";

// import React from "react";
// import { Minus, Plus } from "lucide-react";
// import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

const Page = () => {
  const c = {
    itemName: "Burrito ",
    points: "10",
    img: "https://warehouse-inventory-management.s3.us-east-1.amazonaws.com/sousvidechicken.png",
  };
  return (
    <div className="max-h-screen w-full flex flex-col">
      <Header />
      <div className="mt-27 h-screen w-[90%] mx-auto rounded-lg">
        <div className="h-25 flex flex-col">
          <div className="text-xl font-light"> # 16000</div>
          <div className="text-sm">9/25/24</div>
        </div>
        <div className="h-[50vh] flex flex-col">
          <div className="rounded-lg w-full h-56 flex justify-between items-center">
            <div className="relative overflow-hidden rounded-lg aspect-square w-15  mr-5">
              <Image
                src={c["img"]}
                alt=""
                fill
                className="object-cover scale-110 transition-transform duration-500 ease-out group-hover:scale-100"
              />
            </div>
            <div className=" ">{c.itemName}</div>
            <div className="flex ml-auto"> {c.points}</div>
          </div>
          <div className="flex ml-auto justify-between">
            <div className=" ">total </div>
            <div className="ml-10"> {c.points}</div>
          </div>
        </div>
        <div className="flex justify-center">
          <Review />
        </div>
      </div>
    </div>
  );
};

export default Page;

const Review = () => {
  const handleSubmit = () => {};
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">leave a review + 10 points</Button>
      </DrawerTrigger>
      <DrawerContent>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-1 mx-auto max-w-sm h-[70vh]"
        >
          <FieldLegend>Thank you for your feedback </FieldLegend>
          <FieldDescription>
            As a reward for helping us improve you get +10 points
          </FieldDescription>
          <Field className="my-3">
            <FieldLabel htmlFor="rating"> Rating:</FieldLabel>
            <Slider
              defaultValue={[3]}
              max={5}
              step={0.5}
              className="mx-auto w-full max-w-xs"
            />
          </Field>
          <div className="flex gap-1">
            <Field>
              <FieldLabel htmlFor="name"> Name:</FieldLabel>
              <Input id="name" type="name" placeholder="Bob" />
            </Field>
            <Field>
              <FieldLabel htmlFor="location"> Location:</FieldLabel>
              <Input
                id="location"
                type="location"
                placeholder="san francisco, ca"
              />
            </Field>
          </div>
          <Field className="my-3">
            <FieldLabel htmlFor="review"> Review:</FieldLabel>
            <textarea placeholder="Review" className="border rounded-lg p-1" />
            <FieldDescription>
              Share your thoughts about our service.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="images"> Images:</FieldLabel>
             <div className="flex"> <div className="aspect-square border rounded-lg w-25 text-gray-500 flex justify-center items-center text-xl">+</div></div>
            <FieldDescription>
              Share photos of your product
            </FieldDescription>
          </Field>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
