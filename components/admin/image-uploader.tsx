"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Upload, X, ImageIcon } from "lucide-react"
import { uploadImage } from "@/utils/image-upload"

interface ImageUploaderProps {
  currentImage?: string
  onImageUploaded: (imageUrl: string) => void
  aspectRatio?: "square" | "video" | "banner" | "portrait"
  maxSizeMB?: number
}

export default function ImageUploader({
  currentImage,
  onImageUploaded,
  aspectRatio = "square",
  maxSizeMB = 5,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "video":
        return "aspect-video"
      case "banner":
        return "aspect-[3/1]"
      case "portrait":
        return "aspect-[3/4]"
      default:
        return "aspect-square"
    }
  }

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Clear previous errors
    setUploadError(null)

    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setUploadError(`File too large. Maximum size is ${maxSizeMB}MB.`)
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Invalid file type. Please upload an image file.")
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload image
    try {
      setIsUploading(true)
      const imageId = await uploadImage(file)
      onImageUploaded(imageId)
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
      })
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError(error instanceof Error ? error.message : "Error uploading image")
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Clear selected image
  const handleClearImage = () => {
    setPreviewImage(null)
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <div className={`${getAspectRatioClass()} relative bg-gray-100 rounded-md overflow-hidden border`}>
        {previewImage || currentImage ? (
          <>
            <img src={previewImage || currentImage} alt="Preview" className="w-full h-full object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
              onClick={handleClearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">No image selected</p>
          </div>
        )}
      </div>

      {uploadError && <div className="text-red-500 text-sm">{uploadError}</div>}

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handleUploadClick} disabled={isUploading} className="w-full">
          {isUploading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </span>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </>
          )}
        </Button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>
      <p className="text-xs text-gray-500">Max file size: {maxSizeMB}MB. Supported formats: JPG, PNG, GIF, WebP</p>
    </div>
  )
}
