"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Phone, Eye, Stethoscope } from "lucide-react"
import Image from "next/image"

export default function EyeTestBanner() {
  const handleBookAppointment = () => {
    const message =
      "Hi, I'd like to book an eye test appointment at C4 Chashma. Please let me know the available slots."
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/9001240004?text=${encodedMessage}`, "_blank")
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            {/* Replace person photo with glasses and equipment illustration */}
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
              <div className="text-center space-y-8">
                {/* Eye Test Equipment Icons */}
                <div className="flex justify-center space-x-8">
                  <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center">
                    <Eye className="h-10 w-10 text-white" />
                  </div>
                  <div className="bg-emerald-500 w-20 h-20 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-10 w-10 text-white" />
                  </div>
                </div>

                {/* Glasses Display */}
                <div className="space-y-4">
                  <Image
                    src="/images/glasses-1.jpg"
                    alt="Professional Eye Test Glasses"
                    width={200}
                    height={150}
                    className="mx-auto rounded-lg shadow-lg"
                  />
                  <Image
                    src="/images/glasses-2.jpg"
                    alt="Eye Examination Frames"
                    width={180}
                    height={135}
                    className="mx-auto rounded-lg shadow-lg"
                  />
                </div>

                <div className="text-green-600 font-bold text-xl">Professional Eye Care</div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Professional Care
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">Free Eye Test</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Get a comprehensive eye examination by our certified optometrists. Early detection and proper care
                ensure your vision stays healthy for years to come.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Easy Booking</h3>
                  <p className="text-sm text-gray-600">Book via WhatsApp in seconds</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quick Service</h3>
                  <p className="text-sm text-gray-600">Complete test in 30 minutes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Multiple Locations</h3>
                  <p className="text-sm text-gray-600">Bandra & Andheri stores</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Expert Care</h3>
                  <p className="text-sm text-gray-600">Certified optometrists</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-lg mb-3 text-gray-900">What's Included:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Complete vision screening
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Eye health examination
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Prescription consultation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Frame fitting guidance
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handleBookAppointment}
              >
                Book Free Eye Test
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-50 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
                onClick={() => {
                  window.open("tel:+919001240004", "_blank")
                }}
              >
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
