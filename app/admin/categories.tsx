"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
import { Pencil, Trash2, Plus, Eye, EyeOff } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Category {
  id: string
  name: string
  description: string
  featured?: boolean
  image?: string
  isActive?: boolean
}

interface CategoriesTabProps {
  categories: Category[]
  setCategories: (categories: Category[]) => void
}

export default function CategoriesTab({ categories, setCategories }: CategoriesTabProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    description: "",
    featured: false,
    isActive: true,
    image: "/placeholder.svg?height=100&width=100",
  })

  // Handle adding a new category
  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({
        title: "Missing information",
        description: "Please enter a category name",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...categories.map((c) => Number.parseInt(c.id)), 0) + 1

    const categoryToAdd: Category = {
      id: newId.toString(),
      name: newCategory.name,
      description: newCategory.description || "",
      featured: newCategory.featured || false,
      isActive: newCategory.isActive || true,
      image: newCategory.image || "/placeholder.svg?height=100&width=100",
    }

    setCategories([...categories, categoryToAdd])
    setIsAddDialogOpen(false)
    setNewCategory({
      name: "",
      description: "",
      featured: false,
      isActive: true,
      image: "/placeholder.svg?height=100&width=100",
    })

    toast({
      title: "Category added",
      description: "The category has been added successfully",
    })
  }

  // Handle editing a category
  const handleEditCategory = () => {
    if (!currentCategory) return

    const updatedCategories = categories.map((category) =>
      category.id === currentCategory.id ? currentCategory : category,
    )

    setCategories(updatedCategories)
    setCurrentCategory(null)
    setIsEditDialogOpen(false)

    toast({
      title: "Category updated",
      description: "The category has been updated successfully",
    })
  }

  // Handle deleting a category
  const handleDeleteCategory = () => {
    if (!categoryToDelete) return

    const updatedCategories = categories.filter((category) => category.id !== categoryToDelete)
    setCategories(updatedCategories)
    setCategoryToDelete(null)
    setDeleteConfirmOpen(false)

    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully",
    })
  }

  // Toggle category active status
  const toggleCategoryStatus = (id: string) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, isActive: !category.isActive } : category,
    )
    setCategories(updatedCategories)

    toast({
      title: "Category status updated",
      description: "The category status has been updated successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Categories Management</h2>
        <Button className="flex items-center gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus size={16} />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Categories</CardTitle>
          <CardDescription>Manage your product categories and subcategories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Category Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                            {category.image ? (
                              <img
                                src={category.image || "/placeholder.svg"}
                                alt={category.name}
                                className="w-6 h-6 object-contain"
                              />
                            ) : (
                              <div className="text-xs text-gray-400">No img</div>
                            )}
                          </div>
                          <div>{category.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">{category.description}</TableCell>
                      <TableCell>{category.featured ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        {category.isActive !== false ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <Eye size={16} />
                            <span>Active</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-gray-500">
                            <EyeOff size={16} />
                            <span>Inactive</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setCurrentCategory(category)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => toggleCategoryStatus(category.id)}>
                            {category.isActive !== false ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500"
                            onClick={() => {
                              setCategoryToDelete(category.id)
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
                    <TableCell colSpan={5} className="text-center py-6">
                      No categories found. Add your first category to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name*</Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newCategory.description || ""}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={newCategory.featured || false}
                onCheckedChange={(checked) => setNewCategory({ ...newCategory, featured: checked })}
              />
              <Label htmlFor="featured">Featured Category</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={newCategory.isActive !== false}
                onCheckedChange={(checked) => setNewCategory({ ...newCategory, isActive: checked })}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {currentCategory && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Category Name*</Label>
                <Input
                  id="edit-name"
                  value={currentCategory.name}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentCategory.description}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-featured"
                  checked={currentCategory.featured || false}
                  onCheckedChange={(checked) => setCurrentCategory({ ...currentCategory, featured: checked })}
                />
                <Label htmlFor="edit-featured">Featured Category</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-isActive"
                  checked={currentCategory.isActive !== false}
                  onCheckedChange={(checked) => setCurrentCategory({ ...currentCategory, isActive: checked })}
                />
                <Label htmlFor="edit-isActive">Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this category. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDeleteCategory}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
