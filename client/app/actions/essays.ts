import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";



const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BLOG_URL,
 });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const GET_ESSAY_QUERY = gql`
  query GetEssay($title:String!) {
    essay(title:$title) {
      id
      date
      title
      content
    }
  }`;
const GET_ESSAYS_QUERY = gql`
  query GetEssays {
    essays {
      id
      date
      title
      content
    }
  }
`;
export const fetchEssay = async (title: string) => {
  try {
    const response = await client.query({
      query: GET_ESSAY_QUERY,
      fetchPolicy: "network-only",
      variables: {
        title: title,
      },
    });
    return (response.data as any).essay;
  } catch (error) {
    console.error("Error fetching essays:", error);
  }
};
export const fetchEssays = async () => {
  try {
    const response = await client.query({
      query: GET_ESSAYS_QUERY,
      fetchPolicy: "network-only",
    });
    return (response.data as any).essays;
  } catch (error) {
    console.error("Error fetching essays:", error);
  }
};
