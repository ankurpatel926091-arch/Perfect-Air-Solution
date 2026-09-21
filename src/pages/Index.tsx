import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import ProductCategories from "@/components/ProductCategories";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import HVACSolutions from "@/components/HVACSolutions";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import BrandMarquee from "@/components/BrandMarquee";
import BlogPreview from "@/components/BlogPreview";
import CTASection from "@/components/CTASection";

const Index = () => (
  <main className="overflow-hidden">
    {/* 1. Hero Section */}
    <Hero />
    
    {/* 2. About Perfect Air Solution */}
    <AboutPreview />

    {/* 3. Products / Solutions */}
    <ProductCategories />

    {/* 4. Services */}
    <Services />

    {/* 5. Why Choose Us */}
    <WhyChooseUs />

    {/* 6. Industries / Sectors */}
    <HVACSolutions />

    {/* 7. Projects / Gallery Preview */}
    <FeaturedProjects />

    {/* 8. Testimonials */}
    <Testimonials />

    {/* Brand Partners Marquee */}
    <BrandMarquee />

    {/* Latest Blog Preview */}
    <BlogPreview />

    {/* 9. Get a Quote CTA */}
    <CTASection />
  </main>
);

export default Index;