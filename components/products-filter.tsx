"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProductsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState([500, 2000])

  const categories = [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
  ]

  const types = [
    { id: "power", label: "Power Glasses" },
    { id: "sunglasses", label: "Sunglasses" },
    { id: "reading", label: "Reading Glasses" },
    { id: "computer", label: "Computer Glasses" },
  ]

  const brands = [
    { id: "rayban", label: "Ray-Ban" },
    { id: "oakley", label: "Oakley" },
    { id: "vincent", label: "Vincent Chase" },
    { id: "john", label: "John Jacobs" },
  ]

  const handleFilter = () => {
    // In a real app, this would update the URL with filter parameters
    console.log("Filtering with:", { priceRange })
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${category}`)
  }

  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-bold text-lg mb-4">Filters</h2>

      <Accordion type="multiple" defaultValue={["category", "price", "type", "brand"]}>
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-2 h-auto text-left hover:bg-gray-100"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.label}
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[500, 2000]}
                min={0}
                max={5000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="type">
          <AccordionTrigger>Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {types.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox id={`type-${type.id}`} />
                  <Label htmlFor={`type-${type.id}`}>{type.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand.id}`} />
                  <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full mt-6 bg-red-500 hover:bg-red-600" onClick={handleFilter}>
        Apply Filters
      </Button>
    </div>
  )
}
