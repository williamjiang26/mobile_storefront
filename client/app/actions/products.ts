export async function getProducts() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/product");

    if (!res.ok) {
      throw new Error(`Http error`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("failed");
    return [];
  }
}
