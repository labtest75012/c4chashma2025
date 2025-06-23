"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function TestConnectionPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")

  const testConnection = async () => {
    try {
      setStatus("loading")
      const response = await fetch("/api/test-db-connection")
      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to connect to database")
      }
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  }

  useEffect(() => {
    // Test connection on page load
    testConnection()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Database Connection Test</CardTitle>
          <CardDescription>Testing connection to Supabase database</CardDescription>
        </CardHeader>
        <CardContent>
          {status === "loading" && (
            <div className="flex items-center justify-center p-6">
              <RefreshCw className="h-8 w-8 animate-spin text-red-500" />
              <span className="ml-2">Testing connection...</span>
            </div>
          )}

          {status === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Connection Successful</AlertTitle>
              <AlertDescription className="text-green-700">{message}</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert className="bg-red-50 border-red-200">
              <XCircle className="h-5 w-5 text-red-600" />
              <AlertTitle className="text-red-800">Connection Failed</AlertTitle>
              <AlertDescription className="text-red-700">{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={testConnection} disabled={status === "loading"} className="w-full">
            {status === "loading" ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              "Test Connection Again"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
