"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2, Plus, Search, ArrowUpDown, Upload, ImageIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Product {
  id: string
  name: string
  category: string
  price: number
  discountPrice?: number
  stock: number
  sku: string
  description: string
  features: string[]
  images: string[]
  colors: string[]
  frameSize: string[]
  status: "active" | "inactive" | "out-of-stock"
  createdAt: string
  updatedAt: string
}

interface Category {
  id: string
  name: string
  description: string
}

interface ProductsTabProps {
  products: Product[]
  setProducts: (products: Product[]) => void
  categories: Category[]
}

export default function ProductsTab({ products, setProducts, categories }: ProductsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    sku: "",
    description: "",
    features: [],
    images: ["/placeholder.svg?height=200&width=200"],
    colors: [],
    frameSize: [],
    status: "active",
  })

  const itemsPerPage = 5

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

      const matchesStatus = statusFilter === "all" || product.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "price") {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price
      } else if (sortField === "stock") {
        return sortDirection === "asc" ? a.stock - b.stock : b.stock - a.stock
      }
      return 0
    })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Toggle sort direction
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle adding a new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...products.map((p) => Number.parseInt(p.id)), 0) + 1

    const productToAdd: Product = {
      id: newId.toString(),
      name: newProduct.name || "",
      category: newProduct.category || "",
      price: Number(newProduct.price) || 0,
      stock: Number(newProduct.stock) || 0,
      sku: newProduct.sku || `SKU-${newId}`,
      description: newProduct.description || "",
      features: newProduct.features || [],
      images: newProduct.images || ["/placeholder.svg?height=200&width=200"],
      colors: newProduct.colors || [],
      frameSize: newProduct.frameSize || [],
      status: newProduct.status || "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setProducts([...products, productToAdd])
    setIsAddDialogOpen(false)
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      sku: "",
      description: "",
      features: [],
      images: ["/placeholder.svg?height=200&width=200"],
      colors: [],
      frameSize: [],
      status: "active",
    })

    toast({
      title: "Product added",
      description: "The product has been added successfully",
    })
  }

  // Handle editing a product
  const handleEditProduct = () => {
    if (!currentProduct) return

    const updatedProducts = products.map((product) =>
      product.id === currentProduct.id ? { ...currentProduct, updatedAt: new Date().toISOString() } : product,
    )

    setProducts(updatedProducts)
    setCurrentProduct(null)
    setIsEditDialogOpen(false)

    toast({
      title: "Product updated",
      description: "The product has been updated successfully",
    })
  }

  // Handle deleting a product
  const handleDeleteProduct = () => {
    if (!productToDelete) return

    const updatedProducts = products.filter((product) => product.id !== productToDelete)
    setProducts(updatedProducts)
    setProductToDelete(null)
    setDeleteConfirmOpen(false)

    toast({
      title: "Product deleted",
      description: "The product has been deleted successfully",
    })
  }

  // Handle input change for new product
  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProduct({
      ...newProduct,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    })
  }

  // Handle select change for new product
  const handleNewProductSelectChange = (name: string, value: string) => {
    setNewProduct({
      ...newProduct,
      [name]: value,
    })
  }

  // Handle input change for current product
  const handleCurrentProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProduct) return

    const { name, value } = e.target
    setCurrentProduct({
      ...currentProduct,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    })
  }

  // Handle select change for current product
  const handleCurrentProductSelectChange = (name: string, value: string) => {
    if (!currentProduct) return

    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    })
  }

  // Handle features change (comma-separated list)
  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>, isNew: boolean) => {
    const features = e.target.value
      .split(",")
      .map((feature) => feature.trim())
      .filter(Boolean)

    if (isNew) {
      setNewProduct({
        ...newProduct,
        features,
      })
    } else if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        features,
      })
    }
  }

  // Handle colors change (comma-separated list)
  const handleColorsChange = (e: React.ChangeEvent<HTMLTextAreaElement>, isNew: boolean) => {
    const colors = e.target.value
      .split(",")
      .map((color) => color.trim())
      .filter(Boolean)

    if (isNew) {
      setNewProduct({
        ...newProduct,
        colors,
      })
    } else if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        colors,
      })
    }
  }

  // Handle frame sizes change (comma-separated list)
  const handleFrameSizesChange = (e: React.ChangeEvent<HTMLTextAreaElement>, isNew: boolean) => {
    const frameSize = e.target.value
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean)

    if (isNew) {
      setNewProduct({
        ...newProduct,
        frameSize,
      })
    } else if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        frameSize,
      })
    }
  }

  // Handle image upload (mock implementation)
  const handleImageUpload = (isNew: boolean) => {
    // In a real app, this would open a file picker and upload the image
    // For now, we'll just simulate adding a new placeholder image
    const newImageUrl = `/placeholder.svg?height=200&width=200&text=New+Image+${Date.now()}`

    if (isNew) {
      setNewProduct({
        ...newProduct,
        images: [...(newProduct.images || []), newImageUrl],
      })
    } else if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        images: [...currentProduct.images, newImageUrl],
      })
    }

    toast({
      title: "Image uploaded",
      description: "The image has been uploaded successfully",
    })
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge className="bg-yellow-500">Inactive</Badge>
      case "out-of-stock":
        return <Badge className="bg-red-500">Out of Stock</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Products Management</h2>
        <Button className="flex items-center gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus size={16} />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Manage your product catalog and inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or SKU..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-1 p-0 font-medium"
                      onClick={() => toggleSort("name")}
                    >
                      Product
                      <ArrowUpDown size={14} />
                    </Button>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-1 p-0 font-medium"
                      onClick={() => toggleSort("price")}
                    >
                      Price
                      <ArrowUpDown size={14} />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-1 p-0 font-medium"
                      onClick={() => toggleSort("stock")}
                    >
                      Stock
                      <ArrowUpDown size={14} />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div>{product.name}</div>
                            <div className="text-xs text-gray-500">{product.sku}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        {product.discountPrice ? (
                          <div>
                            <span className="line-through text-gray-500">₹{product.price.toFixed(2)}</span>
                            <span className="ml-2 font-medium">₹{product.discountPrice.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span>₹{product.price.toFixed(2)}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={product.stock <= 5 ? "text-red-500 font-medium" : ""}>{product.stock}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setCurrentProduct(product)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500"
                            onClick={() => {
                              setProductToDelete(product.id)
                              setDeleteConfirmOpen(true)
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No products found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages || totalPages === 0}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name*</Label>
                  <Input id="name" name="name" value={newProduct.name} onChange={handleNewProductChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" name="sku" value={newProduct.sku} onChange={handleNewProductChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category*</Label>
                    <Select onValueChange={(value) => handleNewProductSelectChange("category", value)}>
                      <SelectTrigger>
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      defaultValue="active"
                      onValueChange={(value) =>
                        handleNewProductSelectChange("status", value as "active" | "inactive" | "out-of-stock")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price* (₹)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={newProduct.price}
                      onChange={handleNewProductChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock*</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={handleNewProductChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Image</Label>
                  <div className="border rounded-md p-2">
                    <div className="aspect-square bg-gray-100 rounded-md overflow-hidden relative">
                      <img
                        src={newProduct.images?.[0] || "/placeholder.svg"}
                        alt="Product"
                        className="w-full h-full object-contain"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => handleImageUpload(true)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleNewProductChange}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Textarea
                  id="features"
                  value={newProduct.features?.join(", ")}
                  onChange={(e) => handleFeaturesChange(e, true)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="colors">Colors (comma-separated)</Label>
                <Textarea
                  id="colors"
                  value={newProduct.colors?.join(", ")}
                  onChange={(e) => handleColorsChange(e, true)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frameSize">Frame Sizes (comma-separated)</Label>
                <Textarea
                  id="frameSize"
                  value={newProduct.frameSize?.join(", ")}
                  onChange={(e) => handleFrameSizesChange(e, true)}
                  rows={2}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Product Name*</Label>
                    <Input
                      id="edit-name"
                      name="name"
                      value={currentProduct.name}
                      onChange={handleCurrentProductChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-sku">SKU</Label>
                    <Input id="edit-sku" name="sku" value={currentProduct.sku} onChange={handleCurrentProductChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">Category*</Label>
                      <Select
                        defaultValue={currentProduct.category}
                        onValueChange={(value) => handleCurrentProductSelectChange("category", value)}
                      >
                        <SelectTrigger>
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
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-status">Status</Label>
                      <Select
                        defaultValue={currentProduct.status}
                        onValueChange={(value) =>
                          handleCurrentProductSelectChange("status", value as "active" | "inactive" | "out-of-stock")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">Price* (₹)</Label>
                      <Input
                        id="edit-price"
                        name="price"
                        type="number"
                        value={currentProduct.price}
                        onChange={handleCurrentProductChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-stock">Stock*</Label>
                      <Input
                        id="edit-stock"
                        name="stock"
                        type="number"
                        value={currentProduct.stock}
                        onChange={handleCurrentProductChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Product Image</Label>
                    <div className="border rounded-md p-2">
                      <div className="aspect-square bg-gray-100 rounded-md overflow-hidden relative">
                        <img
                          src={currentProduct.images[0] || "/placeholder.svg"}
                          alt={currentProduct.name}
                          className="w-full h-full object-contain"
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute bottom-2 right-2"
                          onClick={() => handleImageUpload(false)}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Change Image
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      name="description"
                      value={currentProduct.description}
                      onChange={handleCurrentProductChange}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-features">Features (comma-separated)</Label>
                  <Textarea
                    id="edit-features"
                    value={currentProduct.features.join(", ")}
                    onChange={(e) => handleFeaturesChange(e, false)}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-colors">Colors (comma-separated)</Label>
                  <Textarea
                    id="edit-colors"
                    value={currentProduct.colors.join(", ")}
                    onChange={(e) => handleColorsChange(e, false)}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-frameSize">Frame Sizes (comma-separated)</Label>
                  <Textarea
                    id="edit-frameSize"
                    value={currentProduct.frameSize.join(", ")}
                    onChange={(e) => handleFrameSizesChange(e, false)}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this product. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setProductToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDeleteProduct}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
