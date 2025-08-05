import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// LocalStorage Helper Functions
export class LocalStorageHelper {
  /**
   * Save data to localStorage
   * @param key - The key to store the data under
   * @param value - The value to store (will be JSON stringified)
   */
  static set<T>(key: string, value: T): void {
    try {
      if (typeof window !== 'undefined') {
        const serializedValue = JSON.stringify(value)
        localStorage.setItem(key, serializedValue)
      }
    } catch (error) {
      console.error(`Error saving to localStorage with key "${key}":`, error)
    }
  }

  /**
   * Get data from localStorage
   * @param key - The key to retrieve data from
   * @param defaultValue - Default value if key doesn't exist or parsing fails
   * @returns The parsed value or defaultValue
   */
  static get<T>(key: string, defaultValue?: T): T | null {
    try {
      if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key)
        if (item === null) {
          return defaultValue || null
        }
        return JSON.parse(item) as T
      }
      return defaultValue || null
    } catch (error) {
      console.error(`Error reading from localStorage with key "${key}":`, error)
      return defaultValue || null
    }
  }

  /**
   * Remove a specific item from localStorage
   * @param key - The key to remove
   */
  static remove(key: string): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing from localStorage with key "${key}":`, error)
    }
  }

  /**
   * Clear all data from localStorage
   */
  static clear(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.clear()
      }
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }

  /**
   * Check if a key exists in localStorage
   * @param key - The key to check
   * @returns true if key exists, false otherwise
   */
  static has(key: string): boolean {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key) !== null
      }
      return false
    } catch (error) {
      console.error(`Error checking localStorage for key "${key}":`, error)
      return false
    }
  }

  /**
   * Get all keys from localStorage
   * @returns Array of all keys
   */
  static keys(): string[] {
    try {
      if (typeof window !== 'undefined') {
        return Object.keys(localStorage)
      }
      return []
    } catch (error) {
      console.error('Error getting localStorage keys:', error)
      return []
    }
  }

  /**
   * Get the size of localStorage (number of items)
   * @returns Number of items in localStorage
   */
  static size(): number {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.length
      }
      return 0
    } catch (error) {
      console.error('Error getting localStorage size:', error)
      return 0
    }
  }

  /**
   * Save multiple items at once
   * @param items - Object with key-value pairs to save
   */
  static setMultiple(items: Record<string, any>): void {
    try {
      if (typeof window !== 'undefined') {
        Object.entries(items).forEach(([key, value]) => {
          this.set(key, value)
        })
      }
    } catch (error) {
      console.error('Error saving multiple items to localStorage:', error)
    }
  }

  /**
   * Get multiple items at once
   * @param keys - Array of keys to retrieve
   * @returns Object with key-value pairs
   */
  static getMultiple<T extends Record<string, any>>(keys: string[]): Partial<T> {
    try {
      if (typeof window !== 'undefined') {
        const result: Partial<T> = {}
        keys.forEach(key => {
          const value = this.get(key)
          if (value !== null) {
            result[key as keyof T] = value
          }
        })
        return result
      }
      return {}
    } catch (error) {
      console.error('Error getting multiple items from localStorage:', error)
      return {}
    }
  }

  /**
   * Remove multiple items at once
   * @param keys - Array of keys to remove
   */
  static removeMultiple(keys: string[]): void {
    try {
      if (typeof window !== 'undefined') {
        keys.forEach(key => {
          this.remove(key)
        })
      }
    } catch (error) {
      console.error('Error removing multiple items from localStorage:', error)
    }
  }
}

// Convenience functions for common use cases
export const storage = {
  // Auth-related storage
  setToken: (token: string) => LocalStorageHelper.set('token', token),
  getToken: () => LocalStorageHelper.get<string>('token'),
  removeToken: () => LocalStorageHelper.remove('token'),
  
  setRefreshToken: (token: string) => LocalStorageHelper.set('refreshToken', token),
  getRefreshToken: () => LocalStorageHelper.get<string>('refreshToken'),
  removeRefreshToken: () => LocalStorageHelper.remove('refreshToken'),
  
  setUser: (user: any) => LocalStorageHelper.set('user', user),
  getUser: () => LocalStorageHelper.get<any>('user'),
  removeUser: () => LocalStorageHelper.remove('user'),
  
  // Clear all auth data
  clearAuth: () => {
    LocalStorageHelper.removeMultiple(['token', 'refreshToken', 'user'])
  },
  
  // Theme-related storage
  setTheme: (theme: string) => LocalStorageHelper.set('theme', theme),
  getTheme: () => LocalStorageHelper.get<string>('theme', 'light'),
  removeTheme: () => LocalStorageHelper.remove('theme'),
  
  // Settings-related storage
  setSettings: (settings: any) => LocalStorageHelper.set('settings', settings),
  getSettings: () => LocalStorageHelper.get<any>('settings', {}),
  removeSettings: () => LocalStorageHelper.remove('settings'),
}
