"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { UserPlus, Mail, Lock, User2, Eye, EyeOff } from "lucide-react"
import React from "react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background px-4">
      <Card className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center mb-6">
          <span className="bg-primary/10 rounded-full p-3 mb-2">
            <UserPlus className="w-8 h-8 text-primary" />
          </span>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-2">Start your journey with us. It’s free!</p>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User2 className="w-5 h-5" />
              </span>
              <Input id="name" type="text" autoComplete="name" required placeholder="Your name" className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Mail className="w-5 h-5" />
              </span>
              <Input id="email" type="email" autoComplete="email" required placeholder="you@example.com" className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock className="w-5 h-5" />
              </span>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="Create a password"
                className="pl-10 pr-10"
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
          </div>
          <Button type="submit" className="w-full mt-2">Sign up</Button>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account? <a href="/login" className="text-primary hover:underline">Sign in</a>
        </div>
      </Card>
    </div>
  )
}