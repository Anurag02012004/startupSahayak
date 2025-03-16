import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import TestimonialSection from "@/components/testimonial-section"
import FAQSection from "@/components/faq-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <FAQSection />

      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Validate Your Startup Idea?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Indian entrepreneurs who have transformed their ideas into successful businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link href="/signup">Get Started for Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

