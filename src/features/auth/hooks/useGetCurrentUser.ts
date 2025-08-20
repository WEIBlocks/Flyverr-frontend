import { useQuery } from '@tanstack/react-query'
import { getUser } from '../services/api'
import { storage } from '@/lib/utils'
import type { GetUserResponse, UserProfile } from '../auth.types'

export function useGetCurrentUser() {
  const token = storage.getToken()

  return useQuery({
    queryKey: ['auth', 'current-user', token],
    queryFn: async (): Promise<UserProfile> => {
      const response = await getUser()
     
     
      const responseData = response as GetUserResponse
      
      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to fetch user profile')
      }
      
      if (!responseData.data?.user) {
        throw new Error('Invalid response: user data not found')
      }
      
      return responseData.data.user
    },
    enabled: !!token && typeof window !== 'undefined',
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) return false
      return failureCount < 3
    },
    refetchOnWindowFocus: false,
  })
}


