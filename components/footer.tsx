"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import { getWhatsAppNumber } from "@/utils/whatsapp-service"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-500 text-white p-2 rounded-lg">
                <span className="font-bold text-xl">C4</span>
              </div>
              <span className="font-bold text-xl">Chashma</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for premium eyewear. We provide stylish and affordable glasses for the whole family.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=men" className="text-gray-300 hover:text-white transition-colors">
                  Men's Glasses
                </Link>
              </li>
              <li>
                <Link href="/products?category=women" className="text-gray-300 hover:text-white transition-colors">
                  Women's Glasses
                </Link>
              </li>
              <li>
                <Link href="/products?category=kids" className="text-gray-300 hover:text-white transition-colors">
                  Kids Glasses
                </Link>
              </li>
              <li>
                <Link href="/products?type=sunglasses" className="text-gray-300 hover:text-white transition-colors">
                  Sunglasses
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  37/222, Rajat Path, Sector 37, Mansarovar, Jaipur, Rajasthan 302020
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-500" />
                <a href="tel:+919509919004" className="text-gray-300 hover:text-white transition-colors">
                  +91 {getWhatsAppNumber()}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-500" />
                <a href="mailto:c4chashma@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  c4chashma@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <div>Mon - Sat: 10:30 AM - 9:30 PM</div>
                  <div>Sunday: 10:30 AM - 9:30 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2024 C4 Chashma. All rights reserved. | Designed with ❤️ for better vision</p>
        </div>
      </div>
    </footer>
  )
}
