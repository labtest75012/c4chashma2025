"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Clock, Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { openWhatsApp, createEyeTestBookingMessage, getWhatsAppNumber } from "@/utils/whatsapp-service"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "",
    message: "",
  })

  const searchParams = useSearchParams()

  // Set the service if it's passed in the URL
  useEffect(() => {
    const service = searchParams.get("service")
    if (service === "eye-test") {
      setFormData((prev) => ({
        ...prev,
        subject: "Eye Test Appointment Request",
        service: "Eye Test",
      }))
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData)

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      service: "",
      message: "",
    })
  }

  const handleWhatsAppContact = (service?: string) => {
    let message = "Hi, I'd like to get in touch with C4 Chashma"

    if (service) {
      message += ` regarding ${service} service.`
    }

    openWhatsApp(message)
  }

  const handleWhatsAppWithForm = () => {
    const { name, email, phone, subject, service, message } = formData

    let whatsappMessage = `Hi, my name is ${name}.\n\n`

    if (service) {
      whatsappMessage += `I'm interested in your ${service} service.\n\n`
    }

    if (subject) {
      whatsappMessage += `Subject: ${subject}\n\n`
    }

    whatsappMessage += `${message}\n\n`

    if (email) {
      whatsappMessage += `My email: ${email}\n`
    }

    if (phone) {
      whatsappMessage += `My phone: ${phone}`
    }

    openWhatsApp(whatsappMessage)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-green-500 p-3 rounded-full mb-4">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2">WhatsApp Us</h3>
            <p className="text-gray-700 mb-4">Get quick responses via WhatsApp</p>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white w-full"
              onClick={() => handleWhatsAppContact()}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-blue-500 p-3 rounded-full mb-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2">Book Eye Test</h3>
            <p className="text-gray-700 mb-4">Schedule your eye examination</p>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white w-full"
              onClick={() => openWhatsApp(createEyeTestBookingMessage())}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-purple-500 p-3 rounded-full mb-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2">Call Us</h3>
            <p className="text-gray-700 mb-4">Speak directly with our team</p>
            <Button
              className="bg-purple-500 hover:bg-purple-600 text-white w-full"
              onClick={() => (window.location.href = "tel:+919509919004")}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call +91 {getWhatsAppNumber()}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Get In Touch</h2>
            <p className="text-gray-700 mb-6">
              Have questions about our products or services? We're here to help! Reach out to us using any of the
              methods below.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h3 className="font-medium">Our Store</h3>
                  <p className="text-gray-700">37/222, Rajat Path, Sector 37, Mansarovar, Jaipur, Rajasthan 302020</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-700">
                    <a href="tel:+919509919004" className="hover:underline">
                      +91 {getWhatsAppNumber()}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-700">c4chashma@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-gray-700">Monday - Saturday: 10:30 AM - 9:30 PM</p>
                  <p className="text-gray-700">Sunday: 10:30 AM - 9:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.1909761!3d28.5356211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzA4LjIiTiA3N8KwMTEnMjcuNSJF!5e0!3m2!1sen!2sin!4v1620287563267!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Your Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9509919004"
              />
            </div>

            <div>
              <Label htmlFor="subject">Subject*</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
              />
            </div>

            <div>
              <Label htmlFor="service">Service (Optional)</Label>
              <Select value={formData.service} onValueChange={handleServiceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eye Test">Eye Test</SelectItem>
                  <SelectItem value="Frame Fitting">Frame Fitting</SelectItem>
                  <SelectItem value="Contact Lens Fitting">Contact Lens Fitting</SelectItem>
                  <SelectItem value="Glasses Repair">Glasses Repair</SelectItem>
                  <SelectItem value="Product Inquiry">Product Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message*</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please provide details about your inquiry..."
                rows={5}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">
                Send Message
              </Button>
              <Button
                type="button"
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={handleWhatsAppWithForm}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Send via WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 text-left">
            <h3 className="font-semibold text-lg mb-2">Do you offer eye tests?</h3>
            <p className="text-gray-700">
              Yes, we offer comprehensive eye tests conducted by qualified optometrists. You can book an appointment by
              calling us or via WhatsApp at {getWhatsAppNumber()}.
            </p>
          </div>
          <div className="border rounded-lg p-6 text-left">
            <h3 className="font-semibold text-lg mb-2">How long does it take to get my glasses?</h3>
            <p className="text-gray-700">
              Once you place an order, it typically takes 3-5 business days for your glasses to be ready. For complex
              prescriptions, it might take a bit longer.
            </p>
          </div>
          <div className="border rounded-lg p-6 text-left">
            <h3 className="font-semibold text-lg mb-2">Do you accept insurance?</h3>
            <p className="text-gray-700">
              Yes, we accept most major insurance plans. Please contact us with your insurance details, and we'll be
              happy to verify your coverage.
            </p>
          </div>
          <div className="border rounded-lg p-6 text-left">
            <h3 className="font-semibold text-lg mb-2">What is your return policy?</h3>
            <p className="text-gray-700">
              We offer a 7-day return policy for all our products. If you're not satisfied with your purchase, you can
              return it for a full refund or exchange.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
