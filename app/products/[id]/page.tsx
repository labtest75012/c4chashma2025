import ProductPageClient from "./ProductPageClient"

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

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return {
      title: "Product Not Found | C4 Chashma",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: `${product.name} | C4 Chashma`,
    description: product.description.substring(0, 160),
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageClient params={params} />
}
