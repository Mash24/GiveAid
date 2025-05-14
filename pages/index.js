import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ImpactSection from "@/components/home/ImpactSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import Head from "next/head";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Charity Connect - Make a difference today</title>
        <meta name="description" content="Connecting charities with volunteers" />
      </Head>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ImpactSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
