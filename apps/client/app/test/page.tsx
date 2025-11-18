import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  const resProduct = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataProduct = await resProduct.json();

  const resOrder = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataOrder = await resOrder.json();

  console.log(dataProduct);
  console.log(dataOrder);
  return <div>TestPage</div>;
};

export default TestPage;
