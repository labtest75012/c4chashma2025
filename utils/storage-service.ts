/**
 * Utility service for handling localStorage operations with error handling
 */

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = "__test__"
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

// Generic get function with type safety
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (!isLocalStorageAvailable()) return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error)
    return defaultValue
  }
}

// Generic set function with error handling
export function setStorageItem<T>(key: string, value: T): boolean {
  if (!isLocalStorageAvailable()) return false

  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error)
    return false
  }
}

// Remove item with error handling
export function removeStorageItem(key: string): boolean {
  if (!isLocalStorageAvailable()) return false

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
    return false
  }
}

// Clear all storage (use with caution)
export function clearStorage(): boolean {
  if (!isLocalStorageAvailable()) return false

  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error("Error clearing localStorage:", error)
    return false
  }
}
