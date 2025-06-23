"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { CardContent } from "@/components/ui/card"
import { getFeaturedProducts } from "@/utils/product-service"

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<string[]>([])
  const { toast } = useToast()

  // Get featured products from our service
  const featuredProducts = getFeaturedProducts()

  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((productId) => productId !== id))
      toast({
        title: "Removed from wishlist",
        description: "The product has been removed from your wishlist.",
      })
    } else {
      setWishlist([...wishlist, id])
      toast({
        title: "Added to wishlist",
        description: "The product has been added to your wishlist.",
      })
    }
  }

  const addToCart = (product: any) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium eyewear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(product.category)}+Glasses`
                    }}
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white">New</Badge>}
                    {product.isBestSeller && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Best Seller</Badge>
                    )}
                    {product.originalPrice && (
                      <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>
                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full ${
                      wishlist.includes(product.id) ? "text-red-500" : "text-gray-500"
                    } hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-red-500" : ""}`} />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews || 0})</span>
                  </div>

                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-blue-200 hover:bg-blue-50"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
