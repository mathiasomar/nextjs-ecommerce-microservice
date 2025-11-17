import Container from "@/components/container";
import Features from "@/components/features";
import FooterSection from "@/components/footer";
import ProductListing from "@/components/product-listing";
import HeroSection from "@/components/sections/hero-section";
import SectionHeader from "@/components/sections/section-header";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

const Home = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <HeroSection />
      <Features />

      {/* Latest products */}
      <section className="py-2 md:py-4 w-full h-auto">
        <Container>
          <SectionHeader
            title="Check out what's new"
            description="Latest of the trends we have to offer"
          />

          <Separator className="my-4" />

          {/* Category Tab */}
          <Suspense
            fallback={<div className="mt-5 w-full">Loading products...</div>}
          >
            <ProductListing params="homepage" />
          </Suspense>
          <FooterSection />
        </Container>
      </section>
    </div>
  );
};

export default Home;
