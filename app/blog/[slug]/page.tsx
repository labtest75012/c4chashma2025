"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Mock blog post data
const blogPost = {
  title: "How to Choose the Right Glasses for Your Face Shape",
  slug: "how-to-choose-glasses-face-shape",
  featuredImage: "/placeholder.svg?height=600&width=1200",
  content: `
    <p>Choosing the right glasses for your face shape can make a significant difference in how they look and feel. Here's a comprehensive guide to help you find the perfect pair.</p>
    
    <h2>Identify Your Face Shape</h2>
    <p>Before shopping for glasses, it's important to determine your face shape. The most common face shapes are:</p>
    <ul>
      <li><strong>Oval:</strong> Balanced proportions with a slightly curved jawline.</li>
      <li><strong>Round:</strong> Full cheeks and a rounded chin with similar face width and length.</li>
      <li><strong>Square:</strong> Strong jawline and broad forehead with similar face width and length.</li>
      <li><strong>Heart:</strong> Wider forehead and cheekbones with a narrow chin.</li>
      <li><strong>Diamond:</strong> Narrow forehead and jawline with wide cheekbones.</li>
      <li><strong>Rectangle:</strong> Long face with a straight cheek line and strong jawline.</li>
    </ul>
    
    <h2>Best Frames for Each Face Shape</h2>
    
    <h3>Oval Face</h3>
    <p>If you have an oval face, you're in luck! Most frame styles will look good on you. Consider:</p>
    <ul>
      <li>Geometric frames</li>
      <li>Walnut-shaped frames</li>
      <li>Frames that are as wide as the broadest part of your face</li>
    </ul>
    
    <h3>Round Face</h3>
    <p>To make a round face appear longer and thinner, try:</p>
    <ul>
      <li>Angular or rectangular frames</li>
      <li>Frames with high temples</li>
      <li>Frames that are wider than they are tall</li>
    </ul>
    
    <h3>Square Face</h3>
    <p>To soften the angles of a square face, consider:</p>
    <ul>
      <li>Round or oval frames</li>
      <li>Frames with curved edges</li>
      <li>Thinner frames</li>
    </ul>
    
    <h3>Heart Face</h3>
    <p>To balance a wider forehead with a narrower chin, look for:</p>
    <ul>
      <li>Frames that are wider at the bottom</li>
      <li>Rimless or light-colored frames</li>
      <li>Oval or round frames</li>
    </ul>
    
    <h3>Diamond Face</h3>
    <p>To highlight cheekbones and soften angular features:</p>
    <ul>
      <li>Frames with detailing or distinctive brow lines</li>
      <li>Cat-eye shapes</li>
      <li>Oval frames</li>
    </ul>
    
    <h3>Rectangle Face</h3>
    <p>To make a long face appear shorter and more balanced:</p>
    <ul>
      <li>Frames with more depth than width</li>
      <li>Decorative or contrasting temples</li>
      <li>Round or square frames with strong shapes</li>
    </ul>
    
    <h2>Consider Your Skin Tone</h2>
    <p>Beyond face shape, your skin tone should influence your frame color choice:</p>
    <ul>
      <li><strong>Warm skin tones:</strong> Look best with frames in gold, honey, beige, olive green, or tortoise.</li>
      <li><strong>Cool skin tones:</strong> Complement frames in silver, black, gray, blue, or purple.</li>
    </ul>
    
    <h2>Think About Your Lifestyle</h2>
    <p>Your daily activities should influence your glasses choice:</p>
    <ul>
      <li>Active lifestyle? Look for durable, flexible frames.</li>
      <li>Professional setting? Consider classic, sophisticated styles.</li>
      <li>Fashion-forward? Bold colors and unique shapes might be for you.</li>
    </ul>
    
    <h2>Visit Our Store</h2>
    <p>Our optical experts can help you find the perfect pair of glasses for your face shape and personal style. Book an appointment today!</p>
  `,
  author: "Dr. Sarah Johnson",
  date: "May 15, 2023",
  readTime: "5 min read",
  tags: ["eyewear", "glasses", "style guide", "face shapes"],
}

// Related posts
const relatedPosts = [
  {
    title: "Understanding Progressive Lenses: A Complete Guide",
    slug: "understanding-progressive-lenses",
    image: "/placeholder.svg?height=200&width=300",
    excerpt: "Everything you need to know about progressive lenses and how they can benefit you.",
  },
  {
    title: "Top Sunglasses Trends for Summer 2023",
    slug: "sunglasses-trends-summer-2023",
    image: "/placeholder.svg?height=200&width=300",
    excerpt: "Stay stylish and protected with these trending sunglasses styles.",
  },
  {
    title: "How to Care for Your Eyeglasses",
    slug: "how-to-care-for-eyeglasses",
    image: "/placeholder.svg?height=200&width=300",
    excerpt: "Tips and tricks to keep your glasses in perfect condition for longer.",
  },
]

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug

  // In a real application, you would fetch the blog post data based on the slug
  // For now, we'll just use our mock data

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{blogPost.title}</h1>

        <div className="flex items-center text-gray-500 mb-6">
          <span className="mr-4">{blogPost.author}</span>
          <span className="mr-4">•</span>
          <span className="mr-4">{blogPost.date}</span>
          <span className="mr-4">•</span>
          <span>{blogPost.readTime}</span>
        </div>

        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={blogPost.featuredImage || "/placeholder.svg"}
            alt={blogPost.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-wrap gap-2 mb-8">
            {blogPost.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Card key={post.slug} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
