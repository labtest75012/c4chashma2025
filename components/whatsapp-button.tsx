"use client"

import { MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { openWhatsApp, createGeneralInquiryMessage } from "@/utils/whatsapp-service"

interface WhatsAppButtonProps {
  message?: string
  className?: string
  variant?: "fixed" | "inline"
  showText?: boolean
}

export default function WhatsAppButton({
  message,
  className = "",
  variant = "fixed",
  showText = true,
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    setIsLoggedIn(adminLoggedIn === "true")

    if (variant !== "fixed") return

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show button after scrolling down 300px
      if (currentScrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Determine scroll direction
      setIsScrollingUp(currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, variant])

  const handleWhatsAppClick = () => {
    const whatsappMessage = message || createGeneralInquiryMessage()
    openWhatsApp(whatsappMessage)
  }

  // Hide WhatsApp button if admin is logged in
  if (isLoggedIn) {
    return null
  }

  if (variant === "inline") {
    return (
      <button
        onClick={handleWhatsAppClick}
        className={`flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ${className}`}
        aria-label="Contact us on WhatsApp"
      >
        <div className="flex items-center p-3 sm:p-4">
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          {showText && <span className="ml-2 text-sm sm:text-base font-medium">Chat with us</span>}
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed z-50 flex items-center justify-center transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${
        isScrollingUp ? "bottom-6" : "bottom-20 sm:bottom-6"
      } right-4 sm:right-6 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ${className}`}
      aria-label="Contact us on WhatsApp"
    >
      <div className="flex items-center p-3 sm:p-4">
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="ml-2 text-sm sm:text-base font-medium hidden sm:inline">Chat with us</span>
      </div>
    </button>
  )
}
