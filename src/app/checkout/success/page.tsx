"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CheckoutSuccessPage() {
  const search = useSearchParams();
  const sessionId = search.get("session_id");

  return (
    <main className="min-h-[80vh] bg-flyverr-neutral dark:bg-gray-950">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-[100%] bg-gradient-to-r from-flyverr-primary/15 via-purple-500/10 to-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-[100%] bg-gradient-to-r from-emerald-400/10 via-flyverr-primary/10 to-indigo-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <Card className="border-gray-200/70 dark:border-gray-800/80 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/50">
          <CardHeader className="pb-0 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <CardTitle className="text-3xl sm:text-4xl">
              Checkout Successful
            </CardTitle>
            <CardDescription className="mx-auto mt-2 max-w-xl text-base sm:text-lg">
              Thank you! Your checkout was successful.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-8 grid gap-6">
              <div className="rounded-xl border border-emerald-200/50 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-900/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300">
                You can return to your dashboard now.
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href="/user/products" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-flyverr-primary hover:bg-flyverr-primary/90">
                    Go to My Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {sessionId && (
                <div className="text-center text-xs text-gray-500 dark:text-gray-500">
                  Checkout session: {sessionId}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
