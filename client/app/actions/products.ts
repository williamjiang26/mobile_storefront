// export async function getProducts() {
//   try {
//     const res = await fetch("http://127.0.0.1:8000/api/product");

//     if (!res.ok) {
//       throw new Error(`Http error`);
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("failed");
//     return [];
//   }
// }

export async function getProducts() {
  try {
    const res = await fetch("http://127.0.0.1:8001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query GetProduct {
            product {
                id
                name
                img
            }
        }`,
      }),
    });
    if (!res.ok) {
      throw new Error(`Http error! status:`);
    }
    const json = await res.json();
    return json.data?.product || [];
  } catch (error) {
    console.error("GraphQL Fetch Failed", error);
    return [];
  }
}
