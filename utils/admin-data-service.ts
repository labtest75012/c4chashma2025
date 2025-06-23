import { getStorageItem, setStorageItem } from "./storage-service"

// Get sales data for dashboard
export function getSalesData() {
  return getStorageItem<any[]>("sales_data", [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4000 },
    { month: "May", sales: 7000 },
    { month: "Jun", sales: 6000 },
    { month: "Jul", sales: 8000 },
    { month: "Aug", sales: 9000 },
    { month: "Sep", sales: 8000 },
    { month: "Oct", sales: 10000 },
    { month: "Nov", sales: 11000 },
    { month: "Dec", sales: 12000 },
  ])
}

// Get order statistics
export function getOrderStats() {
  return getStorageItem<any>("order_stats", {
    total: 128,
    completed: 98,
    pending: 22,
    cancelled: 8,
    growth: 14, // percentage growth from last month
  })
}

// Get revenue statistics
export function getRevenueStats() {
  return getStorageItem<any>("revenue_stats", {
    total: 89240,
    online: 65240,
    inStore: 24000,
    growth: 6, // percentage growth from last month
  })
}

// Get customer statistics
export function getCustomerStats() {
  return getStorageItem<any>("customer_stats", {
    total: 256,
    new: 42,
    returning: 214,
    growth: 18, // percentage growth from last month
  })
}

// Get appointment statistics
export function getAppointmentStats() {
  return getStorageItem<any>("appointment_stats", {
    total: 24,
    completed: 18,
    upcoming: 6,
    growth: 10, // percentage growth from last month
  })
}

// Get recent WhatsApp inquiries
export function getRecentInquiries() {
  return getStorageItem<any[]>("recent_inquiries", [
    {
      id: 1,
      name: "Rahul Sharma",
      time: "Today, 10:45 AM",
      message: "Inquiry about Classic Round Glasses",
    },
    {
      id: 2,
      name: "Priya Patel",
      time: "Yesterday, 3:20 PM",
      message: "Eye test booking request",
    },
    {
      id: 3,
      name: "Amit Kumar",
      time: "Yesterday, 11:15 AM",
      message: "Inquiry about Cat Eye Sunglasses",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      time: "2 days ago",
      message: "General product inquiry",
    },
  ])
}

// Update dashboard data (for demo purposes)
export function updateDashboardData() {
  // This function would typically fetch data from an API
  // For now, we'll just update the mock data slightly to show changes

  const salesData = getSalesData()
  const updatedSalesData = salesData.map((item) => ({
    ...item,
    sales: item.sales * (1 + (Math.random() * 0.1 - 0.05)), // +/- 5% random change
  }))

  setStorageItem("sales_data", updatedSalesData)

  // Update other stats similarly
  const orderStats = getOrderStats()
  setStorageItem("order_stats", {
    ...orderStats,
    total: orderStats.total + 1,
    completed: orderStats.completed + 1,
  })

  // Return the updated data
  return {
    salesData: updatedSalesData,
    orderStats: getOrderStats(),
    revenueStats: getRevenueStats(),
    customerStats: getCustomerStats(),
    appointmentStats: getAppointmentStats(),
  }
}
