import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { Workflow } from "@/components/sections/Workflow";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <Hero />
      <FeatureCards />
      <Workflow />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}