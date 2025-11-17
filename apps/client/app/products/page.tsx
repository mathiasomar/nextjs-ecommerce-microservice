import Container from "@/components/container";
import ProductListing from "@/components/product-listing";
import { Suspense } from "react";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <Container>
      <Suspense fallback={<div className="mt-5 w-full">Loading products...</div>}>
        <ProductListing category={category} params="products" />
      </Suspense>
    </Container>
  );
};

export default ProductsPage;
