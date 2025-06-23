"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AdminDashboard } from "@/components/admin/dashboard"
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Check if already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("c4chashma_admin_logged_in")
    const loginTime = localStorage.getItem("c4chashma_admin_login_time")

    if (loggedIn === "true" && loginTime) {
      const now = new Date().getTime()
      const loginTimestamp = new Date(loginTime).getTime()
      const hoursDiff = (now - loginTimestamp) / (1000 * 60 * 60)

      if (hoursDiff < 24) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem("c4chashma_admin_logged_in")
        localStorage.removeItem("c4chashma_admin_login_time")
      }
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Static credentials - hardcoded for static deployment
    const adminUsername = "admin"
    const adminPassword = "manshu@123"

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("c4chashma_admin_logged_in", "true")
      localStorage.setItem("c4chashma_admin_login_time", new Date().toISOString())
      setIsAuthenticated(true)
      setUsername("")
      setPassword("")
    } else {
      setError("Invalid username or password")
    }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("c4chashma_admin_logged_in")
    localStorage.removeItem("c4chashma_admin_login_time")
    setIsAuthenticated(false)
    setUsername("")
    setPassword("")
  }

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Login
          </CardTitle>
          <CardDescription className="text-gray-600">Secure access to C4 Chashma admin dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  Username: <code className="bg-gray-200 px-2 py-1 rounded text-xs">admin</code>
                </p>
                <p className="text-sm text-gray-600">
                  Password: <code className="bg-gray-200 px-2 py-1 rounded text-xs">manshu@123</code>
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">🔒 Secure authentication • ⚡ Powered by Vercel</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
