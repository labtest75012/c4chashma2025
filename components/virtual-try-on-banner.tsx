"use client"

import { Button } from "@/components/ui/button"
import { Camera, Smartphone, Monitor, Glasses } from "lucide-react"
import Image from "next/image"

export default function VirtualTryOnBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Latest Technology
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">Try Before You Buy</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Experience our cutting-edge virtual try-on technology. See how different frames look on your face
                without leaving home. Get the perfect fit every time with our advanced camera system.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Take a Photo</h3>
                <p className="text-sm text-gray-600">Upload your photo or use your camera</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Try Frames</h3>
                <p className="text-sm text-gray-600">Browse and try hundreds of frames</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Monitor className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Perfect Fit</h3>
                <p className="text-sm text-gray-600">Find your perfect style and fit</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  // In a real app, this would open the virtual try-on feature
                  alert("Virtual Try-On feature coming soon!")
                }}
              >
                Try Now - It's Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
                onClick={() => {
                  window.open(
                    "https://wa.me/9001240004?text=Hi, I'd like to know more about virtual try-on feature.",
                    "_blank",
                  )
                }}
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* Replace person photo with glasses showcase */}
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
              <div className="text-center space-y-8">
                {/* Technology Icons */}
                <div className="flex justify-center space-x-6">
                  <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center">
                    <Glasses className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Glasses Showcase */}
                <div className="grid grid-cols-2 gap-4">
                  <Image
                    src="/images/glasses-1.jpg"
                    alt="Virtual Try-On Glasses Style 1"
                    width={150}
                    height={100}
                    className="rounded-lg shadow-lg"
                  />
                  <Image
                    src="/images/glasses-2.jpg"
                    alt="Virtual Try-On Glasses Style 2"
                    width={150}
                    height={100}
                    className="rounded-lg shadow-lg"
                  />
                  <Image
                    src="/images/sunglasses-1.jpg"
                    alt="Virtual Try-On Sunglasses Style 1"
                    width={150}
                    height={100}
                    className="rounded-lg shadow-lg"
                  />
                  <Image
                    src="/images/sunglasses-2.jpg"
                    alt="Virtual Try-On Sunglasses Style 2"
                    width={150}
                    height={100}
                    className="rounded-lg shadow-lg"
                  />
                </div>

                <div className="text-blue-600 font-bold text-xl">Virtual Try-On Technology</div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
