"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Pencil, Trash2, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { format } from "date-fns"

export default function DiscountsTab({
  discountCodes,
  setDiscountCodes,
}: {
  discountCodes: any[]
  setDiscountCodes: (discountCodes: any[]) => void
}) {
  const [editingDiscountCode, setEditingDiscountCode] = useState<any>(null)
  const [discountCodeSearch, setDiscountCodeSearch] = useState("")
  const [discountCodeToDelete, setDiscountCodeToDelete] = useState<number | null>(null)
  const [deleteDiscountCodeOpen, setDeleteDiscountCodeOpen] = useState(false)

  // Filter discount codes
  const filteredDiscountCodes = discountCodes.filter((code) =>
    code.code.toLowerCase().includes(discountCodeSearch.toLowerCase()),
  )

  const handleDeleteDiscountCode = (id: number) => {
    setDiscountCodeToDelete(id)
    setDeleteDiscountCodeOpen(true)
  }

  const confirmDeleteDiscountCode = () => {
    if (discountCodeToDelete) {
      setDiscountCodes(discountCodes.filter((code) => code.id !== discountCodeToDelete))
      toast({
        title: "Discount code deleted",
        description: "The discount code has been deleted successfully",
      })
      setDeleteDiscountCodeOpen(false)
      setDiscountCodeToDelete(null)
    }
  }

  const handleEditDiscountCode = (code: any) => {
    setEditingDiscountCode({ ...code })
  }

  const handleSaveDiscountCode = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingDiscountCode.code || !editingDiscountCode.discount) {
      toast({
        title: "Validation Error",
        description: "Code and discount value are required",
        variant: "destructive",
      })
      return
    }

    if (editingDiscountCode) {
      if (editingDiscountCode.id) {
        // Update existing discount code
        setDiscountCodes(discountCodes.map((c) => (c.id === editingDiscountCode.id ? editingDiscountCode : c)))
        toast({
          title: "Discount code updated",
          description: "The discount code has been updated successfully",
        })
      } else {
        // Add new discount code
        const newDiscountCode = {
          ...editingDiscountCode,
          id: Math.max(...discountCodes.map((c) => c.id), 0) + 1,
        }
        setDiscountCodes([...discountCodes, newDiscountCode])
        toast({
          title: "Discount code added",
          description: "The discount code has been added successfully",
        })
      }
      setEditingDiscountCode(null)
    }
  }

  const toggleDiscountCodeStatus = (id: number) => {
    setDiscountCodes(discountCodes.map((code) => (code.id === id ? { ...code, active: !code.active } : code)))
    toast({
      title: "Discount code updated",
      description: "The discount code status has been updated",
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Discount Codes</h2>
        <Button
          onClick={() =>
            setEditingDiscountCode({
              code: "",
              discount: "",
              type: "Percentage",
              minOrder: 0,
              maxDiscount: null,
              validFrom: format(new Date(), "yyyy-MM-dd"),
              validTo: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), "yyyy-MM-dd"),
              usageLimit: null,
              usageCount: 0,
              active: true,
            })
          }
          className="bg-red-500 hover:bg-red-600 text-white rounded-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Discount Code
        </Button>
      </div>

      {/* Discount Code Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search discount codes..."
            className="pl-10 rounded-full"
            value={discountCodeSearch}
            onChange={(e) => setDiscountCodeSearch(e.target.value)}
          />
        </div>
      </div>

      {editingDiscountCode ? (
        <div className="border rounded-xl p-6 mb-8 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {editingDiscountCode.id ? "Edit Discount Code" : "Add New Discount Code"}
          </h3>
          <form onSubmit={handleSaveDiscountCode} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Code*</Label>
                <Input
                  id="code"
                  value={editingDiscountCode.code}
                  onChange={(e) =>
                    setEditingDiscountCode({ ...editingDiscountCode, code: e.target.value.toUpperCase() })
                  }
                  required
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="type">Discount Type*</Label>
                <Select
                  value={editingDiscountCode.type}
                  onValueChange={(value) => setEditingDiscountCode({ ...editingDiscountCode, type: value })}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                    <SelectItem value="Fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="discount">
                  {editingDiscountCode.type === "Percentage" ? "Discount Percentage*" : "Discount Amount (₹)*"}
                </Label>
                <Input
                  id="discount"
                  type="number"
                  value={editingDiscountCode.discount}
                  onChange={(e) => setEditingDiscountCode({ ...editingDiscountCode, discount: Number(e.target.value) })}
                  required
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="minOrder">Minimum Order Value (₹)</Label>
                <Input
                  id="minOrder"
                  type="number"
                  value={editingDiscountCode.minOrder}
                  onChange={(e) => setEditingDiscountCode({ ...editingDiscountCode, minOrder: Number(e.target.value) })}
                  className="rounded-lg"
                />
              </div>
              {editingDiscountCode.type === "Percentage" && (
                <div>
                  <Label htmlFor="maxDiscount">Maximum Discount (₹)</Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    value={editingDiscountCode.maxDiscount || ""}
                    onChange={(e) =>
                      setEditingDiscountCode({
                        ...editingDiscountCode,
                        maxDiscount: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="rounded-lg"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={editingDiscountCode.usageLimit || ""}
                  onChange={(e) =>
                    setEditingDiscountCode({
                      ...editingDiscountCode,
                      usageLimit: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="validFrom">Valid From*</Label>
                <Input
                  id="validFrom"
                  type="date"
                  value={editingDiscountCode.validFrom}
                  onChange={(e) => setEditingDiscountCode({ ...editingDiscountCode, validFrom: e.target.value })}
                  required
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="validTo">Valid To*</Label>
                <Input
                  id="validTo"
                  type="date"
                  value={editingDiscountCode.validTo}
                  onChange={(e) => setEditingDiscountCode({ ...editingDiscountCode, validTo: e.target.value })}
                  required
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={editingDiscountCode.active}
                onCheckedChange={(checked) => setEditingDiscountCode({ ...editingDiscountCode, active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingDiscountCode(null)}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white rounded-full">
                Save Discount Code
              </Button>
            </div>
          </form>
        </div>
      ) : null}

      {filteredDiscountCodes.length === 0 ? (
        <div className="text-center py-12 border rounded-xl">
          <p className="text-gray-500">No discount codes found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Valid Period</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDiscountCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell className="font-medium">{code.code}</TableCell>
                  <TableCell>{code.type}</TableCell>
                  <TableCell>
                    {code.type === "Percentage" ? `${code.discount}%` : `₹${code.discount}`}
                    {code.minOrder > 0 && <div className="text-xs text-gray-500">Min: ₹{code.minOrder}</div>}
                    {code.maxDiscount && <div className="text-xs text-gray-500">Max: ₹{code.maxDiscount}</div>}
                  </TableCell>
                  <TableCell>
                    <div>{new Date(code.validFrom).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500">to {new Date(code.validTo).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>
                    {code.usageCount} / {code.usageLimit || "∞"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={code.active}
                        onCheckedChange={() => toggleDiscountCodeStatus(code.id)}
                        aria-label="Toggle status"
                      />
                      <Badge className={`rounded-full ${code.active ? "bg-green-500" : "bg-gray-400"}`}>
                        {code.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => handleEditDiscountCode(code)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 rounded-full"
                        onClick={() => handleDeleteDiscountCode(code.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDiscountCodeOpen} onOpenChange={setDeleteDiscountCodeOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this discount code? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDiscountCodeOpen(false)} className="rounded-full">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteDiscountCode} className="rounded-full">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
