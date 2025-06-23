"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { fileToDataURL, validateImageFile } from "@/utils/file-upload"

interface ImageUploadButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onImageSelected: (imageDataUrl: string) => void
  isUploading?: boolean
  buttonText?: string
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  accept?: string
  maxSizeMB?: number
}

export function ImageUploadButton({
  onImageSelected,
  isUploading = false,
  buttonText = "Change Image",
  variant = "secondary",
  size = "sm",
  accept = "image/*",
  maxSizeMB = 5,
  ...props
}: ImageUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    const validation = validateImageFile(file, maxSizeMB)
    if (!validation.valid) {
      toast({
        title: "Invalid file",
        description: validation.message,
        variant: "destructive",
      })
      return
    }

    try {
      // Convert file to data URL
      const dataUrl = await fileToDataURL(file)
      onImageSelected(dataUrl)
    } catch (error) {
      console.error("Error processing file:", error)
      toast({
        title: "Error",
        description: "Failed to process the selected image",
        variant: "destructive",
      })
    }

    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <>
      <Button variant={variant} size={size} onClick={handleButtonClick} disabled={isUploading} {...props}>
        {isUploading ? (
          <span>Uploading...</span>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            {buttonText}
          </>
        )}
      </Button>
      <input type="file" ref={fileInputRef} className="hidden" accept={accept} onChange={handleFileChange} />
    </>
  )
}
