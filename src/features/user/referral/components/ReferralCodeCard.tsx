"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Gift,
  Users,
  DollarSign,
  CheckCircle,
  Loader2,
  Share2,
  TrendingUp,
} from "lucide-react";
import { useReferralStats } from "../hooks/useReferralStats";
import { useGenerateReferralCode } from "../hooks/useGenerateReferralCode";
import { useValidateReferralCode } from "../hooks/useValidateReferralCode";

export default function ReferralCodeCard() {
  const [copied, setCopied] = useState(false);
  const [validationCode, setValidationCode] = useState("");

  const { data: referralData, isLoading, error } = useReferralStats();
  const generateCodeMutation = useGenerateReferralCode();
  const validateCodeMutation = useValidateReferralCode();

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleGenerateCode = () => {
    generateCodeMutation.mutate();
  };

  const handleValidateCode = () => {
    if (!validationCode.trim()) {
      return;
    }
    validateCodeMutation.mutate({ referralCode: validationCode.trim() });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            Referral Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Gift className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            Referral Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
              Error loading referral data
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Failed to fetch referral information. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = referralData?.data;

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          Referral Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Referral Code Section */}
        <div className="space-y-4">
          {stats?.referralCode ? (
            // Show existing referral code
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Your Referral Code
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    value={stats.referralCode}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-mono text-lg"
                  />
                  <Button
                    onClick={() => handleCopyCode(stats.referralCode!)}
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Share this code with others to earn referral bonuses!
                </p>
              </div>
            </div>
          ) : stats?.canGenerateCode ? (
            // Show generate button
            <div className="text-center py-6">
              <div className="mb-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Generate Your Referral Code
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Create a unique referral code to start earning bonuses when
                  others sign up using your code.
                </p>
              </div>
              <Button
                onClick={handleGenerateCode}
                disabled={generateCodeMutation.isPending}
                className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white"
              >
                {generateCodeMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Gift className="w-4 h-4 mr-2" />
                )}
                {generateCodeMutation.isPending
                  ? "Generating..."
                  : "Generate Referral Code"}
              </Button>
            </div>
          ) : (
            // Show message that user needs to complete Stripe onboarding
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Complete Stripe Onboarding
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You need to complete Stripe onboarding before you can generate a
                referral code.
              </p>
            </div>
          )}
        </div>

        {/* Referral Stats */}
        {stats && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Referral Performance
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded-lg">
                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Total Referrals
                    </p>
                    <p className="text-xl font-bold text-blue-900 dark:text-blue-100">
                      {stats.stats.totalReferrals}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-200 dark:bg-green-800 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      Total Earnings
                    </p>
                    <p className="text-xl font-bold text-green-900 dark:text-green-100">
                      {formatCurrency(stats.stats.totalEarnings)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Signup Bonuses
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {stats.stats.signupBonuses}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    $1.00 each
                  </p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Purchase Bonuses
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {stats.stats.purchaseBonuses}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    $4.00 each
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Validation Section */}
        <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Validate Referral Code
          </h4>
          <div className="flex gap-2">
            <Input
              value={validationCode}
              onChange={(e) => setValidationCode(e.target.value.toUpperCase())}
              placeholder="Enter referral code to validate"
              className="flex-1"
            />
            <Button
              onClick={handleValidateCode}
              disabled={
                !validationCode.trim() || validateCodeMutation.isPending
              }
              variant="outline"
            >
              {validateCodeMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
