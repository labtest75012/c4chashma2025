"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { filterProducts, type Product } from "@/utils/product-service"
import { addToCart } from "@/utils/cart-service"

export default function ProductsGrid({ category }: { category?: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  // Load products on component mount or when category changes
  useEffect(() => {
    const filteredProducts = filterProducts({ category })
    setProducts(filteredProducts)

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [category])

  const toggleWishlist = (id: string) => {
    let newWishlist: string[]

    if (wishlist.includes(id)) {
      newWishlist = wishlist.filter((productId) => productId !== id)
      toast({
        title: "Removed from wishlist",
        description: "The product has been removed from your wishlist.",
      })
    } else {
      newWishlist = [...wishlist, id]
      toast({
        title: "Added to wishlist",
        description: "The product has been added to your wishlist.",
      })
    }

    setWishlist(newWishlist)
    localStorage.setItem("wishlist", JSON.stringify(newWishlist))
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: Number.parseInt(product.id.replace(/[^0-9]/g, "") || "1"),
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      color: product.colors[0],
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleImageError = (productId: string) => {
    setImageErrors((prev) => new Set(prev).add(productId))
  }

  const getImageSrc = (product: Product) => {
    if (imageErrors.has(product.id)) {
      // Fallback to a generic glasses placeholder
      return `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(product.category + " " + product.type)}&bg=f3f4f6&color=6b7280`
    }
    return product.image
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          whileHover={{ y: -10 }}
          className="group"
        >
          <Card className="overflow-hidden h-full flex flex-col bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl border-0">
            <div className="relative">
              <Link href={`/products/${product.id}`}>
                <div className="overflow-hidden bg-gray-50">
                  <Image
                    src={getImageSrc(product) || "/placeholder.svg"}
                    alt={`${product.name} - ${product.category} ${product.type}`}
                    width={400}
                    height={400}
                    className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index < 8}
                    onError={() => handleImageError(product.id)}
                  />
                </div>
              </Link>
              <div className="absolute top-0 right-0 p-3 flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`bg-white/90 backdrop-blur-sm rounded-full ${
                    wishlist.includes(product.id) ? "text-red-500" : "text-gray-500"
                  } hover:scale-110 transition-transform shadow-md`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-red-500" : ""}`} />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/90 backdrop-blur-sm rounded-full text-gray-500 hover:scale-110 transition-transform shadow-md"
                >
                  <Eye className="h-5 w-5" />
                  <span className="sr-only">Quick view</span>
                </Button>
              </div>
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.isNew && (
                  <Badge className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                    New
                  </Badge>
                )}
                {product.isBestSeller && (
                  <Badge className="bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded-full text-xs font-medium">
                    Best Seller
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-xs font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </div>
            <CardContent className="p-5 flex-grow flex flex-col">
              <div className="text-sm text-gray-500 mb-1 capitalize">
                {product.category} • {product.type}
              </div>
              <Link href={`/products/${product.id}`} className="hover:underline">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
              </Link>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{product.rating.toFixed(1)}</span>
                  </div>
                  {product.reviews && <span className="text-sm text-gray-500">({product.reviews})</span>}
                </div>
              )}

              <div className="flex items-center gap-2 mt-auto mb-4">
                <span className="font-bold text-xl">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-5 pt-0">
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white rounded-full"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
