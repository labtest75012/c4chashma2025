"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import WhatsAppButton from "@/components/whatsapp-button"
import { useToast } from "@/components/ui/use-toast"
import { openWhatsApp, createCartOrderMessage } from "@/utils/whatsapp-service"
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  calculateCartTotals,
  type CartItem,
} from "@/utils/cart-service"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, total: 0 })
  const { toast } = useToast()

  // Load cart items on component mount
  useEffect(() => {
    const items = getCartItems()
    setCartItems(items)

    const { subtotal, shipping, total } = calculateCartTotals()
    setTotals({ subtotal, shipping, total })
  }, [])

  const updateQuantity = (id: number, color: string, newQuantity: number) => {
    if (newQuantity < 1) return

    updateCartItemQuantity(id, color, newQuantity)

    // Update local state
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.color === color ? { ...item, quantity: newQuantity } : item,
    )
    setCartItems(updatedItems)

    // Recalculate totals
    const { subtotal, shipping, total } = calculateCartTotals()
    setTotals({ subtotal, shipping, total })

    toast({
      title: "Cart updated",
      description: "Product quantity has been updated.",
    })
  }

  const removeItem = (id: number, color: string) => {
    removeCartItem(id, color)

    // Update local state
    const updatedItems = cartItems.filter((item) => !(item.id === id && item.color === color))
    setCartItems(updatedItems)

    // Recalculate totals
    const { subtotal, shipping, total } = calculateCartTotals()
    setTotals({ subtotal, shipping, total })

    toast({
      title: "Item removed",
      description: "The product has been removed from your cart.",
    })
  }

  const handleWhatsAppOrder = () => {
    const message = createCartOrderMessage(cartItems, totals.subtotal, totals.shipping, totals.total)
    openWhatsApp(message)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button className="bg-red-500 hover:bg-red-600 text-white">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Mobile Cart View */}
            <div className="md:hidden space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Color: {item.color}</p>
                      <p className="font-bold mt-1">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, item.color, Number.parseInt(e.target.value) || 1)}
                        className="h-8 w-12 text-center border-0"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="font-medium">₹{item.price * item.quantity}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeItem(item.id, item.color)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Cart View */}
            <div className="hidden md:block border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 font-medium grid grid-cols-12 gap-4">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="p-4 border-t grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Color: {item.color}</p>
                      <button
                        onClick={() => removeItem(item.id, item.color)}
                        className="text-red-500 text-sm flex items-center mt-1 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">₹{item.price}</div>
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, item.color, Number.parseInt(e.target.value) || 1)}
                        className="h-8 w-12 text-center border-0"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-medium">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{totals.shipping === 0 ? "Free" : `₹${totals.shipping}`}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{totals.total}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-black hover:bg-gray-800 text-white">Proceed to Checkout</Button>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Free shipping on orders above ₹999. Easy returns within 7 days.
              </p>
            </div>
          </div>
        </div>
      )}

      <WhatsAppButton />
    </main>
  )
}
