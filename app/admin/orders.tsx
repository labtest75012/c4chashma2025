"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Download } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export default function OrdersTab({ orders, setOrders }: { orders: any[]; setOrders: (orders: any[]) => void }) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [orderSearch, setOrderSearch] = useState("")
  const [orderFilter, setOrderFilter] = useState<string | null>(null)
  const [viewOrderOpen, setViewOrderOpen] = useState(false)

  // Filter orders
  const filteredOrders = orders
    .filter((order) => {
      // Apply search filter
      const matchesSearch =
        order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        order.customer.toLowerCase().includes(orderSearch.toLowerCase())

      // Apply status filter
      const matchesFilter = !orderFilter || order.status === orderFilter

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date, newest first

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setViewOrderOpen(true)
  }

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    toast({
      title: "Order updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    })

    setViewOrderOpen(false)
  }

  const exportOrders = () => {
    // In a real app, this would generate a CSV file for download
    const csv = [
      ["Order ID", "Customer", "Date", "Total", "Status"].join(","),
      ...filteredOrders.map((order) => [order.id, order.customer, order.date, order.total, order.status].join(",")),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "orders.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Orders exported",
      description: "Your orders have been exported to CSV",
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Orders</h2>
        <Button onClick={exportOrders} className="bg-red-500 hover:bg-red-600 text-white rounded-full">
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Order Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search orders..."
            className="pl-10 rounded-full"
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={orderFilter || "all"}
            onValueChange={(value) => setOrderFilter(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[180px] rounded-full">
              <div className="flex items-center">
                <Filter size={16} className="mr-2" />
                <span>{orderFilter || "All Statuses"}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{orders.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{orders.filter((order) => order.status === "Processing").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{orders.filter((order) => order.status === "Shipped").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{orders.filter((order) => order.status === "Delivered").length}</p>
          </CardContent>
        </Card>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 border rounded-xl">
          <p className="text-gray-500">No orders found. Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
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
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>₹{order.total}</TableCell>
                  <TableCell>
                    <Badge
                      className={`rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Shipped"
                            ? "bg-blue-500"
                            : order.status === "Processing"
                              ? "bg-amber-500"
                              : "bg-red-500"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => handleViewOrder(order)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* View Order Dialog */}
      <Dialog open={viewOrderOpen} onOpenChange={setViewOrderOpen}>
        <DialogContent className="max-w-3xl rounded-xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p>Name: {selectedOrder.customer}</p>
                  <p>Contact: {selectedOrder.contact}</p>
                  <p>Address: {selectedOrder.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Order Information</h3>
                  <p>Date: {new Date(selectedOrder.date).toLocaleDateString()}</p>
                  <p>Payment Method: {selectedOrder.paymentMethod}</p>
                  <p>
                    Status:{" "}
                    <Badge
                      className={`rounded-full ${
                        selectedOrder.status === "Delivered"
                          ? "bg-green-500"
                          : selectedOrder.status === "Shipped"
                            ? "bg-blue-500"
                            : selectedOrder.status === "Processing"
                              ? "bg-amber-500"
                              : "bg-red-500"
                      }`}
                    >
                      {selectedOrder.status}
                    </Badge>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">₹{item.price}</TableCell>
                        <TableCell className="text-right">₹{item.price * item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  {selectedOrder.notes && (
                    <div>
                      <h3 className="font-semibold mb-2">Notes</h3>
                      <p className="text-gray-700">{selectedOrder.notes}</p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">Total: ₹{selectedOrder.total}</p>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Select
                  defaultValue={selectedOrder.status}
                  onValueChange={(value) => handleUpdateOrderStatus(selectedOrder.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => setViewOrderOpen(false)} className="rounded-full">
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
