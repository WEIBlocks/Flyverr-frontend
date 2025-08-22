"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, CheckCircle, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, mounted, isLoading } = useAuth();

  // Check if user came from registration flow
  const fromRegistration = searchParams.get("from") === "registration";
  const email = searchParams.get("email");

  useEffect(() => {
    // Wait for auth to be ready
    if (!mounted || isLoading) return;

    // If user is already authenticated, redirect them
    if (isAuthenticated) {
      router.replace("/user/dashboard");
      return;
    }

    // If user didn't come from registration, redirect to signup
    if (!fromRegistration) {
      router.replace("/signup");
      return;
    }
  }, [isAuthenticated, fromRegistration, router, mounted, isLoading]);

  const handleCheckEmail = () => {
    // Open user's default email client
    if (email) {
      // Common email providers
      const emailProviders = {
        gmail: "https://mail.google.com",
        yahoo: "https://mail.yahoo.com",
        outlook: "https://outlook.live.com",
        hotmail: "https://outlook.live.com",
      };

      // Try to detect email provider
      const domain = email.split("@")[1]?.toLowerCase();
      let emailUrl = "";

      if (domain?.includes("gmail")) {
        emailUrl = emailProviders.gmail;
      } else if (domain?.includes("yahoo")) {
        emailUrl = emailProviders.yahoo;
      } else if (domain?.includes("outlook") || domain?.includes("hotmail")) {
        emailUrl = emailProviders.outlook;
      }

      if (emailUrl) {
        window.open(emailUrl, "_blank");
      } else {
        // Generic email check instruction
        alert("Please check your email inbox and spam folder");
      }
    }
  };

  // Show loading while checking redirects
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-flyverr-primary"></div>
      </div>
    );
  }

  // Show loading while checking redirects
  if (!fromRegistration || isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 bg-card text-card-foreground border border-border shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-flyverr-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-flyverr-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Verify Your Email
            </h1>
            <p className="text-muted-foreground">
              We've sent a verification link to
            </p>
            {email && (
              <p className="text-sm font-medium text-foreground mt-1">
                {email}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground">
                  Check your email
                </h3>
                <p className="text-sm text-muted-foreground">
                  Look for an email from us with the subject "Verify your email
                  address"
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground">
                  Click the verification link
                </h3>
                <p className="text-sm text-muted-foreground">
                  Click the link in the email to complete your account setup
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground">First login</h3>
                <p className="text-sm text-muted-foreground">
                  Once verified, you can log in to your account and start using
                  the platform
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleCheckEmail}
              className="w-full bg-flyverr-primary hover:bg-flyverr-primary/80 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Check Email
            </Button>
          </div>

          {/* Additional Help */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-primary">
                  Can't find the email?
                </p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Check your spam or junk folder</li>
                  <li>• Make sure you entered the correct email address</li>
                  <li>• Wait a few minutes for the email to arrive</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already verified?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
