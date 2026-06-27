import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";



const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_PRODUCTS_ENDPOINT,
});
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
export const GET_PRODUCTS_QUERY = gql`
  query products {
    products {
      id
      name
      img
      stock
      price
      priceId
    }
  }
`;
 
 export const GET_PRODUCT_QUERY = gql`
  query product($id: Int!) {
    product(id: $id) {
      id
      name
      img
      stock
      price
      priceId
    }
  }
`;
export const fetchProduct = async (id: number) => {
  try {
    const response = await client.query({
      query: GET_PRODUCT_QUERY,
      fetchPolicy: "network-only",
      variables: {
        id: id,
      },
    });
    return ((response.data as any)?.product); 
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};