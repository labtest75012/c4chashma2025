"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Search, Download, Mail, Phone, Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
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

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  joinDate: string
  orders: number
  totalSpent: number
  lastOrder: string
  loyaltyPoints: number
  avatar?: string
}

interface CustomersTabProps {
  customers: Customer[]
  orders: any[]
  setCustomers: (customers: Customer[]) => void
}

export default function CustomersTab({ customers, orders, setCustomers }: CustomersTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null)
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: "",
    email: "",
    phone: "",
    location: "",
    loyaltyPoints: 0,
  })

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get customer orders
  const getCustomerOrders = (customerId: string) => {
    return orders.filter((order) => order.customerId === customerId)
  }

  // Get customer initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Handle adding a new customer
  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...customers.map((c) => Number.parseInt(c.id)), 0) + 1

    const customerToAdd: Customer = {
      id: newId.toString(),
      name: newCustomer.name,
      email: newCustomer.email || "",
      phone: newCustomer.phone || "",
      location: newCustomer.location || "",
      joinDate: new Date().toISOString(),
      orders: 0,
      totalSpent: 0,
      lastOrder: new Date().toISOString(),
      loyaltyPoints: newCustomer.loyaltyPoints || 0,
    }

    setCustomers([...customers, customerToAdd])
    setIsAddDialogOpen(false)
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      location: "",
      loyaltyPoints: 0,
    })

    toast({
      title: "Customer added",
      description: "The customer has been added successfully",
    })
  }

  // Handle editing a customer
  const handleEditCustomer = () => {
    if (!selectedCustomer) return

    const updatedCustomers = customers.map((customer) =>
      customer.id === selectedCustomer.id ? selectedCustomer : customer,
    )

    setCustomers(updatedCustomers)
    setSelectedCustomer(null)
    setIsEditDialogOpen(false)

    toast({
      title: "Customer updated",
      description: "The customer has been updated successfully",
    })
  }

  // Handle deleting a customer
  const handleDeleteCustomer = () => {
    if (!customerToDelete) return

    const updatedCustomers = customers.filter((customer) => customer.id !== customerToDelete)
    setCustomers(updatedCustomers)
    setCustomerToDelete(null)
    setDeleteConfirmOpen(false)

    toast({
      title: "Customer deleted",
      description: "The customer has been deleted successfully",
    })
  }

  // Export customers to CSV
  const exportCustomers = () => {
    const csv = [
      ["ID", "Name", "Email", "Phone", "Location", "Join Date", "Orders", "Total Spent", "Loyalty Points"].join(","),
      ...customers.map((customer) =>
        [
          customer.id,
          customer.name,
          customer.email,
          customer.phone,
          customer.location,
          new Date(customer.joinDate).toLocaleDateString(),
          customer.orders,
          customer.totalSpent,
          customer.loyaltyPoints,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "customers.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Customers exported",
      description: "Your customers have been exported to CSV",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCustomers}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
          <CardDescription>Manage your customer database and view detailed customer information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name, email, phone or location..."
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
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-xs text-gray-500">
                              Since {new Date(customer.joinDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.location}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>₹{customer.totalSpent.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedCustomer(customer)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedCustomer(customer)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500"
                            onClick={() => {
                              setCustomerToDelete(customer.id)
                              setDeleteConfirmOpen(true)
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
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      No customers found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Customer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Customer Profile</DialogTitle>
            <DialogDescription>Detailed information about {selectedCustomer?.name}</DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="flex flex-col md:flex-row gap-6 py-4">
              <div className="md:w-1/3">
                <div className="flex flex-col items-center p-6 border rounded-lg">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={selectedCustomer.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">{getInitials(selectedCustomer.name)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                  <p className="text-gray-500 mb-4">
                    Customer since {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email</span>
                      <span className="font-medium">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone</span>
                      <span className="font-medium">{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location</span>
                      <span className="font-medium">{selectedCustomer.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <Tabs defaultValue="orders">
                  <TabsList className="w-full">
                    <TabsTrigger value="orders" className="flex-1">
                      Orders
                    </TabsTrigger>
                    <TabsTrigger value="prescriptions" className="flex-1">
                      Prescriptions
                    </TabsTrigger>
                    <TabsTrigger value="appointments" className="flex-1">
                      Appointments
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="orders" className="border rounded-md mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getCustomerOrders(selectedCustomer.id).length > 0 ? (
                          getCustomerOrders(selectedCustomer.id).map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>{order.id}</TableCell>
                              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                              <TableCell>₹{order.total.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Shipped"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                              No orders found for this customer
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="prescriptions" className="p-4 border rounded-md mt-4">
                    <div className="text-center py-8 text-gray-500">
                      No prescription records found for this customer
                    </div>
                  </TabsContent>

                  <TabsContent value="appointments" className="p-4 border rounded-md mt-4">
                    <div className="text-center py-8 text-gray-500">No appointment records found for this customer</div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold">Customer Stats</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-2xl font-bold">{selectedCustomer.orders}</p>
                      <p className="text-gray-500">Total Orders</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-2xl font-bold">₹{selectedCustomer.totalSpent.toFixed(2)}</p>
                      <p className="text-gray-500">Total Spent</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-2xl font-bold">{selectedCustomer.loyaltyPoints}</p>
                      <p className="text-gray-500">Loyalty Points</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>Add a new customer to your database</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name*</Label>
              <Input
                id="name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address*</Label>
              <Input
                id="email"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number*</Label>
              <Input
                id="phone"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newCustomer.location}
                onChange={(e) => setNewCustomer({ ...newCustomer, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loyaltyPoints">Loyalty Points</Label>
              <Input
                id="loyaltyPoints"
                type="number"
                value={newCustomer.loyaltyPoints || 0}
                onChange={(e) => setNewCustomer({ ...newCustomer, loyaltyPoints: Number(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomer}>Add Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>Update customer information</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name*</Label>
                <Input
                  id="edit-name"
                  value={selectedCustomer.name}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email Address*</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedCustomer.email}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number*</Label>
                <Input
                  id="edit-phone"
                  value={selectedCustomer.phone}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={selectedCustomer.location}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-loyaltyPoints">Loyalty Points</Label>
                <Input
                  id="edit-loyaltyPoints"
                  type="number"
                  value={selectedCustomer.loyaltyPoints}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, loyaltyPoints: Number(e.target.value) })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCustomer}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this customer and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCustomerToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDeleteCustomer}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
