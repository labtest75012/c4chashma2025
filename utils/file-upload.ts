// Helper function to convert a File to a data URL
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Helper function to validate an image file
export const validateImageFile = (file: File, maxSizeMB = 5): { valid: boolean; message: string } => {
  // Check if it's an image
  if (!file.type.startsWith("image/")) {
    return { valid: false, message: "Please select an image file" }
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return { valid: false, message: `Image size should be less than ${maxSizeMB}MB` }
  }

  return { valid: true, message: "Valid image file" }
}
