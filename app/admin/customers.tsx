"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Search, Download, Eye } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export default function CustomersTab({
  customers,
  orders,
}: {
  customers: any[]
  orders: any[]
}) {
  const [customerSearch, setCustomerSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [viewCustomerOpen, setViewCustomerOpen] = useState(false)

  // Filter customers
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.phone.includes(customerSearch),
  )

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setViewCustomerOpen(true)
  }

  const exportCustomers = () => {
    // In a real app, this would generate a CSV file for download
    const csv = [
      ["ID", "Name", "Email", "Phone", "Orders", "Total Spent"].join(","),
      ...filteredCustomers.map((customer) =>
        [customer.id, customer.name, customer.email, customer.phone, customer.orders, customer.totalSpent].join(","),
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

  // Get customer orders
  const getCustomerOrders = (customerId: number) => {
    return orders.filter((order) => {
      const customer = customers.find((c) => c.id === customerId)
      return customer && order.customer === customer.name
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Customers</h2>
        <Button onClick={exportCustomers} className="bg-red-500 hover:bg-red-600 text-white rounded-full">
          <Download className="h-4 w-4 mr-2" />
          Export Customers
        </Button>
      </div>

      {/* Customer Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search customers..."
            className="pl-10 rounded-full"
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Customer Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{customers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{customers.reduce((total, customer) => total + customer.orders, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{customers.reduce((total, customer) => total + customer.totalSpent, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="text-center py-12 border rounded-xl">
          <p className="text-gray-500">No customers found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-center">Orders</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell className="text-center">{customer.orders}</TableCell>
                  <TableCell className="text-right">₹{customer.totalSpent}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => handleViewCustomer(customer)}
                    >
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

      {/* View Customer Dialog */}
      <Dialog open={viewCustomerOpen} onOpenChange={setViewCustomerOpen}>
        <DialogContent className="max-w-3xl rounded-xl">
          <DialogHeader>
            <DialogTitle>Customer Details - {selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p>Name: {selectedCustomer.name}</p>
                  <p>Email: {selectedCustomer.email}</p>
                  <p>Phone: {selectedCustomer.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Order Summary</h3>
                  <p>Total Orders: {selectedCustomer.orders}</p>
                  <p>Total Spent: ₹{selectedCustomer.totalSpent}</p>
                  <p>Last Order: {new Date(selectedCustomer.lastOrder).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Order History</h3>
                {getCustomerOrders(selectedCustomer.id).length === 0 ? (
                  <p className="text-gray-500">No orders found for this customer.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getCustomerOrders(selectedCustomer.id).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                          <TableCell>{order.status}</TableCell>
                          <TableCell className="text-right">₹{order.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setViewCustomerOpen(false)} className="rounded-full">
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
