// Static service for frontend-only deployment
// No database dependencies - all data is static

export const staticConfig = {
  siteName: "C4 Chashma",
  contactNumber: "+91 9509919004",
  whatsappNumber: "919509919004",
  email: "c4chashma@gmail.com",
  businessHours: "Mon-Sun: 10:30 AM - 9:30 PM",
  // Admin credentials removed from frontend - now handled by Netlify Functions
}

// Mock database functions for static deployment
export const mockDatabaseOperations = {
  testConnection: () => ({
    success: true,
    message: "Running in static mode with secure authentication",
  }),

  saveOrder: (orderData: any) => ({
    success: true,
    orderId: `ORDER_${Date.now()}`,
    message: "Order saved locally (demo mode)",
  }),

  getAnalytics: () => ({
    totalOrders: 150,
    totalRevenue: 75000,
    totalCustomers: 120,
    popularProducts: ["Classic Round Black Frames", "Cat Eye Elegance"],
  }),
}
