"use client";
import React, { useEffect, useState } from "react";
import { getProducts } from "../actions/products";
import Footer from "../components/footer";
import Header from "../components/header";

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-zinc-300">
      <Header />
      {/* scrollable */}
      <div className="flex-1 mt-30 overflow-y-auto space-y-3 bg-zinc-300 scroll-smooth font-sans dark:bg-black">
        {products.id}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
