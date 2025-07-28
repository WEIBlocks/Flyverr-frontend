"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react"
import React, { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { resetPassword } from "@/lib/api"
import toast from "react-hot-toast"

function ResetPasswordContent() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [token, setToken] = React.useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Extract token from URL parameters
  React.useEffect(() => {
    console.log("🔍 Current URL:", window.location.href);
    console.log("🔍 URL Hash:", window.location.hash);
    console.log("🔍 URL Search:", window.location.search);
    
    // Check for token in query parameters first
    const accessToken = searchParams.get('access_token')
    console.log("🔍 Access token from search params:", accessToken ? accessToken.substring(0, 20) + "..." : "null");
    
    // Check for token in hash (Supabase recovery links)
    const tokenFromHash = window.location.hash ? 
      new URLSearchParams(window.location.hash.substring(1)).get('access_token') : null
    console.log("🔍 Token from hash:", tokenFromHash ? tokenFromHash.substring(0, 20) + "..." : "null");
    
    // Check for token in hash with type=recovery
    const recoveryToken = window.location.hash && window.location.hash.includes('type=recovery') ? 
      new URLSearchParams(window.location.hash.substring(1)).get('access_token') : null
    console.log("🔍 Recovery token:", recoveryToken ? recoveryToken.substring(0, 20) + "..." : "null");
    
    const resetToken = accessToken || tokenFromHash || recoveryToken
    
    if (resetToken) {
      console.log('✅ Reset token found:', resetToken.substring(0, 20) + '...')
      setToken(resetToken)
    } else {
      console.log('❌ No reset token found in URL')
      toast.error("Invalid or missing reset token. Please request a new password reset.")
      router.push("/forgot-password")
    }
  }, [searchParams, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!token) return

    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.")
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.")
      setIsLoading(false)
      return
    }

    try {
      console.log("🔍 Sending reset password request:", {
        password: password ,
        token: token ? token.substring(0, 20) + "..." : "undefined"
      });
      
      const response = await resetPassword({
        password: password,
        token: token
      })

      console.log("faisal",response)
      
      const responseData = response.data as {
        success: boolean
        message: string
      }

      if (responseData.success) {
        setIsSuccess(true)
        toast.success("Password reset successfully! You can now login with your new password.")
        
        // Redirect to login after a delay
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } else {
        toast.error(responseData.message || "Failed to reset password. Please try again.")
      }
    } catch (err: unknown) {
      console.error("Reset password error:", err)
      toast.error("Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4">
        <Card className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center mb-6">
            <span className="bg-green-100 rounded-full p-3 mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </span>
            <h1 className="text-2xl font-bold">Password reset successful!</h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Your password has been updated successfully. You can now login with your new password.
            </p>
          </div>
          
          <Button 
            onClick={() => router.push("/login")}
            className="w-full"
          >
            Go to login
          </Button>
        </Card>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4">
        <Card className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center mb-6">
            <span className="bg-red-100 rounded-full p-3 mb-2">
              <Lock className="w-8 h-8 text-red-600" />
            </span>
            <h1 className="text-2xl font-bold">Invalid reset link</h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
          </div>
          
          <Button 
            onClick={() => router.push("/forgot-password")}
            className="w-full"
          >
            Request new reset link
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4">
      <Card className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center mb-6">
          <span className="bg-primary/10 rounded-full p-3 mb-2">
            <Lock className="w-8 h-8 text-primary" />
          </span>
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Enter your new password below. Make sure it&apos;s secure and memorable.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password">New Password</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock className="w-5 h-5" />
              </span>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="Enter your new password"
                className="pl-10 pr-10"
                minLength={8}
              />
              <button
                type="button"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Password must be at least 8 characters long
            </p>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock className="w-5 h-5" />
              </span>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="Confirm your new password"
                className="pl-10 pr-10"
                minLength={8}
              />
              <button
                type="button"
                tabIndex={-1}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground focus:outline-none"
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Resetting password..." : "Reset password"}
          </Button>
        </form>

        <div className="text-center">
          <Button 
            onClick={() => router.push("/login")}
            variant="ghost" 
            className="text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4">
        <Card className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center mb-6">
            <span className="bg-primary/10 rounded-full p-3 mb-2">
              <Lock className="w-8 h-8 text-primary" />
            </span>
            <h1 className="text-2xl font-bold">Loading...</h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Please wait while we load the reset password page.
            </p>
          </div>
        </Card>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
} 