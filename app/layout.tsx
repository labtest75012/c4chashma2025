import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import NoLoginBanner from "@/components/no-login-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "C4 Chashma - Premium Eyewear Store",
  description: "Discover the latest trends in eyewear at C4 Chashma. Shop prescription glasses, sunglasses, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NoLoginBanner />
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
