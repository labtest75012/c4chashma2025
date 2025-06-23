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
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Check, X, Star, MessageSquare } from "lucide-react"

interface ReviewsTabProps {
  reviews: any[]
  setReviews: (reviews: any[]) => void
}

export default function ReviewsTab({ reviews, setReviews }: ReviewsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [replyText, setReplyText] = useState("")

  // Filter reviews based on search term, status filter, and rating filter
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (review.text && review.text.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "approved" && review.approved) ||
      (statusFilter === "pending" && !review.approved)

    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

    return matchesSearch && matchesStatus && matchesRating
  })

  // Approve review
  const approveReview = (reviewId: string) => {
    const updatedReviews = reviews.map((review) => (review.id === reviewId ? { ...review, approved: true } : review))
    setReviews(updatedReviews)

    if (selectedReview && selectedReview.id === reviewId) {
      setSelectedReview({ ...selectedReview, approved: true })
    }
  }

  // Reject review
  const rejectReview = (reviewId: string) => {
    const updatedReviews = reviews.map((review) => (review.id === reviewId ? { ...review, approved: false } : review))
    setReviews(updatedReviews)

    if (selectedReview && selectedReview.id === reviewId) {
      setSelectedReview({ ...selectedReview, approved: false })
    }
  }

  // Add reply to review
  const addReply = (reviewId: string) => {
    if (!replyText.trim()) return

    const updatedReviews = reviews.map((review) =>
      review.id === reviewId
        ? {
            ...review,
            reply: replyText,
            replyDate: new Date().toISOString(),
          }
        : review,
    )
    setReviews(updatedReviews)

    if (selectedReview && selectedReview.id === reviewId) {
      setSelectedReview({
        ...selectedReview,
        reply: replyText,
        replyDate: new Date().toISOString(),
      })
    }

    setReplyText("")
  }

  // Render stars for rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
          <CardDescription>Manage and respond to customer product reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search reviews..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-[180px]">
                  <Star className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{review.customer}</TableCell>
                      <TableCell>{review.product}</TableCell>
                      <TableCell>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </TableCell>
                      <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {review.approved ? (
                          <Badge className="bg-green-100 text-green-800">Approved</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedReview(review)}>
                            <MessageSquare className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {!review.approved && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600"
                              onClick={() => approveReview(review.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          )}
                          {review.approved && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => rejectReview(review.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No reviews found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Review Detail Dialog */}
      {selectedReview && (
        <Dialog open={!!selectedReview} onOpenChange={(open) => !open && setSelectedReview(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Review Details</DialogTitle>
              <DialogDescription>
                Review for {selectedReview.product} by {selectedReview.customer}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex">{renderStars(selectedReview.rating)}</div>
                <div className="text-sm text-gray-500">{new Date(selectedReview.date).toLocaleDateString()}</div>
              </div>

              <div className="border rounded-md p-4 bg-gray-50">
                <p className="text-sm">{selectedReview.text || "No review text provided."}</p>
              </div>

              {selectedReview.reply && (
                <div className="border rounded-md p-4 bg-blue-50">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium">Your Reply</p>
                    <p className="text-xs text-gray-500">{new Date(selectedReview.replyDate).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm">{selectedReview.reply}</p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-sm font-medium">{selectedReview.reply ? "Update Reply" : "Add Reply"}</h4>
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <div>
                  <Badge
                    className={
                      selectedReview.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {selectedReview.approved ? "Approved" : "Pending"}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {!selectedReview.approved ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => approveReview(selectedReview.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                      onClick={() => rejectReview(selectedReview.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedReview(null)}>
                Cancel
              </Button>
              <Button onClick={() => addReply(selectedReview.id)}>
                {selectedReview.reply ? "Update Reply" : "Add Reply"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
