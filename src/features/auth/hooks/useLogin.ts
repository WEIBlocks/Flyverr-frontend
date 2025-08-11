import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { login } from '../services/api'
import type { LoginData } from '../auth.types'
import { storage } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { setIsAuthenticated } = useAuth()

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => await login(data),
    onSuccess: (response) => {
      const responseData: any = response.data

      if (!responseData?.success) {
        throw new Error(responseData?.message || 'Login failed')
      }

      const user = responseData.data?.user
      const session = responseData.data?.session

      if (!user || !session?.accessToken) {
        throw new Error('Invalid login response - missing user or token')
      }

      // Store tokens and user data in localStorage
      storage.setToken(session.accessToken)
      storage.setRefreshToken(session.refreshToken)
      storage.setUser(user)
      setIsAuthenticated(true)

      // Update React Query cache
      queryClient.setQueryData(['auth', 'user'], user)

      // Show success message
      toast.success('Login successful! Welcome back!')

      // Redirect to dashboard
      router.push('/user/dashboard')

      console.log('🔐 Login successful - tokens stored and user redirected')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Login failed'
      toast.error(message)
      console.error('Login error:', error)
    },
  })

  return {
    login: mutation.mutate,
    isLoggingIn: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  }
}


