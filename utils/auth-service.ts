// Simple frontend authentication for static deployment
export interface AuthState {
  isAuthenticated: boolean
  user: string | null
  loginTime: number | null
}

const AUTH_KEY = "c4chashma_auth"
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

// Static credentials for demo
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "manshu@123",
}

export const authService = {
  login: (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const authState: AuthState = {
        isAuthenticated: true,
        user: username,
        loginTime: Date.now(),
      }
      localStorage.setItem(AUTH_KEY, JSON.stringify(authState))
      return true
    }
    return false
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_KEY)
  },

  isAuthenticated: (): boolean => {
    try {
      const authData = localStorage.getItem(AUTH_KEY)
      if (!authData) return false

      const authState: AuthState = JSON.parse(authData)
      const now = Date.now()

      // Check if session is expired
      if (authState.loginTime && now - authState.loginTime > SESSION_DURATION) {
        localStorage.removeItem(AUTH_KEY)
        return false
      }

      return authState.isAuthenticated
    } catch {
      return false
    }
  },

  getUser: (): string | null => {
    try {
      const authData = localStorage.getItem(AUTH_KEY)
      if (!authData) return null

      const authState: AuthState = JSON.parse(authData)
      return authState.user
    } catch {
      return null
    }
  },
}
