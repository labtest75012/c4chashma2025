"use client"

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Search, Plus, Edit, Trash2, CalendarIcon } from "lucide-react"

interface DiscountsTabProps {
  discountCodes: any[]
  setDiscountCodes: (discountCodes: any[]) => void
}

export default function DiscountsTab({ discountCodes, setDiscountCodes }: DiscountsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDiscountOpen, setIsAddDiscountOpen] = useState(false)
  const [selectedDiscount, setSelectedDiscount] = useState<any>(null)
  const [newDiscount, setNewDiscount] = useState({
    code: "",
    type: "percentage",
    value: "",
    minPurchase: "",
    maxUses: "",
    usedCount: 0,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    active: true,
  })

  // Filter discount codes based on search term
  const filteredDiscountCodes = discountCodes.filter((discount) =>
    discount.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Add new discount code
  const handleAddDiscount = () => {
    const discountToAdd = {
      ...newDiscount,
      id: (Math.max(...discountCodes.map((d) => Number.parseInt(d.id)), 0) + 1).toString(),
      value: Number.parseFloat(newDiscount.value),
      minPurchase: newDiscount.minPurchase ? Number.parseFloat(newDiscount.minPurchase) : 0,
      maxUses: newDiscount.maxUses ? Number.parseInt(newDiscount.maxUses) : null,
    }

    setDiscountCodes([...discountCodes, discountToAdd])
    setIsAddDiscountOpen(false)
    setNewDiscount({
      code: "",
      type: "percentage",
      value: "",
      minPurchase: "",
      maxUses: "",
      usedCount: 0,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      active: true,
    })
  }

  // Delete discount code
  const handleDeleteDiscount = (discountId: string) => {
    setDiscountCodes(discountCodes.filter((discount) => discount.id !== discountId))
  }

  // Update discount code
  const handleUpdateDiscount = (updatedDiscount: any) => {
    setDiscountCodes(discountCodes.map((discount) => (discount.id === updatedDiscount.id ? updatedDiscount : discount)))
    setSelectedDiscount(null)
  }

  // Toggle discount active status
  const toggleDiscountStatus = (discountId: string) => {
    setDiscountCodes(
      discountCodes.map((discount) =>
        discount.id === discountId ? { ...discount, active: !discount.active } : discount,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Discount Codes</CardTitle>
              <CardDescription>Create and manage promotional discount codes</CardDescription>
            </div>
            <Button onClick={() => setIsAddDiscountOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Discount
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search discount codes..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDiscountCodes.length > 0 ? (
                  filteredDiscountCodes.map((discount) => (
                    <TableRow key={discount.id}>
                      <TableCell className="font-medium">{discount.code}</TableCell>
                      <TableCell>
                        {discount.type === "percentage" ? `${discount.value}%` : `₹${discount.value}`}
                        {discount.minPurchase > 0 && (
                          <span className="text-xs text-gray-500 block">Min. purchase: ₹{discount.minPurchase}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{format(new Date(discount.startDate), "MMM d, yyyy")}</div>
                          <div className="text-gray-500">to</div>
                          <div>{format(new Date(discount.endDate), "MMM d, yyyy")}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {discount.usedCount} / {discount.maxUses || "∞"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={discount.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {discount.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedDiscount(discount)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => toggleDiscountStatus(discount.id)}>
                            {discount.active ? (
                              <span className="text-red-500">Disable</span>
                            ) : (
                              <span className="text-green-500">Enable</span>
                            )}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteDiscount(discount.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No discount codes found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Discount Dialog */}
      <Dialog open={isAddDiscountOpen} onOpenChange={setIsAddDiscountOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Discount</DialogTitle>
            <DialogDescription>Create a new promotional discount code</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">Discount Code</Label>
              <Input
                id="code"
                placeholder="e.g. SUMMER20"
                value={newDiscount.code}
                onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value.toUpperCase() })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Discount Type</Label>
                <Select
                  value={newDiscount.type}
                  onValueChange={(value) => setNewDiscount({ ...newDiscount, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">{newDiscount.type === "percentage" ? "Percentage (%)" : "Amount (₹)"}</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder={newDiscount.type === "percentage" ? "10" : "100"}
                  value={newDiscount.value}
                  onChange={(e) => setNewDiscount({ ...newDiscount, value: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minPurchase">Minimum Purchase (₹)</Label>
                <Input
                  id="minPurchase"
                  type="number"
                  placeholder="Optional"
                  value={newDiscount.minPurchase}
                  onChange={(e) => setNewDiscount({ ...newDiscount, minPurchase: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxUses">Maximum Uses</Label>
                <Input
                  id="maxUses"
                  type="number"
                  placeholder="Optional"
                  value={newDiscount.maxUses}
                  onChange={(e) => setNewDiscount({ ...newDiscount, maxUses: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(newDiscount.startDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newDiscount.startDate}
                      onSelect={(date) => date && setNewDiscount({ ...newDiscount, startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(newDiscount.endDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newDiscount.endDate}
                      onSelect={(date) => date && setNewDiscount({ ...newDiscount, endDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={newDiscount.active}
                onCheckedChange={(checked) => setNewDiscount({ ...newDiscount, active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDiscountOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDiscount}>Add Discount</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Discount Dialog */}
      {selectedDiscount && (
        <Dialog open={!!selectedDiscount} onOpenChange={(open) => !open && setSelectedDiscount(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Discount</DialogTitle>
              <DialogDescription>Update discount code details</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-code">Discount Code</Label>
                <Input
                  id="edit-code"
                  value={selectedDiscount.code}
                  onChange={(e) => setSelectedDiscount({ ...selectedDiscount, code: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Discount Type</Label>
                  <Select
                    value={selectedDiscount.type}
                    onValueChange={(value) => setSelectedDiscount({ ...selectedDiscount, type: value })}
                  >
                    <SelectTrigger id="edit-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-value">
                    {selectedDiscount.type === "percentage" ? "Percentage (%)" : "Amount (₹)"}
                  </Label>
                  <Input
                    id="edit-value"
                    type="number"
                    value={selectedDiscount.value}
                    onChange={(e) =>
                      setSelectedDiscount({
                        ...selectedDiscount,
                        value: Number.parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-minPurchase">Minimum Purchase (₹)</Label>
                  <Input
                    id="edit-minPurchase"
                    type="number"
                    value={selectedDiscount.minPurchase || ""}
                    onChange={(e) =>
                      setSelectedDiscount({
                        ...selectedDiscount,
                        minPurchase: e.target.value ? Number.parseFloat(e.target.value) : 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-maxUses">Maximum Uses</Label>
                  <Input
                    id="edit-maxUses"
                    type="number"
                    value={selectedDiscount.maxUses || ""}
                    onChange={(e) =>
                      setSelectedDiscount({
                        ...selectedDiscount,
                        maxUses: e.target.value ? Number.parseInt(e.target.value) : null,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(new Date(selectedDiscount.startDate), "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(selectedDiscount.startDate)}
                        onSelect={(date) => date && setSelectedDiscount({ ...selectedDiscount, startDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(new Date(selectedDiscount.endDate), "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(selectedDiscount.endDate)}
                        onSelect={(date) => date && setSelectedDiscount({ ...selectedDiscount, endDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={selectedDiscount.active}
                  onCheckedChange={(checked) => setSelectedDiscount({ ...selectedDiscount, active: checked })}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>

              <div className="pt-2">
                <p className="text-sm text-gray-500">Used {selectedDiscount.usedCount} times</p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedDiscount(null)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateDiscount(selectedDiscount)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
