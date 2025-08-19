"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const search = useSearchParams();
  const licenseId = search.get("licenseId");
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!licenseId) {
      toast.error("Missing license reference");
      return;
    }
    try {
      setDownloading(true);
      const { data } = await api.post<{
        success: boolean;
        data?: { signedUrl?: string };
      }>(`/licenses/${licenseId}/download`);
      const url = data?.data?.signedUrl;
      if (!url) {
        throw new Error("No download link available");
      }
      // Trigger browser download/navigation to the signed URL
      window.location.href = url;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ||
        (err as Error)?.message ||
        "Download failed";
      toast.error(message);
    } finally {
      setDownloading(false);
    }
  };
  return (
    <main className="min-h-[80vh] bg-flyverr-neutral dark:bg-gray-950">
      {/* Decorative background */}
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
              Payment Successful
            </CardTitle>
            <CardDescription className="mx-auto mt-2 max-w-xl text-base sm:text-lg">
              Thank you for your purchase. Your license is now active and ready
              to download.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-8 grid gap-6">
              <div className="rounded-xl border border-emerald-200/50 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-900/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300">
                A confirmation email has been sent with your receipt and
                download details.
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Button
                  onClick={handleDownload}
                  disabled={downloading || !licenseId}
                  className="w-full sm:w-auto bg-flyverr-primary hover:bg-flyverr-primary/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {downloading ? "Preparing..." : "Download Files"}
                </Button>

                <Link href="/user/licenses" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Go to My Licenses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Having trouble? Visit your licenses anytime from your dashboard.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
