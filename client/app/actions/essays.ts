import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";



const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_ESSAYS_ENDPOINT,
});
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});



export const GET_PRODUCTS_QUERY = gql`
  query GetEssay(title:$id) {
    essay($id:id) {
      id
      name
      img
      stock
      price
    }
  }
`;