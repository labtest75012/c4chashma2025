"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MessageCircle, Phone, User } from "lucide-react"

// Mock data for WhatsApp inquiries
const mockInquiries = [
  {
    id: "1",
    customerName: "Rahul Sharma",
    phone: "9876543210",
    message: "I'm interested in the Classic Round Glasses. Do you have them in gold color?",
    type: "product",
    product: "Classic Round Glasses",
    status: "new",
    date: "2023-05-15T10:30:00",
  },
  {
    id: "2",
    customerName: "Priya Patel",
    phone: "8765432109",
    message: "I'd like to book an eye test for tomorrow afternoon if possible.",
    type: "eye-test",
    status: "responded",
    date: "2023-05-14T15:45:00",
  },
  {
    id: "3",
    customerName: "Amit Kumar",
    phone: "7654321098",
    message: "Do you have any ongoing discounts on sunglasses?",
    type: "general",
    status: "closed",
    date: "2023-05-13T09:15:00",
  },
  {
    id: "4",
    customerName: "Sneha Gupta",
    phone: "6543210987",
    message: "I want to place an order for 2 pairs of computer glasses.",
    type: "order",
    product: "Computer Glasses",
    status: "new",
    date: "2023-05-15T08:20:00",
  },
]

export default function WhatsAppInquiries() {
  const [inquiries, setInquiries] = useState(mockInquiries)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter inquiries based on active tab and search term
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesTab = activeTab === "all" || inquiry.type === activeTab || inquiry.status === activeTab
    const matchesSearch =
      inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.phone.includes(searchTerm)

    return matchesTab && matchesSearch
  })

  // Sort inquiries by date (newest first)
  const sortedInquiries = [...filteredInquiries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Mark inquiry as responded
  const markAsResponded = (id: string) => {
    setInquiries(inquiries.map((inquiry) => (inquiry.id === id ? { ...inquiry, status: "responded" } : inquiry)))
  }

  // Mark inquiry as closed
  const markAsClosed = (id: string) => {
    setInquiries(inquiries.map((inquiry) => (inquiry.id === id ? { ...inquiry, status: "closed" } : inquiry)))
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-red-500">New</Badge>
      case "responded":
        return <Badge className="bg-blue-500">Responded</Badge>
      case "closed":
        return <Badge className="bg-green-500">Closed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Inquiries</CardTitle>
          <CardDescription>Manage and respond to customer inquiries from WhatsApp</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Search by name, phone or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="responded">Responded</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-4">
              {sortedInquiries.length > 0 ? (
                sortedInquiries.map((inquiry) => (
                  <Card key={inquiry.id} className="overflow-hidden">
                    <div className="border-l-4 border-green-500 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{inquiry.customerName}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(inquiry.date)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{formatTime(inquiry.date)}</span>
                          </div>
                          {getStatusBadge(inquiry.status)}
                        </div>
                      </div>

                      <div className="flex items-start gap-2 mb-3">
                        <Phone className="h-4 w-4 text-gray-500 mt-1" />
                        <span>{inquiry.phone}</span>
                      </div>

                      <div className="flex items-start gap-2 mb-4">
                        <MessageCircle className="h-4 w-4 text-gray-500 mt-1" />
                        <div className="bg-gray-50 p-3 rounded-lg w-full">
                          <p className="whitespace-pre-wrap">{inquiry.message}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`https://wa.me/${inquiry.phone}`, "_blank")}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Reply on WhatsApp
                        </Button>
                        {inquiry.status === "new" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-500 text-blue-500 hover:bg-blue-50"
                            onClick={() => markAsResponded(inquiry.id)}
                          >
                            Mark as Responded
                          </Button>
                        )}
                        {inquiry.status !== "closed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500 text-green-500 hover:bg-green-50"
                            onClick={() => markAsClosed(inquiry.id)}
                          >
                            Mark as Closed
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No inquiries found</h3>
                  <p className="text-gray-500">
                    {searchTerm
                      ? "Try adjusting your search or filter criteria"
                      : "WhatsApp inquiries will appear here"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Response Templates</CardTitle>
          <CardDescription>Create and manage templates for quick responses to common inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-inquiry">Product Inquiry Response</Label>
                <Textarea
                  id="product-inquiry"
                  defaultValue="Thank you for your interest in [PRODUCT]. Yes, we have it in stock in [COLOR]. The price is ₹[PRICE]. Would you like to place an order?"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eye-test">Eye Test Booking Response</Label>
                <Textarea
                  id="eye-test"
                  defaultValue="Thank you for your interest in booking an eye test. We have availability on [DATE] at [TIME]. Would that work for you?"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-confirmation">Order Confirmation</Label>
                <Textarea
                  id="order-confirmation"
                  defaultValue="Thank you for your order! We've received your request for [PRODUCT]. Your order number is [ORDER_ID]. We'll process it right away and update you on the delivery."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="general-inquiry">General Inquiry Response</Label>
                <Textarea
                  id="general-inquiry"
                  defaultValue="Thank you for contacting C4 Chashma. We appreciate your inquiry. [CUSTOM_RESPONSE]"
                  rows={3}
                />
              </div>
            </div>

            <Button className="w-full">Save Response Templates</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
