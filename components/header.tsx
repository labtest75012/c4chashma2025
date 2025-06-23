"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Menu, X, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    setIsLoggedIn(adminLoggedIn === "true")

    // Load cart items from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      setCartItems(cart.length)
    }
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Men", href: "/products?category=men" },
    { name: "Women", href: "/products?category=women" },
    { name: "Kids", href: "/products?category=kids" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Free shipping on orders above ₹1,500</span>
          </div>
          <div className="flex items-center space-x-4">
            {!isLoggedIn && (
              <a
                href={`tel:+919509919004`}
                className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
              >
                <Phone className="h-4 w-4 mr-1" />
                +91 9509919004
              </a>
            )}
            {isLoggedIn && (
              <Link href="/admin/dashboard" className="flex items-center text-gray-600 hover:text-red-500">
                <User className="h-4 w-4 mr-1" />
                Admin Panel
              </Link>
            )}
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="C4 Chashma Logo" width={60} height={60} className="object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-red-500 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search glasses..."
                  className="pl-10 pr-4 py-2 w-64 border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-red-500 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Search */}
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search glasses..."
                  className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
