"use client";
import { useState } from "react";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

import Header from "../components/header";
import Footer from "../components/footer";
import { useRouter } from "@/node_modules/next/navigation";
export const GET_PRODUCTS_QUERY = gql`
  query GetEssays {
    essays {
      id
      date
      title
      content
    }
  }
`;
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BLOG_URL,
  // uri: "http://localhost:8007/graphql",
});
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
const Page = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const fetchMyProducts = async () => {
    try {
      const response = await client.query({
        query: GET_PRODUCTS_QUERY,
        fetchPolicy: "network-only",
      });
      setProducts((response.data as any).essays);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchMyProducts();
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      {/* toggle */}
      <div className="mt-28 flex py-1 gap-5 font-sans dark:bg-black overflow-x-auto justify-center">
        {products.map((p:any, index) => (
          <div
            key={index}
            className="border rounded-lg w-[80%] p-3 flex items-center"
            onClick={() => router.push(`/blog/${p.title}`)}
          >
            <div className="text-lg font-light">{p.date}</div>-
            <div>{p.title}</div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
