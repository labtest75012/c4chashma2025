export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: string
  category: string
  tags: string[]
  publishDate: string
  status: "draft" | "published"
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface BlogAuthor {
  id: string
  name: string
  bio?: string
  avatar?: string
}
