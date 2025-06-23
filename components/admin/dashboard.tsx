"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, ShoppingCart, Package, LogOut, Home, Star, Phone } from "lucide-react"

interface AdminDashboardProps {
  onLogout?: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [stats] = useState({
    totalOrders: 156,
    totalRevenue: 245000,
    totalCustomers: 89,
    totalProducts: 105,
  })

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  const handleViewSite = () => {
    window.open("/", "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">C4 Chashma Admin</h1>
              <Badge variant="secondary">Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleViewSite}>
                <Home className="h-4 w-4 mr-2" />
                View Site
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">All categories included</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "ORD001", customer: "Rahul Sharma", amount: 1299, status: "Completed" },
                  { id: "ORD002", customer: "Priya Patel", amount: 899, status: "Processing" },
                  { id: "ORD003", customer: "Amit Kumar", amount: 1599, status: "Shipped" },
                  { id: "ORD004", customer: "Sneha Singh", amount: 749, status: "Pending" },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{order.amount}</p>
                      <Badge variant={order.status === "Completed" ? "default" : "secondary"}>{order.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Classic Round Black Frames", sales: 45, rating: 4.8 },
                  { name: "Cat Eye Elegance", sales: 38, rating: 4.7 },
                  { name: "Modern Square Frames", sales: 32, rating: 4.6 },
                  { name: "Vintage Aviator Style", sales: 28, rating: 4.9 },
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.sales} sold</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Info */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Details
                  </h4>
                  <p className="text-sm text-blue-800 mb-1">Phone: +91 9509919004</p>
                  <p className="text-sm text-blue-800 mb-1">Email: c4chashma@gmail.com</p>
                  <p className="text-sm text-blue-800">Hours: 10:30 AM - 9:30 PM</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Admin Access
                  </h4>
                  <p className="text-sm text-green-800 mb-1">Username: admin</p>
                  <p className="text-sm text-green-800 mb-1">Password: manshu@123</p>
                  <p className="text-sm text-green-800">Session: 24 hours</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Website Status
                  </h4>
                  <p className="text-sm text-purple-800 mb-1">Platform: Vercel</p>
                  <p className="text-sm text-purple-800 mb-1">Type: Static Export</p>
                  <p className="text-sm text-purple-800">Status: ✅ Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Export both named and default for flexibility
export default AdminDashboard
