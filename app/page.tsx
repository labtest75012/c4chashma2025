"use client"
import FeaturedProducts from "@/components/featured-products"
import TestimonialCarousel from "@/components/testimonial-carousel"
import TrendingStyles from "@/components/trending-styles"
import VirtualTryOnBanner from "@/components/virtual-try-on-banner"
import WhatsAppButton from "@/components/whatsapp-button"
import EyeTestBanner from "@/components/eye-test-banner"
import WhatsAppBookingGuide from "@/components/whatsapp-booking-guide"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Truck, Award, Headphones } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      {/* Hero Section - NO PERSON PHOTOS */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          {/* Replace person photo with glasses showcase */}
          <div className="w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center opacity-40">
            <div className="grid grid-cols-3 gap-8 opacity-30">
              <img src="/images/glasses-1.jpg" alt="Premium Glasses" className="w-32 h-24 object-cover rounded-lg" />
              <img src="/images/glasses-2.jpg" alt="Designer Frames" className="w-32 h-24 object-cover rounded-lg" />
              <img src="/images/sunglasses-1.jpg" alt="Sunglasses" className="w-32 h-24 object-cover rounded-lg" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              See the World in
              <span className="text-red-500"> Style</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Discover our premium collection of eyewear that combines fashion, comfort, and quality craftsmanship. From
              classic frames to modern designs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact?service=eye-test">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-full transition-all duration-300"
                >
                  Book Eye Test
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors duration-300">
                <Shield className="h-8 w-8 text-red-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Premium materials and rigorous quality checks ensure durability and comfort for all our eyewear.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors duration-300">
                <Truck className="h-8 w-8 text-red-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Free delivery on orders above ₹1,500. Fast and secure shipping nationwide across India.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors duration-300">
                <Award className="h-8 w-8 text-red-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Hundreds of styles, colors, and designs for men, women, and kids to match your unique personality.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors duration-300">
                <Headphones className="h-8 w-8 text-red-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Professional optometrists provide personalized eye care and frame recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium eyewear, chosen for their exceptional quality and style.
            </p>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* WhatsApp Booking Guide */}
      <WhatsAppBookingGuide />

      {/* Eye Test Banner */}
      <EyeTestBanner />

      {/* Trending Styles */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Trending Styles 2024</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay ahead of the fashion curve with our latest trending eyewear styles for every occasion.
            </p>
          </div>
          <TrendingStyles />
        </div>
      </section>

      {/* Virtual Try-On Banner */}
      <VirtualTryOnBanner />

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Read genuine reviews from our satisfied customers across India.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Perfect Pair?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Visit our store or shop online to explore our collection of premium eyewear at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-red-500 hover:bg-gray-100 px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-10 py-4 text-lg rounded-full transition-all duration-300"
              onClick={() => {
                const message = "Hi, I'd like to book an eye test at C4 Chashma."
                const encodedMessage = encodeURIComponent(message)
                window.open(`https://wa.me/9001240004?text=${encodedMessage}`, "_blank")
              }}
            >
              Book Eye Test
            </Button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-xl"></div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </main>
  )
}
