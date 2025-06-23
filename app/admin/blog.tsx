"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Check, ChevronLeft, ChevronRight, Edit, Plus, Search, Trash2, Upload } from "lucide-react"
import type { BlogPost, BlogCategory, BlogAuthor } from "@/types/blog"

// Mock data for blog posts
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 Eyewear Trends for 2023",
    slug: "top-5-eyewear-trends-2023",
    excerpt: "Discover the hottest eyewear trends that are dominating the fashion scene this year.",
    content:
      "# Top 5 Eyewear Trends for 2023\n\nEyewear fashion is constantly evolving, and 2023 brings exciting new trends...",
    featuredImage: "/placeholder.svg?height=400&width=600",
    author: "Sarah Johnson",
    category: "Fashion",
    tags: ["trends", "fashion", "eyewear", "2023"],
    publishDate: "2023-03-15",
    status: "published",
    seoTitle: "Top 5 Eyewear Trends for 2023 | C4 Chashma",
    seoDescription:
      "Discover the hottest eyewear trends that are dominating the fashion scene in 2023. From oversized frames to sustainable materials.",
    seoKeywords: ["eyewear trends 2023", "fashion eyewear", "trendy glasses", "sunglasses trends"],
  },
  {
    id: "2",
    title: "How to Choose the Right Frames for Your Face Shape",
    slug: "choose-right-frames-face-shape",
    excerpt: "Learn how to select the perfect eyeglass frames that complement your unique face shape.",
    content:
      "# How to Choose the Right Frames for Your Face Shape\n\nFinding the perfect pair of glasses involves more than just picking a style you like...",
    featuredImage: "/placeholder.svg?height=400&width=600",
    author: "Michael Chen",
    category: "Guides",
    tags: ["face shape", "frames", "style guide", "eyeglasses"],
    publishDate: "2023-02-28",
    status: "published",
    seoTitle: "How to Choose Frames for Your Face Shape | C4 Chashma",
    seoDescription:
      "Learn how to select the perfect eyeglass frames that complement your unique face shape. Expert tips for oval, round, square, and heart-shaped faces.",
    seoKeywords: [
      "frames for face shape",
      "eyeglass frame selection",
      "best glasses for face shape",
      "face shape guide",
    ],
  },
  {
    id: "3",
    title: "Understanding Blue Light Glasses: Do They Really Work?",
    slug: "understanding-blue-light-glasses",
    excerpt: "An in-depth look at blue light glasses and their effectiveness in reducing digital eye strain.",
    content:
      "# Understanding Blue Light Glasses: Do They Really Work?\n\nWith the increasing amount of time we spend in front of digital screens...",
    featuredImage: "/placeholder.svg?height=400&width=600",
    author: "Dr. Emily Rodriguez",
    category: "Health",
    tags: ["blue light", "digital eye strain", "eye health", "computer glasses"],
    publishDate: "2023-04-05",
    status: "draft",
    seoTitle: "Do Blue Light Glasses Work? The Science Explained | C4 Chashma",
    seoDescription:
      "An in-depth look at blue light glasses and their effectiveness in reducing digital eye strain. Scientific evidence and expert opinions.",
    seoKeywords: ["blue light glasses", "digital eye strain", "computer glasses", "screen time eye protection"],
  },
]

// Mock data for categories
const mockCategories: BlogCategory[] = [
  { id: "1", name: "Fashion", slug: "fashion", description: "Latest eyewear fashion trends and style tips" },
  { id: "2", name: "Health", slug: "health", description: "Eye health information and advice" },
  { id: "3", name: "Guides", slug: "guides", description: "How-to guides and tutorials" },
  { id: "4", name: "News", slug: "news", description: "Latest news from C4 Chashma and the eyewear industry" },
]

// Mock data for authors
const mockAuthors: BlogAuthor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    bio: "Fashion editor with 10+ years of experience in the eyewear industry",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Michael Chen",
    bio: "Style consultant and eyewear specialist",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    bio: "Optometrist with a focus on digital eye strain and eye health",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function BlogManagement({
  posts: initialPosts = mockPosts,
  setPosts: setParentPosts,
  categories: initialCategories = mockCategories,
  setCategories: setParentCategories,
  authors: initialAuthors = mockAuthors,
  setAuthors: setParentAuthors,
}) {
  const [posts, setPostsLocal] = useState<BlogPost[]>(initialPosts)
  const [categories, setCategoriesLocal] = useState<BlogCategory[]>(initialCategories)
  const [authors, setAuthorsLocal] = useState<BlogAuthor[]>(initialAuthors)

  // Form validation state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [uploadError, setUploadError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [activeTab, setActiveTab] = useState("posts")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // Dialog states
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [isAuthorDialogOpen, setIsAuthorDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isGoogleDialogOpen, setIsGoogleDialogOpen] = useState(false)

  // Form states
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({})
  const [currentCategory, setCurrentCategory] = useState<Partial<BlogCategory>>({})
  const [currentAuthor, setCurrentAuthor] = useState<Partial<BlogAuthor>>({})
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: string }>({ id: "", type: "" })

  // Google integration states
  const [googleConnected, setGoogleConnected] = useState(false)
  const [autoPublish, setAutoPublish] = useState(false)
  const [structuredData, setStructuredData] = useState(true)

  // Filtered posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)

  const validatePostForm = () => {
    const errors: Record<string, string> = {}
    if (!currentPost.title) errors.title = "Title is required"
    if (!currentPost.content) errors.content = "Content is required"
    if (!currentPost.author) errors.author = "Author is required"
    if (!currentPost.category) errors.category = "Category is required"
    return { isValid: Object.keys(errors).length === 0, errors }
  }

  // Handle post form submission
  const handlePostSubmit = () => {
    const { isValid, errors } = validatePostForm()
    if (!isValid) {
      setFormErrors(errors)
      return
    }

    setIsLoading(true)

    try {
      if (currentPost.id) {
        // Update existing post
        const updatedPosts = posts.map((post) =>
          post.id === currentPost.id ? ({ ...post, ...currentPost } as BlogPost) : post,
        )
        setPostsLocal(updatedPosts)
        if (setParentPosts) setParentPosts(updatedPosts)
      } else {
        // Create new post
        const newPost: BlogPost = {
          id: Date.now().toString(),
          title: currentPost.title || "Untitled Post",
          slug: currentPost.slug || currentPost.title?.toLowerCase().replace(/\s+/g, "-") || "untitled-post",
          excerpt: currentPost.excerpt || "",
          content: currentPost.content || "",
          featuredImage: currentPost.featuredImage || "/placeholder.svg?height=400&width=600",
          author: currentPost.author || "Admin",
          category: currentPost.category || "Uncategorized",
          tags: currentPost.tags || [],
          publishDate: currentPost.publishDate || new Date().toISOString().split("T")[0],
          status: (currentPost.status as "draft" | "published") || "draft",
          seoTitle: currentPost.seoTitle || "",
          seoDescription: currentPost.seoDescription || "",
          seoKeywords: currentPost.seoKeywords || [],
        }
        const newPosts = [...posts, newPost]
        setPostsLocal(newPosts)
        if (setParentPosts) setParentPosts(newPosts)
      }

      setIsPostDialogOpen(false)
      setCurrentPost({})
      setFormErrors({})
    } catch (error) {
      console.error("Error saving post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle category form submission
  const handleCategorySubmit = () => {
    if (currentCategory.id) {
      // Update existing category
      setCategoriesLocal(
        categories.map((category) =>
          category.id === currentCategory.id ? ({ ...category, ...currentCategory } as BlogCategory) : category,
        ),
      )
      if (setParentCategories)
        setParentCategories(
          categories.map((category) =>
            category.id === currentCategory.id ? ({ ...category, ...currentCategory } as BlogCategory) : category,
          ),
        )
    } else {
      // Create new category
      const newCategory: BlogCategory = {
        id: Date.now().toString(),
        name: currentCategory.name || "Untitled Category",
        slug: currentCategory.slug || currentCategory.name?.toLowerCase().replace(/\s+/g, "-") || "untitled-category",
        description: currentCategory.description || "",
      }
      const newCategories = [...categories, newCategory]
      setCategoriesLocal(newCategories)
      if (setParentCategories) setParentCategories(newCategories)
    }
    setIsCategoryDialogOpen(false)
    setCurrentCategory({})
  }

  // Handle author form submission
  const handleAuthorSubmit = () => {
    if (currentAuthor.id) {
      // Update existing author
      setAuthorsLocal(
        authors.map((author) =>
          author.id === currentAuthor.id ? ({ ...author, ...currentAuthor } as BlogAuthor) : author,
        ),
      )
      if (setParentAuthors)
        setParentAuthors(
          authors.map((author) =>
            author.id === currentAuthor.id ? ({ ...author, ...currentAuthor } as BlogAuthor) : author,
          ),
        )
    } else {
      // Create new author
      const newAuthor: BlogAuthor = {
        id: Date.now().toString(),
        name: currentAuthor.name || "Untitled Author",
        bio: currentAuthor.bio || "",
        avatar: currentAuthor.avatar || "/placeholder.svg?height=100&width=100",
      }
      const newAuthors = [...authors, newAuthor]
      setAuthorsLocal(newAuthors)
      if (setParentAuthors) setParentAuthors(newAuthors)
    }
    setIsAuthorDialogOpen(false)
    setCurrentAuthor({})
  }

  // Handle delete confirmation
  const handleDelete = () => {
    if (itemToDelete.type === "post") {
      setPostsLocal(posts.filter((post) => post.id !== itemToDelete.id))
      if (setParentPosts) setParentPosts(posts.filter((post) => post.id !== itemToDelete.id))
    } else if (itemToDelete.type === "category") {
      setCategoriesLocal(categories.filter((category) => category.id !== itemToDelete.id))
      if (setParentCategories) setParentCategories(categories.filter((category) => category.id !== itemToDelete.id))
    } else if (itemToDelete.type === "author") {
      setAuthorsLocal(authors.filter((author) => author.id !== itemToDelete.id))
      if (setParentAuthors) setParentAuthors(authors.filter((author) => author.id !== itemToDelete.id))
    }
    setIsDeleteDialogOpen(false)
    setItemToDelete({ id: "", type: "" })
  }

  // Handle Google integration settings
  const handleGoogleSettings = () => {
    // In a real implementation, this would save settings to the backend
    setIsGoogleDialogOpen(false)
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("File size exceeds 2MB limit")
      return
    }

    // Check file type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setUploadError("Only JPEG, PNG and WebP images are supported")
      return
    }

    // Clear previous errors
    setUploadError("")

    // Create URL and set image
    const imageUrl = URL.createObjectURL(file)
    if (type === "post") {
      setCurrentPost({ ...currentPost, featuredImage: imageUrl })
    } else if (type === "author") {
      setCurrentAuthor({ ...currentAuthor, avatar: imageUrl })
    }
  }

  // Generate Google structured data for a post
  const generateStructuredData = (post: BlogPost) => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      image: [post.featuredImage],
      datePublished: post.publishDate,
      author: {
        "@type": "Person",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        name: "C4 Chashma",
        logo: {
          "@type": "ImageObject",
          url: "/logo.png",
        },
      },
      description: post.excerpt,
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsGoogleDialogOpen(true)}>
            Google Settings
          </Button>
          <Button
            onClick={() => {
              if (activeTab === "posts") {
                setCurrentPost({})
                setIsPostDialogOpen(true)
              } else if (activeTab === "categories") {
                setCurrentCategory({})
                setIsCategoryDialogOpen(true)
              } else if (activeTab === "authors") {
                setCurrentAuthor({})
                setIsAuthorDialogOpen(true)
              }
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add {activeTab === "posts" ? "Post" : activeTab === "categories" ? "Category" : "Author"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="authors">Authors</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{new Date(post.publishDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={post.status === "published" ? "default" : "secondary"}>
                            {post.status === "published" ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setCurrentPost(post)
                                setIsPostDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setItemToDelete({ id: post.id, type: "post" })
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No posts found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setCurrentCategory(category)
                              setIsCategoryDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setItemToDelete({ id: category.id, type: "category" })
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authors" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Bio</TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {authors.map((author) => (
                    <TableRow key={author.id}>
                      <TableCell className="font-medium">{author.name}</TableCell>
                      <TableCell>{author.bio}</TableCell>
                      <TableCell>
                        <img
                          src={author.avatar || "/placeholder.svg"}
                          alt={author.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setCurrentAuthor(author)
                              setIsAuthorDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setItemToDelete({ id: author.id, type: "author" })
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Post Dialog */}
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentPost.id ? "Edit Post" : "Add New Post"}</DialogTitle>
            <DialogDescription>
              {currentPost.id ? "Update the details of your blog post." : "Create a new blog post."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              {uploadError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                  {uploadError}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={currentPost.title || ""}
                  onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                  placeholder="Enter post title"
                  className={formErrors.title ? "border-red-500" : ""}
                />
                {formErrors.title && <p className="text-red-500 text-sm">{formErrors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={currentPost.slug || ""}
                  onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                  placeholder="enter-post-slug"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={currentPost.excerpt || ""}
                  onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                  placeholder="Brief summary of the post"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={currentPost.content || ""}
                  onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                  placeholder="Write your post content here..."
                  rows={10}
                  className={formErrors.content ? "border-red-500" : ""}
                />
                {formErrors.content && <p className="text-red-500 text-sm">{formErrors.content}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Select
                    value={currentPost.author}
                    onValueChange={(value) => setCurrentPost({ ...currentPost, author: value })}
                  >
                    <SelectTrigger className={formErrors.author ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.name}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.author && <p className="text-red-500 text-sm">{formErrors.author}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={currentPost.category}
                    onValueChange={(value) => setCurrentPost({ ...currentPost, category: value })}
                  >
                    <SelectTrigger className={formErrors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.category && <p className="text-red-500 text-sm">{formErrors.category}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={currentPost.tags?.join(", ") || ""}
                  onChange={(e) =>
                    setCurrentPost({ ...currentPost, tags: e.target.value.split(",").map((tag) => tag.trim()) })
                  }
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={currentPost.publishDate || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCurrentPost({ ...currentPost, publishDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={currentPost.status}
                    onValueChange={(value: "draft" | "published") => setCurrentPost({ ...currentPost, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">SEO Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input
                      id="seoTitle"
                      value={currentPost.seoTitle || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, seoTitle: e.target.value })}
                      placeholder="SEO optimized title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">Meta Description</Label>
                    <Textarea
                      id="seoDescription"
                      value={currentPost.seoDescription || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, seoDescription: e.target.value })}
                      placeholder="SEO meta description"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seoKeywords">Meta Keywords (comma separated)</Label>
                    <Input
                      id="seoKeywords"
                      value={currentPost.seoKeywords?.join(", ") || ""}
                      onChange={(e) =>
                        setCurrentPost({
                          ...currentPost,
                          seoKeywords: e.target.value.split(",").map((keyword) => keyword.trim()),
                        })
                      }
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="border rounded-md p-2">
                  <div className="aspect-video bg-muted rounded-md overflow-hidden mb-2">
                    <img
                      src={currentPost.featuredImage || "/placeholder.svg?height=400&width=600"}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center">
                    <Label
                      htmlFor="featuredImage"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                      <input
                        id="featuredImage"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleImageUpload(e, "post")}
                      />
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">Google Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="googleIndex" defaultChecked />
                    <Label htmlFor="googleIndex">Allow Google indexing</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="structuredData" defaultChecked />
                    <Label htmlFor="structuredData">Generate structured data</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="autoPublish"
                      checked={autoPublish}
                      onCheckedChange={(checked) => setAutoPublish(checked as boolean)}
                    />
                    <Label htmlFor="autoPublish">Auto-publish to Google</Label>
                  </div>
                </div>
              </div>

              {currentPost.id && (
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">Preview</h3>
                  <Button variant="outline" className="w-full">
                    Preview Post
                  </Button>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePostSubmit} disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : currentPost.id ? (
                "Save Changes"
              ) : (
                "Create Post"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentCategory.id ? "Edit Category" : "Add New Category"}</DialogTitle>
            <DialogDescription>
              {currentCategory.id ? "Update the details of your category." : "Create a new blog category."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Name</Label>
              <Input
                id="categoryName"
                value={currentCategory.name || ""}
                onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                placeholder="Category name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categorySlug">Slug</Label>
              <Input
                id="categorySlug"
                value={currentCategory.slug || ""}
                onChange={(e) => setCurrentCategory({ ...currentCategory, slug: e.target.value })}
                placeholder="category-slug"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryDescription">Description</Label>
              <Textarea
                id="categoryDescription"
                value={currentCategory.description || ""}
                onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                placeholder="Category description"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCategorySubmit}>{currentCategory.id ? "Save Changes" : "Create Category"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Author Dialog */}
      <Dialog open={isAuthorDialogOpen} onOpenChange={setIsAuthorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentAuthor.id ? "Edit Author" : "Add New Author"}</DialogTitle>
            <DialogDescription>
              {currentAuthor.id ? "Update the details of your author." : "Create a new blog author."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="authorName">Name</Label>
              <Input
                id="authorName"
                value={currentAuthor.name || ""}
                onChange={(e) => setCurrentAuthor({ ...currentAuthor, name: e.target.value })}
                placeholder="Author name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorBio">Bio</Label>
              <Textarea
                id="authorBio"
                value={currentAuthor.bio || ""}
                onChange={(e) => setCurrentAuthor({ ...currentAuthor, bio: e.target.value })}
                placeholder="Author bio"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Avatar</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full overflow-hidden bg-muted">
                  <img
                    src={currentAuthor.avatar || "/placeholder.svg?height=100&width=100"}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <Label
                  htmlFor="authorAvatar"
                  className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Avatar
                  <input
                    id="authorAvatar"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => handleImageUpload(e, "author")}
                  />
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAuthorDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAuthorSubmit}>{currentAuthor.id ? "Save Changes" : "Create Author"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {itemToDelete.type}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center p-3 border rounded-md bg-muted/50">
            <AlertCircle className="h-5 w-5 text-destructive mr-2" />
            <p className="text-sm">Deleting this {itemToDelete.type} may affect related content on your website.</p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Google Integration Dialog */}
      <Dialog open={isGoogleDialogOpen} onOpenChange={setIsGoogleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Google Integration Settings</DialogTitle>
            <DialogDescription>Configure how your blog content integrates with Google services.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Google Search Console</h3>
                {googleConnected ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Check className="h-3 w-3 mr-1" /> Connected
                  </Badge>
                ) : (
                  <Button size="sm">Connect</Button>
                )}
              </div>

              {googleConnected && (
                <div className="text-sm text-muted-foreground">
                  Your site is verified and connected to Google Search Console.
                </div>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Automatic Publishing</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoPublishGoogle"
                    checked={autoPublish}
                    onCheckedChange={(checked) => setAutoPublish(checked as boolean)}
                  />
                  <Label htmlFor="autoPublishGoogle">Automatically publish new posts to Google</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  When enabled, new published posts will be automatically submitted to Google for indexing.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Structured Data</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="structuredDataGoogle"
                    checked={structuredData}
                    onCheckedChange={(checked) => setStructuredData(checked as boolean)}
                  />
                  <Label htmlFor="structuredDataGoogle">Generate structured data for blog posts</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Adds JSON-LD structured data to blog posts for better Google search results.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Product Listings</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="productStructuredData" defaultChecked />
                  <Label htmlFor="productStructuredData">Generate structured data for products</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Adds product structured data to enhance product listings in Google search results.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGoogleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGoogleSettings}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
