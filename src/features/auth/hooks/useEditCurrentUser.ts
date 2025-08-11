import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { editUser } from '../services/api'
import type { EditUserData } from '../auth.types'
import { storage } from '@/lib/utils'

export function useEditCurrentUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: EditUserData) => await editUser(data),
    onSuccess: (response) => {
      const responseData: any = response.data

      if (!responseData?.success) {
        throw new Error(responseData?.message || 'Failed to update profile')
      }

      const updatedUser = responseData.data?.user
      if (!updatedUser) {
        throw new Error('Invalid update profile response')
      }

      storage.setUser(updatedUser)
   
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
      toast.success('Profile updated successfully!')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Failed to update profile'
      toast.error(message)
    },
  })

  const updateProfile = async (data: EditUserData, callbacks?: { onSuccess?: () => void; onError?: (error: any) => void }) => {
    try {
      const result = await mutation.mutateAsync(data)
      if (callbacks?.onSuccess) {
        callbacks.onSuccess()
      }
      return result
    } catch (error) {
      if (callbacks?.onError) {
        callbacks.onError(error)
      }
      throw error
    }
  }

  return {
    updateProfile,
    isUpdating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  }
}


