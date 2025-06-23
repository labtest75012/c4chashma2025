"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2 } from "lucide-react"

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<any[]>([])
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  })

  // Load categories from localStorage
  useEffect(() => {
    const storedCategories = localStorage.getItem("c4chashma_categories")

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

  // Save categories to localStorage whenever they change
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("c4chashma_categories", JSON.stringify(categories))
    }
  }, [categories])

  // Add new category
  const handleAddCategory = () => {
    const newId = (Math.max(...categories.map((c) => Number.parseInt(c.id)), 0) + 1).toString()

    const categoryToAdd = {
      ...newCategory,
      id: newId,
    }

    setCategories([...categories, categoryToAdd])
    setIsAddCategoryOpen(false)
    setNewCategory({
      name: "",
      description: "",
    })
  }

  // Delete category
  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((category) => category.id !== categoryId))
  }

  // Update category
  const handleUpdateCategory = (updatedCategory: any) => {
    setCategories(categories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)))
    setSelectedCategory(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage product categories for better organization</CardDescription>
            </div>
            <Button onClick={() => setIsAddCategoryOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{category.productCount || 0}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(category)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new product category</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="Enter category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter category description"
                rows={3}
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      {selectedCategory && (
        <Dialog open={!!selectedCategory} onOpenChange={(open) => !open && setSelectedCategory(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>Update category details</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  value={selectedCategory.name}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  rows={3}
                  value={selectedCategory.description}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateCategory(selectedCategory)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
