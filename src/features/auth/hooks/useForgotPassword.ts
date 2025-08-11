import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { forgotPassword } from '../services/api'
import type { ForgotPasswordData } from '../auth.types'

export function useForgotPassword() {
  const mutation = useMutation({
    mutationFn: async (data: ForgotPasswordData) => await forgotPassword(data),
    onSuccess: (response) => {
      const responseData: any = response.data

      if (!responseData?.success) {
        throw new Error(responseData?.message || 'Failed to send reset email')
      }

      toast.success('Password reset email sent! Please check your inbox.')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'Failed to send reset email'
      toast.error(message)
    },
  })

  return {
    sendResetEmail: mutation.mutateAsync,
    isSending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  }
}


