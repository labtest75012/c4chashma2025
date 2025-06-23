// Updated WhatsApp service with correct number format
const WHATSAPP_NUMBER = "919509919004" // International format for WhatsApp
const DISPLAY_NUMBER = "9509919004" // Display format for UI

export const getWhatsAppNumber = () => DISPLAY_NUMBER

export const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}

export const createGeneralInquiryMessage = () => {
  return "Hi, I'm interested in your eyewear collection at C4 Chashma. Could you please help me with more information?"
}

export const createEyeTestBookingMessage = () => {
  return "Hi, I would like to book an eye test appointment at C4 Chashma. Please let me know the available slots."
}

export const createProductInquiryMessage = (productName: string, productPrice: number) => {
  return `Hi, I'm interested in the ${productName} (₹${productPrice}). Could you please provide more details about this product?`
}

export const createOrderInquiryMessage = (items: any[]) => {
  let message = "Hi, I would like to place an order for the following items:\n\n"

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - ₹${item.price}\n`
  })

  message += "\nPlease let me know the total cost and delivery details."
  return message
}

// Add the missing createCartOrderMessage function
export const createCartOrderMessage = (
  cartItems: Array<{ name: string; price: number; quantity: number; color?: string }>,
  subtotal: number,
  shipping = 0,
  total: number,
) => {
  let message = "Hi, I'd like to place an order for the following items:\n\n"

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity
    message += `${index + 1}. ${item.name}${item.color ? ` (${item.color})` : ""} - ₹${item.price} x ${item.quantity} = ₹${itemTotal}\n`
  })

  message += `\nSubtotal: ₹${subtotal}`
  message += `\nShipping: ${shipping === 0 ? "Free" : `₹${shipping}`}`
  message += `\nTotal: ₹${total}`
  message += "\n\nPlease guide me through the payment and delivery process."

  return message
}
