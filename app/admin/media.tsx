"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Upload, Trash2, Search, ImageIcon, Copy, Check } from "lucide-react"
import { motion } from "framer-motion"
import { uploadImage, listUploadedImages, deleteUploadedImage, getUploadedImage } from "@/utils/image-upload"

export default function MediaLibrary() {
  const [images, setImages] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [viewImageDialog, setViewImageDialog] = useState(false)
  const [copied, setCopied] = useState(false)

  // Load images on component mount
  useEffect(() => {
    loadImages()
  }, [])

  // Load images from localStorage
  const loadImages = () => {
    const uploadedImages = listUploadedImages()
    setImages(uploadedImages)
  }

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        await uploadImage(file)
      }

      loadImages()
      toast({
        title: "Upload successful",
        description: `${files.length} image${files.length > 1 ? "s" : ""} uploaded successfully`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your images",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Clear the input
      e.target.value = ""
    }
  }

  // Handle image deletion
  const handleDeleteImage = (imageId: string) => {
    deleteUploadedImage(imageId)
    loadImages()
    toast({
      title: "Image deleted",
      description: "The image has been deleted successfully",
    })
  }

  // Handle image selection for viewing
  const handleViewImage = (imageId: string) => {
    setSelectedImage(imageId)
    setViewImageDialog(true)
  }

  // Copy image URL to clipboard
  const copyImageUrl = (imageId: string) => {
    const imageUrl = `/api/images/${imageId}`
    navigator.clipboard.writeText(imageUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "URL copied",
      description: "Image URL has been copied to clipboard",
    })
  }

  // Filter images based on search term
  const filteredImages = images.filter((image) => image.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
        <label>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            <Upload className="h-4 w-4 mr-2" />
            Upload Images
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </Button>
        </label>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Media</TabsTrigger>
            <TabsTrigger value="recent">Recently Uploaded</TabsTrigger>
          </TabsList>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search media..."
              className="pl-10 w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {isUploading && (
            <div className="p-4 bg-blue-50 text-blue-700 rounded-md">Uploading images, please wait...</div>
          )}

          {filteredImages.length === 0 ? (
            <div className="text-center py-12 border rounded-xl">
              <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No images found. Upload some images to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredImages.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div
                    className="aspect-square bg-gray-100 cursor-pointer relative group"
                    onClick={() => handleViewImage(image.id)}
                  >
                    <img
                      src={getUploadedImage(image.id) || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="truncate text-sm" title={image.name}>
                        {image.name}
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyImageUrl(image.id)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteImage(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredImages
              .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
              .slice(0, 10)
              .map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div
                    className="aspect-square bg-gray-100 cursor-pointer relative group"
                    onClick={() => handleViewImage(image.id)}
                  >
                    <img
                      src={getUploadedImage(image.id) || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="truncate text-sm" title={image.name}>
                        {image.name}
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyImageUrl(image.id)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteImage(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Image View Dialog */}
      <Dialog open={viewImageDialog} onOpenChange={setViewImageDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedImage && images.find((img) => img.id === selectedImage)?.name}</DialogTitle>
          </DialogHeader>

          {selectedImage && (
            <div className="space-y-4">
              <div className="max-h-[60vh] overflow-hidden flex items-center justify-center bg-gray-100 rounded-md">
                <img
                  src={getUploadedImage(selectedImage) || "/placeholder.svg"}
                  alt={images.find((img) => img.id === selectedImage)?.name}
                  className="max-w-full max-h-[60vh] object-contain"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {new Date(images.find((img) => img.id === selectedImage)?.uploadedAt).toLocaleString()}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => copyImageUrl(selectedImage)}
                    className="flex items-center gap-2"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy URL"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDeleteImage(selectedImage)
                      setViewImageDialog(false)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewImageDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
