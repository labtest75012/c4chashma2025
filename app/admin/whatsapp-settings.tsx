"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function WhatsAppSettings() {
  const [whatsappNumber, setWhatsappNumber] = useState("7339799364")
  const [productTemplate, setProductTemplate] = useState("Hi, I'm interested in: [PRODUCT_NAME] - ₹[PRODUCT_PRICE]")
  const [eyeTestTemplate, setEyeTestTemplate] = useState("Hi, I'd like to book an eye test.")
  const [generalTemplate, setGeneralTemplate] = useState(
    "Hi, I'm interested in your eyewear products. Can you help me?",
  )

  useEffect(() => {
    // Load saved settings from localStorage
    const savedNumber = localStorage.getItem("whatsappNumber")
    const savedProductTemplate = localStorage.getItem("whatsappProductTemplate")
    const savedEyeTestTemplate = localStorage.getItem("whatsappEyeTestTemplate")
    const savedGeneralTemplate = localStorage.getItem("whatsappGeneralTemplate")

    if (savedNumber) setWhatsappNumber(savedNumber)
    if (savedProductTemplate) setProductTemplate(savedProductTemplate)
    if (savedEyeTestTemplate) setEyeTestTemplate(savedEyeTestTemplate)
    if (savedGeneralTemplate) setGeneralTemplate(savedGeneralTemplate)
  }, [])

  const saveSettings = () => {
    // Save all settings to localStorage
    localStorage.setItem("whatsappNumber", whatsappNumber)
    localStorage.setItem("whatsappProductTemplate", productTemplate)
    localStorage.setItem("whatsappEyeTestTemplate", eyeTestTemplate)
    localStorage.setItem("whatsappGeneralTemplate", generalTemplate)

    toast({
      title: "Settings saved",
      description: "WhatsApp settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Business Settings</CardTitle>
          <CardDescription>
            Configure your WhatsApp business number and message templates for customer interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-number">WhatsApp Business Number</Label>
              <Input
                id="whatsapp-number"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="Enter your WhatsApp business number"
              />
              <p className="text-sm text-muted-foreground">
                Enter your WhatsApp number without any spaces or special characters (e.g., 7339799364)
              </p>
            </div>

            <Tabs defaultValue="product" className="w-full">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="product">Product Inquiry</TabsTrigger>
                <TabsTrigger value="eyetest">Eye Test Booking</TabsTrigger>
                <TabsTrigger value="general">General Inquiry</TabsTrigger>
              </TabsList>

              <TabsContent value="product" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="product-template">Product Inquiry Template</Label>
                  <Textarea
                    id="product-template"
                    value={productTemplate}
                    onChange={(e) => setProductTemplate(e.target.value)}
                    placeholder="Enter message template for product inquiries"
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">
                    Use [PRODUCT_NAME] and [PRODUCT_PRICE] as placeholders that will be replaced with actual values.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="eyetest" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="eyetest-template">Eye Test Booking Template</Label>
                  <Textarea
                    id="eyetest-template"
                    value={eyeTestTemplate}
                    onChange={(e) => setEyeTestTemplate(e.target.value)}
                    placeholder="Enter message template for eye test bookings"
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="general" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="general-template">General Inquiry Template</Label>
                  <Textarea
                    id="general-template"
                    value={generalTemplate}
                    onChange={(e) => setGeneralTemplate(e.target.value)}
                    placeholder="Enter message template for general inquiries"
                    rows={4}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={saveSettings} className="w-full">
              Save WhatsApp Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Integration Guide</CardTitle>
          <CardDescription>Learn how to maximize your WhatsApp Business integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">Setting Up WhatsApp Business</h3>
              <ol className="list-decimal list-inside space-y-2 mt-2 text-gray-700">
                <li>Download the WhatsApp Business app from Google Play Store or Apple App Store</li>
                <li>Register with your business phone number ({whatsappNumber})</li>
                <li>Complete your business profile with name, address, description, and business hours</li>
                <li>Set up quick replies and away messages for efficient customer communication</li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium text-lg">Best Practices</h3>
              <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
                <li>Respond to customer inquiries promptly (within 24 hours)</li>
                <li>Use a professional tone in all communications</li>
                <li>Send order confirmations and updates through WhatsApp</li>
                <li>Create a catalog of your products in WhatsApp Business</li>
                <li>Use labels to organize your customer conversations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
