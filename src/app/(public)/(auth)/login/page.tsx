"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Users,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Link from "next/link";
import { useLogin } from "@/features/auth/hooks";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showEmailReminder, setShowEmailReminder] = React.useState(false);
  const [isSocialLoading, setIsSocialLoading] = React.useState(false);
  const { login, isLoggingIn } = useLogin();
  // const { login, isLoading } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check if user just signed up
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const pendingUser = localStorage.getItem("pendingUser");
      if (pendingUser) {
        setShowEmailReminder(true);
        // Clear the pending user data after showing reminder
        localStorage.removeItem("pendingUser");
      }
    }
  }, []);

  const onSubmit = (data: FormData) => {
    // Login will now handle the redirect based on user role after confirmation
    login(data);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-2 md:py-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-flyverr-primary p-3 rounded-full">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-flyverr-primary bg-clip-text text-transparent mb-2">
                Welcome Back to Your Marketplace
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Continue growing your digital business and reach customers
                worldwide.
                <span className="font-semibold text-blue-600">
                  {" "}
                  Your success journey continues here!
                </span>
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 items-start">
              {/* Left Column - Benefits & Stats */}
              <div className="space-y-3">
                <Card className="p-4 bg-card text-card-foreground border border-border shadow-xl">
                  <h2 className="text-lg font-bold mb-2 text-foreground">
                    Your Success Dashboard
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <div className="p-1.5 rounded-full bg-primary/10 dark:bg-primary/20">
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-foreground">
                          Track Your Growth
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Monitor sales, analytics, and customer insights
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="p-1.5 rounded-full bg-primary/10 dark:bg-primary/20">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-foreground">
                          Manage Products
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Update listings, pricing, and digital deliveries
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="p-1.5 rounded-full bg-primary/10 dark:bg-primary/20">
                        <CreditCard className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-foreground">
                          Secure Payments
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Access your earnings and payment history
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="p-1.5 rounded-full bg-primary/10 dark:bg-primary/20">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-foreground">
                          Account Security
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Bank-level protection for your business
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Platform Stats */}
                <Card className="p-4 bg-card text-card-foreground border border-border shadow-xl">
                  <h3 className="text-lg font-bold mb-3 text-foreground">
                    Platform Highlights
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        $2.5M+
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Total Creator Earnings
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        50K+
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Active Creators
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        150+
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Countries Reached
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        99.9%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Uptime Guarantee
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
                    <span className="text-muted-foreground ml-2 text-sm font-medium">
                      4.9/5 from 10,000+ creators
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Trusted by creators worldwide • 24/7 Support • Instant
                    Access
                  </p>
                </div>
              </div>

              {/* Right Column - Login Form */}
              <Card className="p-5 bg-card text-card-foreground border border-border shadow-2xl">
                <div className="text-center mb-3">
                  <h2 className="text-lg font-bold text-foreground mb-1">
                    Sign In to Your Account
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Welcome back! Please enter your details.
                  </p>
                </div>

                {/* Email Verification Reminder */}
                {showEmailReminder && (
                  <div className="bg-primary/10 border border-primary/20 text-primary px-3 py-2 rounded-md text-xs flex items-start space-x-2 mb-3">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">
                        Account created successfully!
                      </p>
                      <p className="text-primary mt-0.5">
                        Please check your email and click the verification link
                        before signing in.
                      </p>
                    </div>
                  </div>
                )}

                {/* Social Login Buttons */}
                {/* <div className="space-y-2 mb-3">
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
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#0077B5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Continue with LinkedIn
                </Button>
              </div> */}

                {/* <div className="relative mb-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">or continue with email</span>
                </div>
              </div> */}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Email Address
                    </Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail className="w-4 h-4" />
                      </span>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register("email")}
                        required
                        placeholder="you@example.com"
                        className="pl-10 h-10 border-input focus:border-flyverr-primary focus:ring-flyverr-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="password"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        {...register("password")}
                        required
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-10 border-input focus:border-flyverr-primary focus:ring-flyverr-primary"
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-10 bg-flyverr-primary hover:bg-flyverr-primary/90 text-primary-foreground font-semibold"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Sign In
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    )}
                  </Button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-primary hover:underline font-medium"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>

                {/* Security Note */}
                <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-primary font-medium">
                        Secure Access
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Your account is protected with industry-standard
                        security measures.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
