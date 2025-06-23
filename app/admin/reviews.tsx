"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Search, Filter, Trash2, Check, X, Star } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export default function ReviewsTab({
  reviews,
  setReviews,
}: {
  reviews: any[]
  setReviews: (reviews: any[]) => void
}) {
  const [reviewSearch, setReviewSearch] = useState("")
  const [reviewFilter, setReviewFilter] = useState<string | null>(null)
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null)
  const [deleteReviewOpen, setDeleteReviewOpen] = useState(false)

  // Filter reviews
  const filteredReviews = reviews
    .filter((review) => {
      // Apply search filter
      const matchesSearch =
        review.customer.toLowerCase().includes(reviewSearch.toLowerCase()) ||
        review.product.toLowerCase().includes(reviewSearch.toLowerCase()) ||
        review.review.toLowerCase().includes(reviewSearch.toLowerCase())

      // Apply approval filter
      const matchesFilter =
        reviewFilter === null ||
        (reviewFilter === "approved" && review.approved) ||
        (reviewFilter === "pending" && !review.approved)

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const handleDeleteReview = (id: number) => {
    setReviewToDelete(id)
    setDeleteReviewOpen(true)
  }

  const confirmDeleteReview = () => {
    if (reviewToDelete) {
      setReviews(reviews.filter((review) => review.id !== reviewToDelete))
      toast({
        title: "Review deleted",
        description: "The review has been deleted successfully",
      })
      setDeleteReviewOpen(false)
      setReviewToDelete(null)
    }
  }

  const toggleReviewApproval = (id: number) => {
    setReviews(reviews.map((review) => (review.id === id ? { ...review, approved: !review.approved } : review)))
    toast({
      title: "Review updated",
      description: "The review approval status has been updated",
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Reviews</h2>
      </div>

      {/* Review Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search reviews..."
            className="pl-10 rounded-full"
            value={reviewSearch}
            onChange={(e) => setReviewSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={reviewFilter || "all"}
            onValueChange={(value) => setReviewFilter(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[180px] rounded-full">
              <div className="flex items-center">
                <Filter size={16} className="mr-2" />
                <span>
                  {reviewFilter === "approved" ? "Approved" : reviewFilter === "pending" ? "Pending" : "All Reviews"}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-12 border rounded-xl">
          <p className="text-gray-500">No reviews found. Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.product}</TableCell>
                  <TableCell>{review.customer}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{review.review}</div>
                  </TableCell>
                  <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={`rounded-full ${review.approved ? "bg-green-500" : "bg-amber-500"}`}>
                      {review.approved ? "Approved" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {review.approved ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-amber-500 hover:text-amber-600 rounded-full"
                          onClick={() => toggleReviewApproval(review.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Unapprove</span>
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-500 hover:text-green-600 rounded-full"
                          onClick={() => toggleReviewApproval(review.id)}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 rounded-full"
                        onClick={() => handleDeleteReview(review.id)}
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
      <Dialog open={deleteReviewOpen} onOpenChange={setDeleteReviewOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteReviewOpen(false)} className="rounded-full">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteReview} className="rounded-full">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
