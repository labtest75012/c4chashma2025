"use client"

import { useState } from "react"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Search, Filter, Download } from "lucide-react"

interface OrdersTabProps {
  orders: any[]
  setOrders: (orders: any[]) => void
}

export default function OrdersTab({ orders, setOrders }: OrdersTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) || order.customer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Orders Management</CardTitle>
          <CardDescription>Manage all customer orders from one place</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by order ID or customer name..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>₹{order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          {selectedOrder && (
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Order #{selectedOrder.id}</DialogTitle>
                                <DialogDescription>
                                  Order placed on {new Date(selectedOrder.date).toLocaleDateString()}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                                <div>
                                  <h3 className="font-semibold mb-2">Customer Information</h3>
                                  <p>Name: {selectedOrder.customer}</p>
                                  <p>Email: {selectedOrder.email || "customer@example.com"}</p>
                                  <p>Phone: {selectedOrder.phone || "+91 98765 43210"}</p>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                                  <p>{selectedOrder.address || "123 Main Street"}</p>
                                  <p>
                                    {selectedOrder.city || "Mumbai"}, {selectedOrder.state || "Maharashtra"}
                                  </p>
                                  <p>{selectedOrder.pincode || "400001"}</p>
                                </div>
                              </div>

                              <div className="border rounded-md p-4 mb-4">
                                <h3 className="font-semibold mb-2">Order Items</h3>
                                <div className="space-y-3">
                                  {(
                                    selectedOrder.items || [
                                      { name: "Ray-Ban Aviator", price: 7999, quantity: 1 },
                                      { name: "Contact Lens Solution", price: 499, quantity: 2 },
                                    ]
                                  ).map((item: any, index: number) => (
                                    <div key={index} className="flex justify-between">
                                      <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                      </div>
                                      <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="border-t mt-4 pt-4">
                                  <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>₹{(selectedOrder.total * 0.82).toFixed(2)}</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <p>Tax (18%)</p>
                                    <p>₹{(selectedOrder.total * 0.18).toFixed(2)}</p>
                                  </div>
                                  <div className="flex justify-between font-bold mt-2">
                                    <p>Total</p>
                                    <p>₹{selectedOrder.total.toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-semibold">Order Status</h3>
                                  <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                                </div>
                                <Select
                                  defaultValue={selectedOrder.status.toLowerCase()}
                                  onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Update status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <DialogFooter>
                                <Button variant="outline">Print Invoice</Button>
                                <Button>Send Tracking Info</Button>
                              </DialogFooter>
                            </DialogContent>
                          )}
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No orders found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
