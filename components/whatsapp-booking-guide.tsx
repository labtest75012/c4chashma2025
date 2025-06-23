"use client"

import { MessageCircle, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { openWhatsApp, createGeneralInquiryMessage } from "@/utils/whatsapp-service"

export default function WhatsAppBookingGuide() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">How to Order via WhatsApp</h2>
          <p className="text-lg text-gray-600">
            We've made shopping easy - no account creation or login required. Simply follow these steps to place your
            order via WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Browse Products</h3>
            <p className="text-gray-600 mb-4">
              Explore our collection of eyewear and find the perfect frames that match your style.
            </p>
            <div className="bg-white p-3 rounded-lg">
              <Check className="h-5 w-5 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No login required</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Click "Order via WhatsApp"</h3>
            <p className="text-gray-600 mb-4">
              When you find a product you like, simply click the "Order via WhatsApp" button on the product page.
            </p>
            <div className="bg-white p-3 rounded-lg">
              <Check className="h-5 w-5 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Pre-filled message with product details</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Complete Your Order</h3>
            <p className="text-gray-600 mb-4">
              Confirm your order details with our team via WhatsApp and arrange for payment and delivery.
            </p>
            <div className="bg-white p-3 rounded-lg">
              <Check className="h-5 w-5 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Fast & personalized service</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Have questions about ordering via WhatsApp? Our team is ready to assist you!
          </p>
          <Button
            onClick={() => openWhatsApp(createGeneralInquiryMessage())}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chat with Us Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
