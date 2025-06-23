"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export default function SettingsTab({
  settings,
  setSettings,
}: {
  settings: any
  setSettings: (settings: any) => void
}) {
  const [activeTab, setActiveTab] = useState("seo")
  const [settingsChanged, setSettingsChanged] = useState(false)

  const handleSettingsChange = (section: string, field: string, value: string) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value,
      },
    })
    setSettingsChanged(true)
  }

  const saveSettings = () => {
    localStorage.setItem("c4chashma_settings", JSON.stringify(settings))
    setSettingsChanged(false)
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <Button
          onClick={saveSettings}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full"
          disabled={!settingsChanged}
        >
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Search Engine Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteTitle">Site Title</Label>
                <Input
                  id="siteTitle"
                  value={settings.seo.siteTitle}
                  onChange={(e) => handleSettingsChange("seo", "siteTitle", e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.seo.siteDescription}
                  onChange={(e) => handleSettingsChange("seo", "siteDescription", e.target.value)}
                  className="rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="siteKeywords">Keywords (comma separated)</Label>
                <Textarea
                  id="siteKeywords"
                  value={settings.seo.siteKeywords}
                  onChange={(e) => handleSettingsChange("seo", "siteKeywords", e.target.value)}
                  className="rounded-lg"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.contact.phone}
                  onChange={(e) => handleSettingsChange("contact", "phone", e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={settings.contact.email}
                  onChange={(e) => handleSettingsChange("contact", "email", e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={settings.contact.address}
                  onChange={(e) => handleSettingsChange("contact", "address", e.target.value)}
                  className="rounded-lg"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="hours">Business Hours</Label>
                <Textarea
                  id="hours"
                  value={settings.contact.hours}
                  onChange={(e) => handleSettingsChange("contact", "hours", e.target.value)}
                  className="rounded-lg"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input
                  id="facebook"
                  value={settings.social.facebook}
                  onChange={(e) => handleSettingsChange("social", "facebook", e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  value={settings.social.instagram}
                  onChange={(e) => handleSettingsChange("social", "instagram", e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input
                  id="twitter"
                  value={settings.social.twitter}
                  onChange={(e) => handleSettingsChange("social", "twitter", e.target.value)}
                  className="rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold (₹)</Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  value={settings.shipping.freeShippingThreshold}
                  onChange={(e) => handleSettingsChange("shipping", "freeShippingThreshold", e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div>
                <Label htmlFor="standardShippingRate">Standard Shipping Rate (₹)</Label>
                <Input
                  id="standardShippingRate"
                  type="number"
                  value={settings.shipping.standardShippingRate}
                  onChange={(e) => handleSettingsChange("shipping", "standardShippingRate", e.target.value)}
                  className="rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
