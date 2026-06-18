import React, { useState } from "react";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

//
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
  // uri: "https://products-service-kknp.onrender.com/graphql",
  // dev
  uri: "http://localhost:8007/graphql",
});
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
const Page = () => {
  const [products, setProducts] = useState([]);
  const fetchMyProducts = async () => {
    try {
      console.log("🚀 ~ Page ~ products:", products);
      const response = await client.query({
        query: GET_PRODUCTS_QUERY,
        fetchPolicy: "network-only",
      });
      setProducts(response.data.essays);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchMyProducts();
  return (
    <div className="flex flex-col">
      {products.map((p, index) => (
        <div key={index}>
          <div className="text-xl font-light">
            {/* date */}
            {p.date}
          </div>
          {/*  */}
          <div>
            {/* title */}
            {p.title}
          </div>
          <div>
            {/* content */}
            {p.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
