"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

// GLASSES ONLY - NO PERSON PHOTOS - Pure Product Shots
const trendingStyles = [
  {
    id: 1,
    name: "Retro Round Frames",
    category: "Vintage Collection",
    image: "/images/glasses-1.jpg", // ✅ Standalone glasses only
    price: 899,
    trend: "Vintage Revival",
    description: "Classic round frames making a comeback",
  },
  {
    id: 2,
    name: "Bold Cat-Eye Frames",
    category: "Fashion Forward",
    image: "/images/glasses-2.jpg", // ✅ Standalone glasses only
    price: 799,
    trend: "Statement Pieces",
    description: "Make a bold fashion statement",
  },
  {
    id: 3,
    name: "Minimalist Wire Frames",
    category: "Modern Minimalism",
    image: "/images/glasses-3.jpg", // ✅ Standalone glasses only
    price: 699,
    trend: "Clean Lines",
    description: "Sleek and sophisticated design",
  },
  {
    id: 4,
    name: "Oversized Square Frames",
    category: "Contemporary Style",
    image: "/images/glasses-4.jpg", // ✅ Standalone glasses only
    price: 849,
    trend: "Bold & Beautiful",
    description: "Make a statement with oversized frames",
  },
]

export default function TrendingStyles() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {trendingStyles.map((style, index) => (
          <motion.div
            key={style.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image
                  src={style.image || "/placeholder.svg"}
                  alt={`${style.name} - Premium eyewear glasses product shot`}
                  width={300}
                  height={300}
                  className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to verified standalone glasses image
                    const target = e.target as HTMLImageElement
                    target.src = "/images/glasses-1.jpg"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Trend Badge */}
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {style.trend}
                </Badge>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full ${
                    favorites.includes(style.id) ? "text-red-500" : "text-gray-500"
                  } hover:scale-110 transition-all duration-300 shadow-lg`}
                  onClick={() => toggleFavorite(style.id)}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(style.id) ? "fill-red-500" : ""}`} />
                </Button>

                {/* Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{style.description}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="text-sm text-red-500 font-medium mb-2">{style.category}</div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">{style.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl text-gray-900">₹{style.price}</span>
                  <Link href={`/products?style=${style.id}`}>
                    <Button variant="outline" size="sm" className="rounded-full">
                      Explore
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/products">
          <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full">
            View All Trending Styles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
