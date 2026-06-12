"use client";
import React, { useEffect, useState } from "react";
import { getProducts } from "../actions/products";
import Footer from "../components/footer";
import Header from "../components/header";

const Page = () => {
  const [product, setProduct] = useState([] as any[]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      
      setProduct(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-zinc-300">
      <Header />
      <div className="flex-1 mt-30 overflow-y-auto space-y-3 bg-zinc-300 scroll-smooth font-sans dark:bg-black">
        {product[0]?.id}
        {product[0]?.name}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
