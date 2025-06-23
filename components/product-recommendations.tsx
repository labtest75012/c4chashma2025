import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for recommended products
const recommendedProducts = [
  {
    id: "2",
    name: "Cat Eye Sunglasses",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    category: "Women",
  },
  {
    id: "3",
    name: "Blue Light Blockers",
    price: 999,
    image: "/placeholder.svg?height=300&width=300",
    category: "Power Glasses",
  },
  {
    id: "4",
    name: "Aviator Sunglasses",
    price: 1499,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sunglasses",
  },
  {
    id: "5",
    name: "Rectangular Frames",
    price: 799,
    image: "/placeholder.svg?height=300&width=300",
    category: "Men",
  },
]

export default function ProductRecommendations({ currentProductId }: { currentProductId: string }) {
  // Filter out the current product from recommendations
  const filteredRecommendations = recommendedProducts.filter((product) => product.id !== currentProductId)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {filteredRecommendations.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <Card className="overflow-hidden group">
            <div className="overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="text-sm text-gray-500 mb-1">{product.category}</div>
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
              <p className="font-bold">₹{product.price}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
