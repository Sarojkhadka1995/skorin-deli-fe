import Banner from "@/components/features/home/banner";
import Categories from "@/components/features/home/categories";
import FAQAccordion from "@/components/features/home/faq";
import Newsletter from "@/components/features/home/newsletter";
import Services from "@/components/features/home/our-services";
import ProductDetail from "@/components/features/home/product-detail";
import ProductList from "@/components/features/home/product-list";
import TestimonialCarousel from "@/components/features/home/testimonials";

export default function Home() {
  return (
    <div>
      <Banner />
      <ProductList />
      <Categories />
      <Services />
      <ProductDetail />
      <FAQAccordion />
      <TestimonialCarousel />
      <Newsletter />
    </div>
  );
}
