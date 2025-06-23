import { getStorageItem, setStorageItem } from "./storage-service"

// Define cart item type
export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  color: string
}

// Get cart items from storage
export function getCartItems(): CartItem[] {
  return getStorageItem<CartItem[]>("cart_items", [])
}

// Save cart items to storage
export function saveCartItems(items: CartItem[]): void {
  setStorageItem("cart_items", items)
}

// Add item to cart
export function addToCart(item: CartItem): void {
  const cartItems = getCartItems()

  // Check if item already exists in cart
  const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id && cartItem.color === item.color)

  if (existingItemIndex !== -1) {
    // Update quantity if item exists
    cartItems[existingItemIndex].quantity += item.quantity
  } else {
    // Add new item if it doesn't exist
    cartItems.push(item)
  }

  saveCartItems(cartItems)
}

// Update item quantity
export function updateCartItemQuantity(id: number, color: string, quantity: number): void {
  if (quantity < 1) return

  const cartItems = getCartItems()
  const itemIndex = cartItems.findIndex((item) => item.id === id && item.color === color)

  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity = quantity
    saveCartItems(cartItems)
  }
}

// Remove item from cart
export function removeCartItem(id: number, color: string): void {
  const cartItems = getCartItems()
  const updatedItems = cartItems.filter((item) => !(item.id === id && item.color === color))

  saveCartItems(updatedItems)
}

// Clear cart
export function clearCart(): void {
  saveCartItems([])
}

// Calculate cart totals
export function calculateCartTotals() {
  const cartItems = getCartItems()

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const shipping = subtotal > 999 ? 0 : 99
  const total = subtotal + shipping

  return { subtotal, shipping, total, itemCount: cartItems.length }
}
