"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Tag, User } from "lucide-react"

// Mock data - in a real app, this would come from an API or database
const posts = [
  {
    id: "1",
    title: "Top 5 Eyewear Trends for 2023",
    slug: "top-5-eyewear-trends-2023",
    excerpt: "Discover the hottest eyewear trends that are dominating the fashion scene this year.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    author: "Sarah Johnson",
    category: "Fashion",
    tags: ["trends", "fashion", "eyewear", "2023"],
    publishDate: "2023-03-15",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "How to Choose the Right Frames for Your Face Shape",
    slug: "choose-right-frames-face-shape",
    excerpt: "Learn how to select the perfect eyeglass frames that complement your unique face shape.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    author: "Michael Chen",
    category: "Guides",
    tags: ["face shape", "frames", "style guide", "eyeglasses"],
    publishDate: "2023-02-28",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Understanding Blue Light Glasses: Do They Really Work?",
    slug: "understanding-blue-light-glasses",
    excerpt: "An in-depth look at blue light glasses and their effectiveness in reducing digital eye strain.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    author: "Dr. Emily Rodriguez",
    category: "Health",
    tags: ["blue light", "digital eye strain", "eye health", "computer glasses"],
    publishDate: "2023-04-05",
    readTime: "10 min read",
  },
  {
    id: "4",
    title: "The History of Eyeglasses: From Necessity to Fashion Statement",
    slug: "history-of-eyeglasses",
    excerpt: "Explore the fascinating evolution of eyeglasses from simple vision aids to fashion accessories.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    author: "Prof. James Wilson",
    category: "History",
    tags: ["history", "eyeglasses", "fashion", "evolution"],
    publishDate: "2023-01-20",
    readTime: "12 min read",
  },
  {
    id: "5",
    title: "Caring for Your Eyeglasses: Tips for Longevity",
    slug: "caring-for-eyeglasses-tips",
    excerpt: "Learn how to properly clean and maintain your eyeglasses to ensure they last for years.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    author: "Lisa Thompson",
    category: "Care",
    tags: ["maintenance", "cleaning", "eyeglasses", "care tips"],
    publishDate: "2023-05-10",
    readTime: "6 min read",
  },
  {
    id: "6",
    title: "Sunglasses: More Than Just a Fashion Accessory",
    slug: "sunglasses-more-than-fashion",
    excerpt: "Discover why sunglasses are essential for eye health and how to choose the right pair for protection.",
    featuredImage: "/placeholder.svg?height=400&width=600",
    author: "Dr. Emily Rodriguez",
    category: "Health",
    tags: ["sunglasses", "UV protection", "eye health", "summer"],
    publishDate: "2023-06-01",
    readTime: "7 min read",
  },
]

const categories = [
  { name: "All", slug: "all", count: posts.length },
  { name: "Fashion", slug: "fashion", count: posts.filter((post) => post.category === "Fashion").length },
  { name: "Health", slug: "health", count: posts.filter((post) => post.category === "Health").length },
  { name: "Guides", slug: "guides", count: posts.filter((post) => post.category === "Guides").length },
  { name: "History", slug: "history", count: posts.filter((post) => post.category === "History").length },
  { name: "Care", slug: "care", count: posts.filter((post) => post.category === "Care").length },
]

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  // Filter posts based on active category
  const [activeCategory, setActiveCategory] = useState("all")
  const filteredPosts = posts.filter(
    (post) => activeCategory === "all" || post.category.toLowerCase() === activeCategory.toLowerCase(),
  )

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">C4 Chashma Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Insights, guides, and news about eyewear, eye health, and the latest trends in the optical industry.
        </p>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-12">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-flow-col auto-cols-max gap-2">
            {categories.map((category) => (
              <TabsTrigger key={category.slug} value={category.slug} className="px-4">
                {category.name} <span className="ml-2 text-xs opacity-70">({category.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.slug} value={category.slug}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post, index) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <Image
                      src={post.featuredImage || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3} // Only prioritize first 3 images
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-600 hover:bg-red-700 text-white">{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-red-500 transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 text-xs">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.publishDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Stay updated with the latest eyewear trends, care tips, and exclusive offers from C4 Chashma.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Newsletter"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Popular Tags</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from(new Set(posts.flatMap((post) => post.tags))).map((tag) => (
            <Badge key={tag} variant="outline" className="px-3 py-1">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </main>
  )
}
