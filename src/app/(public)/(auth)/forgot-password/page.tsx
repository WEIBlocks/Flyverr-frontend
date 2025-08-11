"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import React from "react"
import { forgotPassword } from "@/lib/api"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [emailSent, setEmailSent] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const emailData = {
      email: formData.get("email") as string,
    }

    try {
      const response = await forgotPassword(emailData)
      
      // Handle the API response structure
      const responseData = response.data as {
        success: boolean
        message: string
      }
      
      if (responseData.success) {
        setEmailSent(true)
        setEmail(emailData.email)
        
        // Show success toast
        toast.success(
          "Password reset email sent successfully! Please check your inbox.",
          {
            duration: 6000,
            icon: '📧',
          }
        )
      } else {
        toast.error(responseData.message || "Failed to send reset email. Please try again.")
      }
    } catch (err: unknown) {
      console.error("Forgot password error:", err)
      const errorMessage = err && typeof err === 'object' && 'response' in err 
        ? (err.response as { data?: { message?: string } })?.data?.message 
        : "Failed to send reset email. Please try again."
      
      // Show error toast
      toast.error(errorMessage || "Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    if (!email) return
    
    setIsLoading(true)
    try {
      const response = await forgotPassword({ email })
      const responseData = response.data as { success: boolean; message: string }
      
      if (responseData.success) {
        toast.success("Reset email sent again! Please check your inbox.", {
          duration: 6000,
          icon: '📧',
        })
      } else {
        toast.error(responseData.message || "Failed to resend email.")
      }
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'response' in err 
        ? (err.response as { data?: { message?: string } })?.data?.message 
        : "Failed to resend email."
      toast.error(errorMessage || "Failed to resend email.")
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4">
        <Card className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center mb-6">
            <span className="bg-green-100 rounded-full p-3 mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </span>
            <h1 className="text-2xl font-bold">Check your email</h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md text-sm">
            <p className="font-medium mb-2">What to do next:</p>
            <ul className="space-y-1 text-blue-600">
              <li>• Check your email inbox (and spam folder)</li>
              <li>• Click the reset password link in the email</li>
              <li>• Create a new password</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleResendEmail}
              disabled={isLoading}
              variant="outline" 
              className="w-full"
            >
              {isLoading ? "Sending..." : "Resend email"}
            </Button>
            
            <Button 
              onClick={() => router.push("/login")}
              variant="ghost" 
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4">
      <Card className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center mb-6">
          <span className="bg-primary/10 rounded-full p-3 mb-2">
            <Mail className="w-8 h-8 text-primary" />
          </span>
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            No worries! Enter your email address and we&apos;ll send you a reset link.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Mail className="w-5 h-5" />
              </span>
              <Input 
                id="email" 
                name="email"
                type="email" 
                autoComplete="email" 
                required 
                placeholder="Enter your email address" 
                className="pl-10" 
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending reset link..." : "Send reset link"}
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