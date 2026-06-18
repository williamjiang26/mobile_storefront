import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";



const httpLink = new HttpLink({
  uri: "https://products-service-kknp.onrender.com/graphql",
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
const GET_PRODUCTS_QUERY = gql`
  query products {
    products {
      id
      name
      img
      stock
      price
    }
  }
`;
export const fetchMyProducts = async (setProducts) => {
  try {
    const response = await client.query({
      query: GET_PRODUCTS_QUERY,
      fetchPolicy: "network-only",
    });
    setProducts(response.data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// get by id
const PRODUCT_ID_QUERY = gql`
  query getById($id: Int!) {
    product(id: $id) {
      id
      name
      img
      stock
      price
    }
  }
`;
export const fetchById = async (id) => {
  try {
    const response = await client.query({
      query: PRODUCT_ID_QUERY,
      fetchPolicy: "network-only",
    });
    return response.data.product;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
