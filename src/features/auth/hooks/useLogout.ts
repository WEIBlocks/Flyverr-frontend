import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { storage } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useAuth } from '@/contexts/AuthContext'

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { setIsAuthenticated } = useAuth()

  const logout = () => {
    // Clear all stored auth data
    storage.clearAuth()
    
    // Clear React Query cache
    queryClient.clear()

    setIsAuthenticated(false)

    
    // Show success message
    toast.success('Logged out successfully')
    
    // Redirect to marketplace
    router.push('/marketplace')
  }

  return { logout }
}
