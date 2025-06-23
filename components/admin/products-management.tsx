"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Search, Filter, Plus, Edit, Trash2, ImageIcon, Eye } from "lucide-react"

export default function ProductsManagement() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
    featured: false,
    published: true,
  })

  // Load products and categories from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("c4chashma_products")
    const storedCategories = localStorage.getItem("c4chashma_categories")

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    } else {
      // Default products if none in localStorage
      setProducts([
        {
          id: "1",
          name: "Ray-Ban Aviator",
          description: "Classic aviator sunglasses with UV protection",
          price: 7999,
          stock: 25,
          category: "Sunglasses",
          images: ["/placeholder.svg?height=200&width=300"],
          featured: true,
          published: true,
        },
        {
          id: "2",
          name: "Oakley Holbrook",
          description: "Sports sunglasses with polarized lenses",
          price: 9499,
          stock: 18,
          category: "Sunglasses",
          images: ["/placeholder.svg?height=200&width=300"],
          featured: false,
          published: true,
        },
        {
          id: "3",
          name: "Titan Eyeplus Frames",
          description: "Lightweight metal frames for everyday use",
          price: 4999,
          stock: 32,
          category: "Eyeglasses",
          images: ["/placeholder.svg?height=200&width=300"],
          featured: true,
          published: true,
        },
        {
          id: "4",
          name: "Acuvue Oasys Contact Lenses",
          description: "Bi-weekly disposable contact lenses",
          price: 1299,
          stock: 50,
          category: "Contact Lenses",
          images: ["/placeholder.svg?height=200&width=300"],
          featured: false,
          published: true,
        },
        {
          id: "5",
          name: "Lens Cleaning Solution",
          description: "Multi-purpose solution for all types of contact lenses",
          price: 499,
          stock: 75,
          category: "Accessories",
          images: ["/placeholder.svg?height=200&width=300"],
          featured: false,
          published: true,
        },
      ])
    }

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    } else {
      // Default categories if none in localStorage
      setCategories([
        { id: "1", name: "Eyeglasses", description: "Prescription and non-prescription eyeglasses" },
        { id: "2", name: "Sunglasses", description: "UV protection sunglasses" },
        { id: "3", name: "Contact Lenses", description: "Daily, weekly and monthly contact lenses" },
        { id: "4", name: "Accessories", description: "Cases, solutions, and other accessories" },
      ])
    }
  }, [])

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("c4chashma_products", JSON.stringify(products))
    }
  }, [products])

  // Filter products based on search term, category filter, and stock filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in-stock" && product.stock > 0) ||
      (stockFilter === "low-stock" && product.stock > 0 && product.stock <= 10) ||
      (stockFilter === "out-of-stock" && product.stock === 0)

    return matchesSearch && matchesCategory && matchesStock
  })

  // Add new product
  const handleAddProduct = () => {
    const newId = (Math.max(...products.map((p) => Number.parseInt(p.id)), 0) + 1).toString()

    const productToAdd = {
      ...newProduct,
      id: newId,
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
      images: newProduct.images.length > 0 ? newProduct.images : ["/placeholder.svg?height=200&width=300"],
    }

    setProducts([...products, productToAdd])
    setIsAddProductOpen(false)
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      images: [],
      featured: false,
      published: true,
    })
  }

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId))
  }

  // Update product
  const handleUpdateProduct = (updatedProduct: any) => {
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)))
    setSelectedProduct(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your product inventory, prices, and details</CardDescription>
            </div>
            <Button onClick={() => setIsAddProductOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
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

              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{product.stock}</span>
                          {product.stock <= 10 && product.stock > 0 && (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              Low
                            </Badge>
                          )}
                          {product.stock === 0 && (
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                              Out
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.published ? (
                          <Badge className="bg-green-100 text-green-800">Published</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800">
                            Draft
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(product)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No products found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Fill in the details to add a new product to your inventory</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    rows={4}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
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
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-4 py-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-4">Drag and drop images here, or click to select files</p>
                  <Button variant="outline">Upload Images</Button>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <p>Supported formats: JPEG, PNG, WebP</p>
                <p>Maximum file size: 5MB</p>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured">Featured Product</Label>
                    <p className="text-sm text-gray-500">Featured products appear on the homepage</p>
                  </div>
                  <Switch
                    id="featured"
                    checked={newProduct.featured}
                    onCheckedChange={(checked) => setNewProduct({ ...newProduct, featured: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="published">Published</Label>
                    <p className="text-sm text-gray-500">Published products are visible to customers</p>
                  </div>
                  <Switch
                    id="published"
                    checked={newProduct.published}
                    onCheckedChange={(checked) => setNewProduct({ ...newProduct, published: checked })}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit/View Product Dialog */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update product details and inventory</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basic" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Product Name</Label>
                    <Input
                      id="edit-name"
                      value={selectedProduct.name}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      rows={4}
                      value={selectedProduct.description}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">Price (₹)</Label>
                      <Input
                        id="edit-price"
                        type="number"
                        value={selectedProduct.price}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            price: Number.parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-stock">Stock Quantity</Label>
                      <Input
                        id="edit-stock"
                        type="number"
                        value={selectedProduct.stock}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            stock: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={selectedProduct.category}
                      onValueChange={(value) => setSelectedProduct({ ...selectedProduct, category: value })}
                    >
                      <SelectTrigger id="edit-category">
                        <SelectValue placeholder="Select a category" />
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
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-4 py-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProduct.images &&
                    selectedProduct.images.map((image: string, index: number) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => {
                            const updatedImages = [...selectedProduct.images]
                            updatedImages.splice(index, 1)
                            setSelectedProduct({ ...selectedProduct, images: updatedImages })
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                  <div className="border-2 border-dashed rounded-md flex items-center justify-center aspect-square">
                    <Button variant="ghost">
                      <Plus className="h-6 w-6 mr-2" />
                      Add Image
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 py-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="edit-featured">Featured Product</Label>
                      <p className="text-sm text-gray-500">Featured products appear on the homepage</p>
                    </div>
                    <Switch
                      id="edit-featured"
                      checked={selectedProduct.featured}
                      onCheckedChange={(checked) => setSelectedProduct({ ...selectedProduct, featured: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="edit-published">Published</Label>
                      <p className="text-sm text-gray-500">Published products are visible to customers</p>
                    </div>
                    <Switch
                      id="edit-published"
                      checked={selectedProduct.published}
                      onCheckedChange={(checked) => setSelectedProduct({ ...selectedProduct, published: checked })}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateProduct(selectedProduct)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
