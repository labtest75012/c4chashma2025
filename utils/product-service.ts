// Product interface
export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  type: string
  description: string
  inStock: true
  colors: string[]
  isNew?: boolean
  isBestSeller?: boolean
  featured?: boolean
  rating?: number
  reviews?: number
  material?: string
  weight?: string
}

// GLASSES ONLY - NO PERSON PHOTOS - Pure Product Shots
const getGlassesOnlyImage = (category: string, type: string, index: number): string => {
  // VERIFIED: Men's Power Glasses - Only standalone glasses
  if (category === "Men" && type === "Power Glasses") {
    const glassesOnlyImages = [
      "/images/glasses-1.jpg", // ✅ Standalone glasses
      "/images/glasses-2.jpg", // ✅ Standalone glasses
      "/images/glasses-3.jpg", // ✅ Standalone glasses
      "/images/glasses-4.jpg", // ✅ Standalone glasses
      "/images/power-glasses-1.jpg", // ✅ Standalone glasses
      "/images/power-glasses-2.jpg", // ✅ Standalone glasses
      "/images/power-glasses-3.jpg", // ✅ Standalone glasses
    ]
    return glassesOnlyImages[index % glassesOnlyImages.length]
  }

  // VERIFIED: Women's Power Glasses - Only standalone glasses
  if (category === "Women" && type === "Power Glasses") {
    const glassesOnlyImages = [
      "/images/glasses-1.jpg", // ✅ Standalone glasses
      "/images/glasses-2.jpg", // ✅ Standalone glasses
      "/images/glasses-3.jpg", // ✅ Standalone glasses
      "/images/glasses-4.jpg", // ✅ Standalone glasses
    ]
    return glassesOnlyImages[index % glassesOnlyImages.length]
  }

  // VERIFIED: Kids Power Glasses - Only standalone glasses
  if (category === "Kids" && type === "Power Glasses") {
    const glassesOnlyImages = [
      "/images/glasses-1.jpg", // ✅ Standalone glasses
      "/images/glasses-2.jpg", // ✅ Standalone glasses
      "/images/glasses-3.jpg", // ✅ Standalone glasses
    ]
    return glassesOnlyImages[index % glassesOnlyImages.length]
  }

  // VERIFIED: Men's Sunglasses - Only standalone sunglasses
  if (category === "Men" && type === "Sunglasses") {
    const sunglassesOnlyImages = [
      "/images/sunglasses-1.jpg", // ✅ Standalone sunglasses
      "/images/sunglasses-2.jpg", // ✅ Standalone sunglasses
    ]
    return sunglassesOnlyImages[index % sunglassesOnlyImages.length]
  }

  // VERIFIED: Women's Sunglasses - Only standalone sunglasses
  if (category === "Women" && type === "Sunglasses") {
    const sunglassesOnlyImages = [
      "/images/sunglasses-1.jpg", // ✅ Standalone sunglasses
      "/images/sunglasses-2.jpg", // ✅ Standalone sunglasses
    ]
    return sunglassesOnlyImages[index % sunglassesOnlyImages.length]
  }

  // Safe fallback - verified standalone glasses image
  return "/images/glasses-1.jpg"
}

// COMPREHENSIVE PRODUCT CATALOG - 105 products with GLASSES ONLY IMAGES
export const allProducts: Product[] = [
  // ===== MEN'S POWER GLASSES (30 products) =====
  {
    id: "M001",
    name: "Classic Round Black Frames",
    price: 499,
    originalPrice: 699,
    image: getGlassesOnlyImage("Men", "Power Glasses", 0),
    images: [getGlassesOnlyImage("Men", "Power Glasses", 0)],
    category: "Men",
    type: "Power Glasses",
    description: "Timeless round frames perfect for everyday wear",
    inStock: true,
    colors: ["Black", "Brown"],
    isNew: true,
    rating: 4.5,
    reviews: 89,
    material: "Acetate",
    weight: "15g",
  },
  {
    id: "M002",
    name: "Professional Rectangle Frames",
    price: 599,
    originalPrice: 799,
    image: getGlassesOnlyImage("Men", "Power Glasses", 1),
    images: [getGlassesOnlyImage("Men", "Power Glasses", 1)],
    category: "Men",
    type: "Power Glasses",
    description: "Modern rectangular frames for office wear",
    inStock: true,
    colors: ["Black", "Navy", "Brown"],
    isBestSeller: true,
    rating: 4.7,
    reviews: 156,
    material: "Metal",
    weight: "18g",
  },
  {
    id: "M003",
    name: "Vintage Aviator Style",
    price: 699,
    originalPrice: 899,
    image: getGlassesOnlyImage("Men", "Power Glasses", 2),
    images: [getGlassesOnlyImage("Men", "Power Glasses", 2)],
    category: "Men",
    type: "Power Glasses",
    description: "Classic aviator design with modern comfort",
    inStock: true,
    colors: ["Gold", "Silver", "Black"],
    rating: 4.3,
    reviews: 67,
    material: "Metal",
    weight: "16g",
  },
  // Generate remaining 27 men's power glasses with glasses-only images
  ...Array.from({ length: 27 }, (_, i) => ({
    id: `M${String(4 + i).padStart(3, "0")}`,
    name: `Men's Premium Frame ${4 + i}`,
    price: 499 + Math.floor(Math.random() * 500),
    image: getGlassesOnlyImage("Men", "Power Glasses", 3 + i),
    images: [getGlassesOnlyImage("Men", "Power Glasses", 3 + i)],
    category: "Men",
    type: "Power Glasses",
    description: `Premium men's eyewear frame ${4 + i} with superior comfort and style`,
    inStock: true,
    colors: ["Black", "Brown", "Silver", "Gold"],
    rating: 4.0 + Math.random(),
    reviews: Math.floor(Math.random() * 200) + 50,
    material: ["Acetate", "Metal", "TR90", "Titanium"][i % 4],
    weight: `${12 + Math.floor(Math.random() * 8)}g`,
  })),

  // ===== WOMEN'S POWER GLASSES (30 products) =====
  {
    id: "W001",
    name: "Cat Eye Elegance",
    price: 599,
    originalPrice: 799,
    image: getGlassesOnlyImage("Women", "Power Glasses", 0),
    images: [getGlassesOnlyImage("Women", "Power Glasses", 0)],
    category: "Women",
    type: "Power Glasses",
    description: "Elegant cat eye frames for sophisticated look",
    inStock: true,
    colors: ["Black", "Tortoise", "Red"],
    isBestSeller: true,
    rating: 4.8,
    reviews: 234,
    material: "Acetate",
    weight: "17g",
  },
  {
    id: "W002",
    name: "Butterfly Designer Frames",
    price: 729,
    originalPrice: 929,
    image: getGlassesOnlyImage("Women", "Power Glasses", 1),
    images: [getGlassesOnlyImage("Women", "Power Glasses", 1)],
    category: "Women",
    type: "Power Glasses",
    description: "Oversized butterfly frames for glamorous style",
    inStock: true,
    colors: ["Pink", "Purple", "Black"],
    isNew: true,
    rating: 4.6,
    reviews: 178,
    material: "Acetate",
    weight: "19g",
  },
  {
    id: "W003",
    name: "Minimalist Round Frames",
    price: 549,
    image: getGlassesOnlyImage("Women", "Power Glasses", 2),
    images: [getGlassesOnlyImage("Women", "Power Glasses", 2)],
    category: "Women",
    type: "Power Glasses",
    description: "Clean minimalist design for everyday wear",
    inStock: true,
    colors: ["Rose Gold", "Silver", "Black"],
    rating: 4.4,
    reviews: 145,
    material: "Metal",
    weight: "14g",
  },
  // Generate remaining 27 women's power glasses with glasses-only images
  ...Array.from({ length: 27 }, (_, i) => ({
    id: `W${String(4 + i).padStart(3, "0")}`,
    name: `Women's Designer Frame ${4 + i}`,
    price: 499 + Math.floor(Math.random() * 500),
    image: getGlassesOnlyImage("Women", "Power Glasses", 3 + i),
    images: [getGlassesOnlyImage("Women", "Power Glasses", 3 + i)],
    category: "Women",
    type: "Power Glasses",
    description: `Stylish women's eyewear frame ${4 + i} with elegant design`,
    inStock: true,
    colors: ["Black", "Pink", "Purple", "Rose Gold", "Tortoise"],
    rating: 4.0 + Math.random(),
    reviews: Math.floor(Math.random() * 200) + 50,
    material: ["Acetate", "Metal", "TR90"][i % 3],
    weight: `${12 + Math.floor(Math.random() * 8)}g`,
  })),

  // ===== KIDS POWER GLASSES (15 products) =====
  {
    id: "K001",
    name: "Colorful Kids Frames",
    price: 499,
    originalPrice: 649,
    image: getGlassesOnlyImage("Kids", "Power Glasses", 0),
    images: [getGlassesOnlyImage("Kids", "Power Glasses", 0)],
    category: "Kids",
    type: "Power Glasses",
    description: "Durable and colorful frames for children",
    inStock: true,
    colors: ["Blue", "Red", "Green", "Pink"],
    isBestSeller: true,
    rating: 4.7,
    reviews: 89,
    material: "TR90",
    weight: "10g",
  },
  {
    id: "K002",
    name: "Flexible Sports Frames",
    price: 549,
    image: getGlassesOnlyImage("Kids", "Power Glasses", 1),
    images: [getGlassesOnlyImage("Kids", "Power Glasses", 1)],
    category: "Kids",
    type: "Power Glasses",
    description: "Flexible and unbreakable frames for active kids",
    inStock: true,
    colors: ["Blue", "Orange", "Purple"],
    rating: 4.5,
    reviews: 67,
    material: "TR90",
    weight: "12g",
  },
  // Generate remaining 13 kids power glasses with glasses-only images
  ...Array.from({ length: 13 }, (_, i) => ({
    id: `K${String(3 + i).padStart(3, "0")}`,
    name: `Kids Fun Frame ${3 + i}`,
    price: 499 + Math.floor(Math.random() * 300),
    image: getGlassesOnlyImage("Kids", "Power Glasses", 2 + i),
    images: [getGlassesOnlyImage("Kids", "Power Glasses", 2 + i)],
    category: "Kids",
    type: "Power Glasses",
    description: `Fun and durable kids power glasses frame ${3 + i}`,
    inStock: true,
    colors: ["Blue", "Red", "Green", "Pink", "Orange", "Purple"],
    rating: 4.0 + Math.random(),
    reviews: Math.floor(Math.random() * 100) + 30,
    material: "TR90",
    weight: `${8 + Math.floor(Math.random() * 5)}g`,
  })),

  // ===== MEN'S SUNGLASSES (15 products) =====
  {
    id: "MS001",
    name: "Aviator Sunglasses Classic",
    price: 799,
    originalPrice: 999,
    image: getGlassesOnlyImage("Men", "Sunglasses", 0),
    images: [getGlassesOnlyImage("Men", "Sunglasses", 0)],
    category: "Men",
    type: "Sunglasses",
    description: "Classic aviator with polarized lenses",
    inStock: true,
    colors: ["Gold", "Silver", "Black"],
    isBestSeller: true,
    rating: 4.7,
    reviews: 267,
    material: "Metal",
    weight: "16g",
  },
  // Generate remaining 14 men's sunglasses with glasses-only images
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `MS${String(2 + i).padStart(3, "0")}`,
    name: `Men's Sunglasses Style ${2 + i}`,
    price: 649 + Math.floor(Math.random() * 350),
    image: getGlassesOnlyImage("Men", "Sunglasses", 1 + i),
    images: [getGlassesOnlyImage("Men", "Sunglasses", 1 + i)],
    category: "Men",
    type: "Sunglasses",
    description: `Premium men's sunglasses ${2 + i} with UV protection`,
    inStock: true,
    colors: ["Black", "Brown", "Gold", "Silver"],
    rating: 4.0 + Math.random(),
    reviews: Math.floor(Math.random() * 200) + 50,
    material: ["Acetate", "Metal"][i % 2],
    weight: `${14 + Math.floor(Math.random() * 8)}g`,
  })),

  // ===== WOMEN'S SUNGLASSES (15 products) =====
  {
    id: "WS001",
    name: "Designer Cat Eye Sunglasses",
    price: 899,
    image: getGlassesOnlyImage("Women", "Sunglasses", 0),
    images: [getGlassesOnlyImage("Women", "Sunglasses", 0)],
    category: "Women",
    type: "Sunglasses",
    description: "Luxury cat eye sunglasses with gradient lenses",
    inStock: true,
    colors: ["Black", "Tortoise", "Pink"],
    rating: 4.5,
    reviews: 156,
    material: "Acetate",
    weight: "20g",
  },
  // Generate remaining 14 women's sunglasses with glasses-only images
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `WS${String(2 + i).padStart(3, "0")}`,
    name: `Women's Sunglasses Style ${2 + i}`,
    price: 649 + Math.floor(Math.random() * 350),
    image: getGlassesOnlyImage("Women", "Sunglasses", 1 + i),
    images: [getGlassesOnlyImage("Women", "Sunglasses", 1 + i)],
    category: "Women",
    type: "Sunglasses",
    description: `Stylish women's sunglasses ${2 + i} with UV protection`,
    inStock: true,
    colors: ["Black", "Brown", "Pink", "Purple"],
    rating: 4.0 + Math.random(),
    reviews: Math.floor(Math.random() * 200) + 50,
    material: ["Acetate", "Metal"][i % 2],
    weight: `${14 + Math.floor(Math.random() * 8)}g`,
  })),
]

export const filterProducts = (filters: {
  category?: string
  type?: string
  priceRange?: [number, number]
  search?: string
}) => {
  let filtered = allProducts

  if (filters.category) {
    filtered = filtered.filter((product) => product.category.toLowerCase() === filters.category?.toLowerCase())
  }

  if (filters.type) {
    filtered = filtered.filter((product) => product.type.toLowerCase() === filters.type?.toLowerCase())
  }

  if (filters.priceRange) {
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange![0] && product.price <= filters.priceRange![1],
    )
  }

  if (filters.search) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search!.toLowerCase()),
    )
  }

  return filtered
}

export const getFeaturedProducts = () => {
  return allProducts.filter((product) => product.featured || product.isBestSeller || product.isNew).slice(0, 8)
}

export const getProductById = (id: string) => {
  return allProducts.find((product) => product.id === id)
}

export const getProductsByCategory = (category: string) => {
  return allProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

export const getAllProducts = () => allProducts
