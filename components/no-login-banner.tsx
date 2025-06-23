"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NoLoginBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [hasSeenBanner, setHasSeenBanner] = useState(false)

  useEffect(() => {
    // Check if user has already seen the banner
    const bannerSeen = localStorage.getItem("noLoginBannerSeen")
    if (bannerSeen) {
      setHasSeenBanner(true)
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    // Remember that user has seen the banner
    localStorage.setItem("noLoginBannerSeen", "true")
    setHasSeenBanner(true)
  }

  if (!isVisible) return null

  return (
    <div className="bg-blue-50 border-b border-blue-100 py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm text-blue-800">
          <span className="font-medium">No login required!</span> Browse products and place orders directly via WhatsApp
          for a seamless shopping experience.
        </p>
        <Button variant="ghost" size="sm" className="text-blue-800" onClick={handleDismiss}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
