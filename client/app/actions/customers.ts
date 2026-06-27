import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { fetchProduct } from "./products";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_CUSTOMERS_ENDPOINT,
});
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// get orders
// get cart
// get account information

const GET_CUSTOMER_QUERY = gql`
  query getCustomer($id: Int!) {
    customer(id: $id) {
      accountInformation {
        email
      }
      shoppingCart {
        productId
        isPurchased
      }
      orders {
        productId
        isPurchased
      }
    }
  }
`;
export const fetchCustomer = async () => {
  try {
    const response = await client.query({
      query: GET_CUSTOMER_QUERY,
      fetchPolicy: "network-only",
      variables: {
        id: 1,
      },
    });
    return (response.data as any)?.customer;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// update orders
// update cart
// update account in formation

const UPDATE_CUSTOMER_QUERY = gql`
  mutation UpdateCustomer($accountInfo: AccountInput!, $orders: OrdersInput!) {
    updateCustomerOrders(accountInformation: $accountInfo, orders: $orders) {
      accountInformation {
        email
      }
      shoppingCart {
        productId
        isPurchased
      }
      orders {
        productId
        isPurchased
      }
    }
  }
`;

export const updateCustomer = async (id: number) => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_CUSTOMER_QUERY,
      fetchPolicy: "network-only",
      variables: {
        accountInfo: {
          email: "new@gmail.com",
        },
        orders: {
          productId: id,
          isPurchased: false, // Routes it directly to shoppingCart!
        },
      },
    });
    return (response.data as any)?.updateCustomer;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
// delete order in shopping cart
