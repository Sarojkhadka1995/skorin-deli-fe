import Banner from "@/components/features/home/banner";
import Categories from "@/components/features/home/categories";
// import FavouriteCategories from "@/components/features/home/categories/favourite-categories";
// import FeaturedProducts from "@/components/features/home/featured-products";
import LatestArrivals from "@/components/features/home/latest-arrivals";
// import FAQAccordion from "@/components/features/home/faq";
import Newsletter from "@/components/features/home/newsletter";
import Services from "@/components/features/home/our-services";
// import ProductDetail from "@/components/features/home/product-detail";
// import ProductList from "@/components/features/home/product-list";
import SpecialProductList from "@/components/features/home/special-products";
// import TestimonialCarousel from "@/components/features/home/testimonials";

export default function Home() {
  return (
    <div>
      <Banner />
      <SpecialProductList />
      <LatestArrivals />
      {/* <FeaturedProducts /> */}
      {/* <ProductList /> */}
      <Categories />
      {/* <FavouriteCategories /> */}
      <Services />
      {/* <ProductDetail /> */}
      {/* <FAQAccordion /> */}
      {/* <TestimonialCarousel /> */}
      <Newsletter />
    </div>
  );
}
