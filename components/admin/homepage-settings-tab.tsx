"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { X, Plus, Save, Upload } from "lucide-react"

export default function HomepageSettingsTab() {
  const [activeTab, setActiveTab] = useState("hero")
  const [settingsChanged, setSettingsChanged] = useState(false)
  const [settings, setSettings] = useState({
    hero: {
      slides: [
        {
          id: "1",
          title: "See the World in Style",
          subtitle: "Discover our premium collection of eyewear that combines fashion, comfort, and quality.",
          buttonText: "Shop Now",
          buttonLink: "/products",
          image: "/placeholder.svg?height=800&width=1600",
          isActive: true,
        },
        {
          id: "2",
          title: "New Summer Collection",
          subtitle: "Protect your eyes with our stylish sunglasses collection.",
          buttonText: "Explore",
          buttonLink: "/products?category=sunglasses",
          image: "/placeholder.svg?height=800&width=1600",
          isActive: true,
        },
      ],
      autoplay: true,
      interval: 5000,
    },
    featuredCategories: {
      title: "Shop By Category",
      subtitle: "Find the perfect eyewear for your style and needs",
      categories: [
        {
          id: "1",
          name: "Men's Eyewear",
          image: "/placeholder.svg?height=300&width=300",
          link: "/products?category=men",
          isActive: true,
          order: 1,
        },
        {
          id: "2",
          name: "Women's Eyewear",
          image: "/placeholder.svg?height=300&width=300",
          link: "/products?category=women",
          isActive: true,
          order: 2,
        },
        {
          id: "3",
          name: "Kids' Eyewear",
          image: "/placeholder.svg?height=300&width=300",
          link: "/products?category=kids",
          isActive: true,
          order: 3,
        },
      ],
      isActive: true,
    },
    featuredProducts: {
      title: "Featured Products",
      subtitle: "Our most popular frames, selected just for you",
      productIds: ["1", "2", "3", "4"],
      isActive: true,
    },
    promotionBanner: {
      title: "Buy One, Get One Free",
      subtitle:
        "Purchase any frame from our premium collection and get a second pair absolutely free. Offer valid for a limited time only.",
      buttonText: "Shop the Offer",
      buttonLink: "/products?promotion=bogo",
      image: "/placeholder.svg?height=400&width=600",
      backgroundColor: "#1f2937",
      isActive: true,
    },
    testimonials: {
      title: "What Our Customers Say",
      subtitle: "Read reviews from our satisfied customers",
      isActive: true,
    },
    virtualTryOn: {
      title: "Try Before You Buy",
      subtitle:
        "Experience our virtual try-on technology. See how different frames look on your face without leaving home.",
      buttonText: "Try Now",
      buttonLink: "/virtual-try-on",
      image: "/placeholder.svg?height=300&width=400",
      isActive: true,
    },
  })

  // Save settings
  const saveSettings = () => {
    localStorage.setItem("homepageSettings", JSON.stringify(settings))
    setSettingsChanged(false)
    toast({
      title: "Settings saved",
      description: "Homepage settings have been saved successfully",
    })
  }

  // Handle input change
  const handleInputChange = (
    section: string,
    field: string,
    value: string | boolean | number,
    id: string | null = null,
  ) => {
    const updatedSettings = { ...settings }

    if (section === "hero" && !id) {
      updatedSettings.hero = {
        ...updatedSettings.hero,
        [field]: value,
      }
    } else if (section === "hero" && id) {
      updatedSettings.hero.slides = updatedSettings.hero.slides.map((slide) =>
        slide.id === id ? { ...slide, [field]: value } : slide,
      )
    } else if (section === "featuredCategories" && !id) {
      updatedSettings.featuredCategories = {
        ...updatedSettings.featuredCategories,
        [field]: value,
      }
    } else if (section === "featuredCategories" && id) {
      updatedSettings.featuredCategories.categories = updatedSettings.featuredCategories.categories.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat,
      )
    } else if (section === "featuredProducts") {
      updatedSettings.featuredProducts = {
        ...updatedSettings.featuredProducts,
        [field]: field === "productIds" ? (value as string).split(",").map((id) => id.trim()) : value,
      }
    } else if (section === "promotionBanner") {
      updatedSettings.promotionBanner = {
        ...updatedSettings.promotionBanner,
        [field]: value,
      }
    } else if (section === "testimonials") {
      updatedSettings.testimonials = {
        ...updatedSettings.testimonials,
        [field]: value,
      }
    } else if (section === "virtualTryOn") {
      updatedSettings.virtualTryOn = {
        ...updatedSettings.virtualTryOn,
        [field]: value,
      }
    }

    setSettings(updatedSettings)
    setSettingsChanged(true)
  }

  // Add hero slide
  const addHeroSlide = () => {
    const newSlide = {
      id: Date.now().toString(),
      title: "New Slide",
      subtitle: "Add your subtitle here",
      buttonText: "Click Here",
      buttonLink: "/products",
      image: "/placeholder.svg?height=800&width=1600",
      isActive: true,
    }

    setSettings({
      ...settings,
      hero: {
        ...settings.hero,
        slides: [...settings.hero.slides, newSlide],
      },
    })

    setSettingsChanged(true)
  }

  // Remove hero slide
  const removeHeroSlide = (id: string) => {
    setSettings({
      ...settings,
      hero: {
        ...settings.hero,
        slides: settings.hero.slides.filter((slide) => slide.id !== id),
      },
    })

    setSettingsChanged(true)
  }

  // Add featured category
  const addFeaturedCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      name: "New Category",
      image: "/placeholder.svg?height=300&width=300",
      link: "/products",
      isActive: true,
      order: settings.featuredCategories.categories.length + 1,
    }

    setSettings({
      ...settings,
      featuredCategories: {
        ...settings.featuredCategories,
        categories: [...settings.featuredCategories.categories, newCategory],
      },
    })

    setSettingsChanged(true)
  }

  // Remove featured category
  const removeFeaturedCategory = (id: string) => {
    setSettings({
      ...settings,
      featuredCategories: {
        ...settings.featuredCategories,
        categories: settings.featuredCategories.categories.filter((cat) => cat.id !== id),
      },
    })

    setSettingsChanged(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Homepage Settings</h2>
        <Button onClick={saveSettings} className="bg-red-500 hover:bg-red-600 text-white" disabled={!settingsChanged}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <TabsTrigger value="hero">Hero Slider</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="products">Featured Products</TabsTrigger>
          <TabsTrigger value="promotion">Promotion Banner</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="virtualTryOn">Virtual Try-On</TabsTrigger>
        </TabsList>

        {/* Hero Slider Settings */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Slider Settings</CardTitle>
              <CardDescription>Manage the hero slider that appears at the top of your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="hero-autoplay"
                  checked={settings.hero.autoplay}
                  onCheckedChange={(checked) => handleInputChange("hero", "autoplay", checked)}
                />
                <Label htmlFor="hero-autoplay">Enable Autoplay</Label>
              </div>

              {settings.hero.autoplay && (
                <div className="space-y-2">
                  <Label htmlFor="hero-interval">Autoplay Interval (ms)</Label>
                  <Input
                    id="hero-interval"
                    type="number"
                    value={settings.hero.interval}
                    onChange={(e) => handleInputChange("hero", "interval", Number.parseInt(e.target.value))}
                    className="max-w-xs"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Slides</h3>
                  <Button onClick={addHeroSlide} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slide
                  </Button>
                </div>

                {settings.hero.slides.map((slide, index) => (
                  <Card key={slide.id} className="p-4 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeHeroSlide(slide.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`slide-${slide.id}-title`}>Title</Label>
                          <Input
                            id={`slide-${slide.id}-title`}
                            value={slide.title}
                            onChange={(e) => handleInputChange("hero", "title", e.target.value, slide.id)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`slide-${slide.id}-subtitle`}>Subtitle</Label>
                          <Textarea
                            id={`slide-${slide.id}-subtitle`}
                            value={slide.subtitle}
                            onChange={(e) => handleInputChange("hero", "subtitle", e.target.value, slide.id)}
                            rows={2}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`slide-${slide.id}-buttonText`}>Button Text</Label>
                            <Input
                              id={`slide-${slide.id}-buttonText`}
                              value={slide.buttonText}
                              onChange={(e) => handleInputChange("hero", "buttonText", e.target.value, slide.id)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`slide-${slide.id}-buttonLink`}>Button Link</Label>
                            <Input
                              id={`slide-${slide.id}-buttonLink`}
                              value={slide.buttonLink}
                              onChange={(e) => handleInputChange("hero", "buttonLink", e.target.value, slide.id)}
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`slide-${slide.id}-active`}
                            checked={slide.isActive}
                            onCheckedChange={(checked) => handleInputChange("hero", "isActive", checked, slide.id)}
                          />
                          <Label htmlFor={`slide-${slide.id}-active`}>Active</Label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Slide Image</Label>
                        <div className="border rounded-md p-2">
                          <div className="aspect-[16/9] bg-gray-100 rounded-md overflow-hidden relative">
                            <img
                              src={slide.image || "/placeholder.svg"}
                              alt={`Slide ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              className="absolute bottom-2 right-2 bg-white text-gray-800 hover:bg-gray-100"
                              size="sm"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Featured Categories Settings */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Featured Categories Settings</CardTitle>
              <CardDescription>Manage the featured categories section on your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="categories-active"
                    checked={settings.featuredCategories.isActive}
                    onCheckedChange={(checked) => handleInputChange("featuredCategories", "isActive", checked)}
                  />
                  <Label htmlFor="categories-active">Show Featured Categories Section</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categories-title">Section Title</Label>
                  <Input
                    id="categories-title"
                    value={settings.featuredCategories.title}
                    onChange={(e) => handleInputChange("featuredCategories", "title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categories-subtitle">Section Subtitle</Label>
                  <Input
                    id="categories-subtitle"
                    value={settings.featuredCategories.subtitle}
                    onChange={(e) => handleInputChange("featuredCategories", "subtitle", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Categories</h3>
                  <Button onClick={addFeaturedCategory} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </div>

                {settings.featuredCategories.categories.map((category) => (
                  <Card key={category.id} className="p-4 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeFeaturedCategory(category.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`category-${category.id}-name`}>Category Name</Label>
                          <Input
                            id={`category-${category.id}-name`}
                            value={category.name}
                            onChange={(e) =>
                              handleInputChange("featuredCategories", "name", e.target.value, category.id)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`category-${category.id}-link`}>Link</Label>
                          <Input
                            id={`category-${category.id}-link`}
                            value={category.link}
                            onChange={(e) =>
                              handleInputChange("featuredCategories", "link", e.target.value, category.id)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`category-${category.id}-order`}>Display Order</Label>
                          <Input
                            id={`category-${category.id}-order`}
                            type="number"
                            value={category.order}
                            onChange={(e) =>
                              handleInputChange(
                                "featuredCategories",
                                "order",
                                Number.parseInt(e.target.value),
                                category.id,
                              )
                            }
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`category-${category.id}-active`}
                            checked={category.isActive}
                            onCheckedChange={(checked) =>
                              handleInputChange("featuredCategories", "isActive", checked, category.id)
                            }
                          />
                          <Label htmlFor={`category-${category.id}-active`}>Active</Label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Category Image</Label>
                        <div className="border rounded-md p-2">
                          <div className="aspect-square bg-gray-100 rounded-md overflow-hidden relative">
                            <img
                              src={category.image || "/placeholder.svg"}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              className="absolute bottom-2 right-2 bg-white text-gray-800 hover:bg-gray-100"
                              size="sm"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Featured Products Settings */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Featured Products Settings</CardTitle>
              <CardDescription>Manage the featured products section on your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="products-active"
                  checked={settings.featuredProducts.isActive}
                  onCheckedChange={(checked) => handleInputChange("featuredProducts", "isActive", checked)}
                />
                <Label htmlFor="products-active">Show Featured Products Section</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="products-title">Section Title</Label>
                <Input
                  id="products-title"
                  value={settings.featuredProducts.title}
                  onChange={(e) => handleInputChange("featuredProducts", "title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="products-subtitle">Section Subtitle</Label>
                <Input
                  id="products-subtitle"
                  value={settings.featuredProducts.subtitle}
                  onChange={(e) => handleInputChange("featuredProducts", "subtitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="products-ids">Product IDs (comma-separated)</Label>
                <Textarea
                  id="products-ids"
                  value={settings.featuredProducts.productIds.join(", ")}
                  onChange={(e) => handleInputChange("featuredProducts", "productIds", e.target.value)}
                  placeholder="1, 2, 3, 4"
                  rows={2}
                />
                <p className="text-sm text-gray-500">
                  Enter the IDs of products you want to feature, separated by commas.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promotion Banner Settings */}
        <TabsContent value="promotion">
          <Card>
            <CardHeader>
              <CardTitle>Promotion Banner Settings</CardTitle>
              <CardDescription>Manage the promotion banner on your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="promotion-active"
                  checked={settings.promotionBanner.isActive}
                  onCheckedChange={(checked) => handleInputChange("promotionBanner", "isActive", checked)}
                />
                <Label htmlFor="promotion-active">Show Promotion Banner</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="promotion-title">Title</Label>
                    <Input
                      id="promotion-title"
                      value={settings.promotionBanner.title}
                      onChange={(e) => handleInputChange("promotionBanner", "title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promotion-subtitle">Subtitle</Label>
                    <Textarea
                      id="promotion-subtitle"
                      value={settings.promotionBanner.subtitle}
                      onChange={(e) => handleInputChange("promotionBanner", "subtitle", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="promotion-buttonText">Button Text</Label>
                      <Input
                        id="promotion-buttonText"
                        value={settings.promotionBanner.buttonText}
                        onChange={(e) => handleInputChange("promotionBanner", "buttonText", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="promotion-buttonLink">Button Link</Label>
                      <Input
                        id="promotion-buttonLink"
                        value={settings.promotionBanner.buttonLink}
                        onChange={(e) => handleInputChange("promotionBanner", "buttonLink", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promotion-backgroundColor">Background Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="promotion-backgroundColor"
                        value={settings.promotionBanner.backgroundColor}
                        onChange={(e) => handleInputChange("promotionBanner", "backgroundColor", e.target.value)}
                      />
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: settings.promotionBanner.backgroundColor }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Banner Image</Label>
                  <div className="border rounded-md p-2">
                    <div className="aspect-[3/2] bg-gray-100 rounded-md overflow-hidden relative">
                      <img
                        src={settings.promotionBanner.image || "/placeholder.svg"}
                        alt="Promotion Banner"
                        className="w-full h-full object-cover"
                      />
                      <Button className="absolute bottom-2 right-2 bg-white text-gray-800 hover:bg-gray-100" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Settings */}
        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>Testimonials Settings</CardTitle>
              <CardDescription>Manage the testimonials section on your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="testimonials-active"
                  checked={settings.testimonials.isActive}
                  onCheckedChange={(checked) => handleInputChange("testimonials", "isActive", checked)}
                />
                <Label htmlFor="testimonials-active">Show Testimonials Section</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonials-title">Section Title</Label>
                <Input
                  id="testimonials-title"
                  value={settings.testimonials.title}
                  onChange={(e) => handleInputChange("testimonials", "title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonials-subtitle">Section Subtitle</Label>
                <Input
                  id="testimonials-subtitle"
                  value={settings.testimonials.subtitle}
                  onChange={(e) => handleInputChange("testimonials", "subtitle", e.target.value)}
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">
                  Testimonials are managed in the Reviews section. Active reviews with high ratings will be displayed in
                  this section.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Virtual Try-On Settings */}
        <TabsContent value="virtualTryOn">
          <Card>
            <CardHeader>
              <CardTitle>Virtual Try-On Settings</CardTitle>
              <CardDescription>Manage the virtual try-on banner on your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="virtualTryOn-active"
                  checked={settings.virtualTryOn.isActive}
                  onCheckedChange={(checked) => handleInputChange("virtualTryOn", "isActive", checked)}
                />
                <Label htmlFor="virtualTryOn-active">Show Virtual Try-On Banner</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="virtualTryOn-title">Title</Label>
                    <Input
                      id="virtualTryOn-title"
                      value={settings.virtualTryOn.title}
                      onChange={(e) => handleInputChange("virtualTryOn", "title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="virtualTryOn-subtitle">Subtitle</Label>
                    <Textarea
                      id="virtualTryOn-subtitle"
                      value={settings.virtualTryOn.subtitle}
                      onChange={(e) => handleInputChange("virtualTryOn", "subtitle", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="virtualTryOn-buttonText">Button Text</Label>
                      <Input
                        id="virtualTryOn-buttonText"
                        value={settings.virtualTryOn.buttonText}
                        onChange={(e) => handleInputChange("virtualTryOn", "buttonText", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="virtualTryOn-buttonLink">Button Link</Label>
                      <Input
                        id="virtualTryOn-buttonLink"
                        value={settings.virtualTryOn.buttonLink}
                        onChange={(e) => handleInputChange("virtualTryOn", "buttonLink", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Banner Image</Label>
                  <div className="border rounded-md p-2">
                    <div className="aspect-[4/3] bg-gray-100 rounded-md overflow-hidden relative">
                      <img
                        src={settings.virtualTryOn.image || "/placeholder.svg"}
                        alt="Virtual Try-On Banner"
                        className="w-full h-full object-cover"
                      />
                      <Button className="absolute bottom-2 right-2 bg-white text-gray-800 hover:bg-gray-100" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
