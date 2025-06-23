/**
 * Utility functions for image uploads
 */

import { getStorageItem, setStorageItem } from "./storage-service"

// Interface for uploaded image metadata
interface UploadedImage {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedAt: string
}

// Get all uploaded images
export function listUploadedImages(): UploadedImage[] {
  return getStorageItem<UploadedImage[]>("uploaded_images", [])
}

// Get a specific uploaded image by ID
export function getUploadedImage(id: string): string | null {
  const images = listUploadedImages()
  const image = images.find((img) => img.id === id)
  return image ? image.url : null
}

// Upload an image
export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("File must be an image")
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB")
      }

      // Create a FileReader to read the file
      const reader = new FileReader()

      reader.onload = (event) => {
        if (!event.target) {
          reject(new Error("Error reading file"))
          return
        }

        const url = event.target.result as string

        // Generate a unique ID
        const id = `img_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

        // Create image metadata
        const imageData: UploadedImage = {
          id,
          name: file.name,
          url,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        }

        // Add to uploaded images
        const images = listUploadedImages()
        setStorageItem("uploaded_images", [...images, imageData])

        // Resolve with the image ID
        resolve(id)
      }

      reader.onerror = () => {
        reject(new Error("Error reading file"))
      }

      // Read the file as a data URL
      reader.readAsDataURL(file)
    } catch (error) {
      reject(error)
    }
  })
}

// Delete an uploaded image
export function deleteUploadedImage(id: string): boolean {
  const images = listUploadedImages()
  const updatedImages = images.filter((img) => img.id !== id)

  if (updatedImages.length === images.length) {
    return false // No image was deleted
  }

  setStorageItem("uploaded_images", updatedImages)
  return true
}
