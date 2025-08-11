"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Mail, ArrowLeft, CheckCircle, Shield, Zap } from "lucide-react"
import React from "react"
import { useRouter } from "next/navigation"
import { useForgotPassword } from "@/features/auth/hooks"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
})

type FormData = yup.InferType<typeof schema>

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = React.useState(false)


  const router = useRouter()
  const { sendResetEmail, isSending } = useForgotPassword()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit =  async (data: FormData) => {
    try {
      await sendResetEmail(data)
      setEmailSent(true)
     
    } catch (error) {
      // Error is handled by the hook
      console.error("Forgot password error:", error)
    }
  }

  const handleResendEmail = async () => {
    if (!getValues("email")) return
    
    try {
      await sendResetEmail({ email: getValues("email") })
      setEmailSent(true)
    } catch (error) {
      console.error("Resend email error:", error)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-full">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Check Your Email
            </h1>
            <p className="text-base text-muted-foreground max-w-sm mx-auto">
              We&apos;ve sent a password reset link to <strong className="text-foreground">{getValues("email")}</strong>
            </p>
          </div>

          {/* Success Card */}
          <Card className="p-6 bg-card text-card-foreground border border-border shadow-xl">
            <div className="space-y-4">
              {/* Instructions */}
              <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-3 rounded-lg">
                <p className="font-medium mb-2 text-primary">What to do next:</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Check your email inbox (and spam folder)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Click the reset password link in the email
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Create a new password
                  </li>
                </ul>
              </div>

              {/* Security Note */}
              <div className="bg-muted/50 border border-border rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Security Reminder</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      The reset link will expire in 1 hour for your security.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Button 
                  onClick={handleResendEmail}
                  disabled={isSending}
                  variant="outline" 
                  className="w-full"
                >
                  {isSending ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    "Resend email"
                  )}
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
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-flyverr-primary p-3 rounded-full">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-flyverr-primary bg-clip-text text-transparent mb-2">
            Forgot Your Password?
          </h1>
          <p className="text-base text-muted-foreground max-w-sm mx-auto">
            No worries! Enter your email address and we&apos;ll send you a reset link.
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="p-6 bg-card text-card-foreground border border-border shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                </span>
                <Input 
                  {...register("email")}
                  type="email" 
                  autoComplete="email" 
                  placeholder="Enter your email address" 
                  className={`pl-10 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-flyverr-primary hover:bg-flyverr-primary/90 text-primary-foreground" 
              disabled={isSending}
            >
              {isSending ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Sending reset link...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          {/* Security Note */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="bg-muted/50 border border-border rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-foreground">Your data is secure</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    We use industry-standard encryption and never share your personal information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <Button 
              onClick={() => router.push("/login")}
              variant="ghost" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 