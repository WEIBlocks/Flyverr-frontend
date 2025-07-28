"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  UserPlus, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AtSign, 
  User, 
  Globe, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react"
import React from "react"
import { signup } from "@/lib/api"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function SignupPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSocialLoading, setIsSocialLoading] = React.useState(false)
  const [agreedToTerms, setAgreedToTerms] = React.useState(false)
  const [passwordStrength, setPasswordStrength] = React.useState(0)
  const router = useRouter()

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strength = checkPasswordStrength(e.target.value)
    setPasswordStrength(strength)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!agreedToTerms) {
      toast.error("Please agree to the Terms of Service and Privacy Policy")
      return
    }
    
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const signupData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    try {
      const response = await signup(signupData)
      
      const responseData = response.data as {
        success: boolean
        message: string
        data: {
          user: {
            id: string
            email: string
            emailVerified: boolean
          }
        }
      }
      
      if (responseData.success) {
        toast.success(
          "Account created successfully! Please check your email to verify your account.",
          {
            duration: 6000,
            icon: '📧',
          }
        )
        
        if (responseData.data?.user) {
          localStorage.setItem("pendingUser", JSON.stringify(responseData.data.user))
        }
        
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        toast.error(responseData.message || "Signup failed. Please try again.")
      }
    } catch (err: unknown) {
      console.error("Signup error:", err)
      const errorMessage = err && typeof err === 'object' && 'response' in err 
        ? (err.response as { data?: { message?: string } })?.data?.message 
        : "Signup failed. Please try again."
      
      toast.error(errorMessage || "Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'linkedin') => {
    setIsSocialLoading(true)
    toast.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login coming soon!`)
    setIsSocialLoading(false)
  }

  return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Join Our Digital Marketplace
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Start selling your digital products to customers worldwide. 
                <span className="font-semibold text-blue-600"> It's completely free to get started!</span>
              </p>
            </div>

                        <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start">
              {/* Left Column - Benefits */}
              <div className="space-y-3">
                <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <h2 className="text-lg font-bold mb-2 text-gray-800">Why Choose Our Platform?</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-800">Zero Setup Fees</h3>
                      <p className="text-xs text-gray-600">Start selling immediately with no upfront costs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-800">Global Reach</h3>
                      <p className="text-xs text-gray-600">Access customers from around the world</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="bg-purple-100 p-1.5 rounded-full">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-800">Secure Payments</h3>
                      <p className="text-xs text-gray-600">Bank-level security for all transactions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="bg-orange-100 p-1.5 rounded-full">
                      <Zap className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-800">Instant Delivery</h3>
                      <p className="text-xs text-gray-600">Automated digital product delivery</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Trust Signals */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2 text-sm font-medium">4.9/5 from 10,000+ sellers</span>
                </div>
                <p className="text-xs text-gray-500">
                  Trusted by creators worldwide • 24/7 Support • 99.9% Uptime
                </p>
              </div>

              {/* Client Reviews */}
              <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <h3 className="text-lg font-bold mb-3 text-gray-800">What Our Creators Say</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        S
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-700 mb-1">
                          "Made over $50K in my first year! The platform is incredibly easy to use and the support team is amazing."
                        </p>
                        <p className="text-xs font-medium text-gray-600">Sarah Chen • Digital Artist</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        M
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-700 mb-1">
                          "Perfect for selling my templates. Zero fees and instant payments. Highly recommend!"
                        </p>
                        <p className="text-xs font-medium text-gray-600">Mike Rodriguez • Template Creator</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border-l-4 border-purple-500">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        A
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-700 mb-1">
                          "From $0 to $15K monthly revenue. The global reach is incredible!"
                        </p>
                        <p className="text-xs font-medium text-gray-600">Alex Thompson • Course Creator</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

                          {/* Right Column - Signup Form */}
            <Card className="p-5 bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
              <div className="text-center mb-3">
                <h2 className="text-lg font-bold text-gray-800 mb-1">Create Your Account</h2>
                <p className="text-xs text-gray-600">Join thousands of successful digital creators</p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-2 mb-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 border-2 hover:bg-gray-50"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isSocialLoading}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 border-2 hover:bg-gray-50"
                  onClick={() => handleSocialLogin('linkedin')}
                  disabled={isSocialLoading}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#0077B5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Continue with LinkedIn
                </Button>
              </div>

              <div className="relative mb-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                                          <Label htmlFor="firstName" className="text-xs font-medium text-gray-700">First Name</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <User className="w-4 h-4" />
                      </span>
                                          <Input 
                      id="firstName" 
                      name="firstName"
                      type="text" 
                      autoComplete="given-name" 
                      required 
                      placeholder="First name" 
                      className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                    />
                    </div>
                  </div>
                  <div>
                                          <Label htmlFor="lastName" className="text-xs font-medium text-gray-700">Last Name</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <User className="w-4 h-4" />
                      </span>
                                          <Input 
                      id="lastName" 
                      name="lastName"
                      type="text" 
                      autoComplete="family-name" 
                      required 
                      placeholder="Last name" 
                      className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                    />
                    </div>
                  </div>
                </div>

                <div>
                                      <Label htmlFor="username" className="text-xs font-medium text-gray-700">Username</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <AtSign className="w-4 h-4" />
                    </span>
                    <Input 
                      id="username" 
                      name="username"
                      type="text" 
                      autoComplete="username" 
                      required 
                      placeholder="Choose a username" 
                      className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                    />
                  </div>
                                      <p className="text-xs text-gray-500 mt-0.5">This will be your public profile name</p>
                </div>

                <div>
                                      <Label htmlFor="email" className="text-xs font-medium text-gray-700">Email Address</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      autoComplete="email" 
                      required 
                      placeholder="you@example.com" 
                      className="pl-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                    />
                  </div>
                </div>

                <div>
                                      <Label htmlFor="password" className="text-xs font-medium text-gray-700">Password</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      placeholder="Create a strong password"
                      className="pl-10 pr-10 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {passwordStrength > 0 && (
                    <div className="mt-1">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${
                              i < passwordStrength 
                                ? passwordStrength <= 2 
                                  ? 'bg-red-500' 
                                  : passwordStrength <= 3 
                                    ? 'bg-yellow-500' 
                                    : 'bg-green-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-xs mt-0.5 ${
                        passwordStrength <= 2 ? 'text-red-600' : 
                        passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {passwordStrength <= 2 ? 'Weak' : 
                         passwordStrength <= 3 ? 'Fair' : 'Strong'} password
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-0.5"
                  />
                  <div className="text-xs">
                    <label htmlFor="terms" className="text-gray-700 cursor-pointer">
                      I agree to the{' '}
                      <a href="/terms" className="text-blue-600 hover:underline font-medium">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline font-medium">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                                  <Button 
                    type="submit" 
                    className="w-full h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold" 
                    disabled={isLoading || !agreedToTerms}
                  >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating your account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center mt-4">
                <p className="text-xs text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="text-blue-600 hover:underline font-medium">
                    Sign in here
                  </a>
                </p>
              </div>

              {/* Security Note */}
              <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-blue-800 font-medium">Your data is secure</p>
                    <p className="text-xs text-blue-700 mt-0.5">
                      We use industry-standard encryption and never share your personal information.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}