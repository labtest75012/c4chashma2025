"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Heart, ShoppingCart, Check, Star, Truck, RotateCcw, Shield, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WhatsAppButton from "@/components/whatsapp-button"
import ProductRecommendations from "@/components/product-recommendations"
import { useToast } from "@/components/ui/use-toast"
import { openWhatsApp, createProductInquiryMessage, createEyeTestBookingMessage } from "@/utils/whatsapp-service"
// Add import for cart service
import { addToCart as addItemToCart } from "@/utils/cart-service"

// Mock data for product details
const products = [
  {
    id: "1",
    name: "Classic Round Glasses",
    price: 899,
    description:
      "These classic round glasses feature a timeless design that never goes out of style. The lightweight metal frame provides comfort for all-day wear, while the adjustable nose pads ensure a perfect fit. Suitable for both men and women, these versatile glasses can be fitted with prescription lenses or used as a fashion accessory.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Men",
    type: "Power Glasses",
    inStock: true,
    colors: ["Black", "Gold", "Silver"],
    features: [
      "Lightweight metal frame",
      "Adjustable nose pads",
      "Spring hinges for comfort",
      "UV protection coating",
      "Anti-glare option available",
    ],
    specifications: {
      "Frame Material": "Metal",
      "Frame Width": "135mm",
      "Lens Width": "50mm",
      "Bridge Width": "20mm",
      "Temple Length": "145mm",
      Weight: "15g",
    },
  },
]

export default function ProductPageClient({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [inWishlist, setInWishlist] = useState(false)
  const { toast } = useToast()

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const handleWhatsAppOrder = () => {
    const message = createProductInquiryMessage(product.name, product.price)
    openWhatsApp(message)
  }

  const handleBookEyeTest = () => {
    const message = createEyeTestBookingMessage()
    openWhatsApp(message)
  }

  const toggleWishlist = () => {
    setInWishlist(!inWishlist)
    toast({
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: inWishlist
        ? "The product has been removed from your wishlist."
        : "The product has been added to your wishlist.",
    })
  }

  // Update the addToCart function
  const addToCart = () => {
    // Add the product to cart
    addItemToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      color: product.colors[0], // Default to first color if none selected
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden cursor-pointer ${selectedImage === index ? "ring-2 ring-red-500" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - View ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
              <span>/</span>
              <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:underline">
                {product.category}
              </Link>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">(24 reviews)</span>
            </div>
          </div>

          <div className="text-3xl font-bold">₹{product.price}</div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button key={color} variant="outline" className="border-2 hover:bg-gray-100">
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-5 w-5" />
              <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="bg-black hover:bg-gray-800 text-white" onClick={addToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  className={
                    inWishlist
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-white hover:bg-gray-100 text-black border border-gray-300"
                  }
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-5 w-5 mr-2 ${inWishlist ? "" : "fill-none"}`} />
                  {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              {/* WhatsApp Order Button - More Prominent */}
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg"
                onClick={handleWhatsAppOrder}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Order via WhatsApp
              </Button>

              {/* Book Eye Test Button */}
              <Button
                onClick={handleBookEyeTest}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Eye Test via WhatsApp
              </Button>
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-gray-500">On orders over ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-gray-500">7 days return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Warranty</p>
                  <p className="text-sm text-gray-500">1 year warranty</p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-gray-700">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="pt-4">
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="py-2 border-b">
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Product Recommendations */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <ProductRecommendations currentProductId={params.id} />
      </section>

      <WhatsAppButton />
    </main>
  )
}
