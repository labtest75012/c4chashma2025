"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Trash2, Copy, Search, X, FolderPlus } from "lucide-react"
import { ImageUploadButton } from "@/components/admin/image-upload-button"

interface MediaItem {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedAt: string
  folder: string
}

export default function MediaLibraryTab() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("all")
  const [isUploading, setIsUploading] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [showNewFolderInput, setShowNewFolderInput] = useState(false)

  // Load media items from localStorage on component mount
  useEffect(() => {
    const savedMedia = localStorage.getItem("mediaLibrary")
    if (savedMedia) {
      setMediaItems(JSON.parse(savedMedia))
    }
  }, [])

  // Save media items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mediaLibrary", JSON.stringify(mediaItems))
  }, [mediaItems])

  // Get unique folders
  const folders = ["all", ...new Set(mediaItems.map((item) => item.folder || "uncategorized"))]

  // Filter media items based on search query and selected folder
  const filteredMediaItems = mediaItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFolder = selectedFolder === "all" || item.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  // Handle image upload
  const handleImageUpload = async (imageDataUrl: string) => {
    setIsUploading(true)

    try {
      // Create a new media item
      const newItem: MediaItem = {
        id: `media_${Date.now()}`,
        name: `Image ${mediaItems.length + 1}`,
        url: imageDataUrl,
        type: "image",
        size: Math.floor(imageDataUrl.length * 0.75), // Rough estimate of size in bytes
        uploadedAt: new Date().toISOString(),
        folder: selectedFolder === "all" ? "uncategorized" : selectedFolder,
      }

      // Add to media items
      setMediaItems([newItem, ...mediaItems])

      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Delete media item
  const deleteMediaItem = (id: string) => {
    setMediaItems(mediaItems.filter((item) => item.id !== id))
    toast({
      title: "Image deleted",
      description: "The image has been deleted successfully",
    })
  }

  // Copy image URL to clipboard
  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL copied",
      description: "Image URL has been copied to clipboard",
    })
  }

  // Add new folder
  const addNewFolder = () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Invalid folder name",
        description: "Please enter a valid folder name",
        variant: "destructive",
      })
      return
    }

    // Check if folder already exists
    if (folders.includes(newFolderName.trim())) {
      toast({
        title: "Folder exists",
        description: "A folder with this name already exists",
        variant: "destructive",
      })
      return
    }

    // Add folder by creating a dummy item (will be filtered out in display)
    const dummyItem: MediaItem = {
      id: `folder_${Date.now()}`,
      name: "Folder Marker",
      url: "",
      type: "folder-marker",
      size: 0,
      uploadedAt: new Date().toISOString(),
      folder: newFolderName.trim(),
    }

    setMediaItems([...mediaItems, dummyItem])
    setSelectedFolder(newFolderName.trim())
    setNewFolderName("")
    setShowNewFolderInput(false)

    toast({
      title: "Folder created",
      description: `Folder "${newFolderName.trim()}" has been created`,
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
        <div className="flex gap-2">
          <ImageUploadButton
            onImageSelected={handleImageUpload}
            isUploading={isUploading}
            buttonText="Upload Media"
            variant="default"
            size="default"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start px-2"
                  onClick={() => setShowNewFolderInput(true)}
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </Button>
              </div>

              {showNewFolderInput && (
                <div className="flex items-center gap-2 mb-2">
                  <Input
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Folder name"
                    className="text-sm"
                  />
                  <Button size="icon" variant="ghost" onClick={addNewFolder}>
                    <FolderPlus className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setShowNewFolderInput(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="space-y-1">
                {folders.map((folder) => (
                  <Button
                    key={folder}
                    variant={selectedFolder === folder ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start px-2"
                    onClick={() => setSelectedFolder(folder)}
                  >
                    {folder === "all" ? "All Media" : folder}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Media Files</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search media..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>
                {filteredMediaItems.filter((item) => item.type !== "folder-marker").length} items in library
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredMediaItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No media files found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredMediaItems
                    .filter((item) => item.type !== "folder-marker")
                    .map((item) => (
                      <div key={item.id} className="group relative">
                        <div className="aspect-square bg-gray-100 rounded-md overflow-hidden border">
                          <img
                            src={item.url || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8"
                              onClick={() => copyImageUrl(item.url)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="destructive"
                              className="h-8 w-8"
                              onClick={() => deleteMediaItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs truncate mt-1">{item.name}</p>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
