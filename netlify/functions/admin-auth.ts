import type { Handler } from "@netlify/functions"

export const handler: Handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  }

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    }
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    }
  }

  try {
    const { username, password } = JSON.parse(event.body || "{}")

    // Get credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME || "admin"
    const adminPassword = process.env.ADMIN_PASSWORD || "manshu@123"

    // Validate credentials
    if (username === adminUsername && password === adminPassword) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Authentication successful",
          token: "admin-authenticated-" + Date.now(),
        }),
      }
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Invalid credentials",
        }),
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Server error",
      }),
    }
  }
}
