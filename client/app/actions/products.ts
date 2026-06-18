import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";



const httpLink = new HttpLink({
  uri: "https://products-service-kknp.onrender.com/graphql",
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
    }
  }
`;
 

// get by id
// const PRODUCT_ID_QUERY = gql`
//   query getById($id: Int!) {
//     product(id: $id) {
//       id
//       name
//       img
//       stock
//       price
//     }
//   }
// `;
// export const fetchById = async (id) => {
//   try {
//     const response = await client.query({
//       query: PRODUCT_ID_QUERY,
//       fetchPolicy: "network-only",
//     });
//     return response.data.product;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };
