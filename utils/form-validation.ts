/**
 * Form validation utility functions
 */

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone number validation (Indian format)
export function isValidIndianPhone(phone: string): boolean {
  const phoneRegex = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/
  return phoneRegex.test(phone)
}

// Required field validation
export function isRequired(value: string | undefined | null): boolean {
  return !!value && value.trim() !== ""
}

// Min length validation
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength
}

// Max length validation
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength
}

// Numeric validation
export function isNumeric(value: string): boolean {
  return /^\d+$/.test(value)
}

// Price validation (positive number with optional decimals)
export function isValidPrice(value: string): boolean {
  return /^\d+(\.\d{1,2})?$/.test(value)
}

// Pincode validation (Indian)
export function isValidPincode(value: string): boolean {
  return /^\d{6}$/.test(value)
}

// Form field validation with multiple rules
export function validateField(
  value: string,
  rules: { type: string; value?: number }[],
): { valid: boolean; message: string } {
  for (const rule of rules) {
    switch (rule.type) {
      case "required":
        if (!isRequired(value)) {
          return { valid: false, message: "This field is required" }
        }
        break
      case "email":
        if (!isValidEmail(value)) {
          return { valid: false, message: "Please enter a valid email address" }
        }
        break
      case "phone":
        if (!isValidIndianPhone(value)) {
          return { valid: false, message: "Please enter a valid phone number" }
        }
        break
      case "minLength":
        if (!hasMinLength(value, rule.value || 0)) {
          return { valid: false, message: `Minimum ${rule.value} characters required` }
        }
        break
      case "maxLength":
        if (!hasMaxLength(value, rule.value || 0)) {
          return { valid: false, message: `Maximum ${rule.value} characters allowed` }
        }
        break
      case "numeric":
        if (!isNumeric(value)) {
          return { valid: false, message: "Please enter numbers only" }
        }
        break
      case "price":
        if (!isValidPrice(value)) {
          return { valid: false, message: "Please enter a valid price" }
        }
        break
      case "pincode":
        if (!isValidPincode(value)) {
          return { valid: false, message: "Please enter a valid 6-digit pincode" }
        }
        break
    }
  }

  return { valid: true, message: "" }
}
