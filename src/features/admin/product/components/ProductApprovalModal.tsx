"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  X,
  Package,
  User,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Zap,
  Crown,
} from "lucide-react";
import type { PendingProduct } from "@/features/admin/product/product.types";
import { useApproveProduct } from "@/features/admin/product/hooks/useApproveProduct";
import Link from "next/link";
import { getAdminProductDownloadUrl } from "@/features/admin/product/services/api";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";

interface ProductApprovalModalProps {
  product: PendingProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductApprovalModal({
  product,
  isOpen,
  onClose,
}: ProductApprovalModalProps) {
  const [isApproved, setIsApproved] = useState<boolean | null>(true);
  const [adminNotes, setAdminNotes] = useState("");
  const [roundPricing, setRoundPricing] = useState({
    originalPrice: 0,
    blossomPrice: 0,
    evergreenPrice: 0,
    exitPrice: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    blossomPrice: "",
    evergreenPrice: "",
    exitPrice: "",
    adminNotes: "",
  });

  const { mutate, isPending } = useApproveProduct();
  const [downloading, setDownloading] = useState(false);

  // Initialize form when product changes
  useEffect(() => {
    if (product) {
      // Set default round pricing based on original price
      const basePrice = product.original_price;
      setRoundPricing({
        originalPrice: basePrice,
        blossomPrice: Math.round(basePrice * 1.2), // 20% increase
        evergreenPrice: Math.round(basePrice * 1.4), // 40% increase
        exitPrice: Math.round(basePrice * 1.6), // 60% increase
      });
      setAdminNotes("");
      setIsApproved(true);
      setErrors({
        blossomPrice: "",
        evergreenPrice: "",
        exitPrice: "",
        adminNotes: "",
      });
    }
  }, [product]);

  const setFieldError = (field: keyof typeof errors, value: string) => {
    const parsed = parseFloat(value);
    const message =
      value === "" || isNaN(parsed)
        ? "This field is required"
        : parsed <= 0
        ? "Must be greater than 0"
        : "";
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handlePriceChange =
    (field: keyof typeof roundPricing) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFieldError(field as keyof typeof errors, value);
      const numeric = parseFloat(value);
      setRoundPricing((prev) => ({
        ...prev,
        [field]: value === "" ? Number.NaN : numeric,
      }));
    };

  const validateFields = () => {
    const newErrors = {
      blossomPrice: "",
      evergreenPrice: "",
      exitPrice: "",
      adminNotes: "",
    };

    // Admin notes are required for both approval and rejection
    if (adminNotes.trim() === "") {
      newErrors.adminNotes = "This field is required";
    }

    if (isApproved === true) {
      if (roundPricing.blossomPrice <= 0) {
        newErrors.blossomPrice = "This field is required";
      }
      if (roundPricing.evergreenPrice <= 0) {
        newErrors.evergreenPrice = "This field is required";
      }
      if (roundPricing.exitPrice <= 0) {
        newErrors.exitPrice = "This field is required";
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      return;
    }

    mutate(
      {
        productId: product!.id,
        approvalData: {
          approved: isApproved as boolean,
          adminNotes: adminNotes.trim(),
          roundPricing: {
            blossomPrice: roundPricing.blossomPrice,
            evergreenPrice: roundPricing.evergreenPrice,
            exitPrice: roundPricing.exitPrice,
          },
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  const handleDownload = async () => {
    if (!product) return;
    try {
      setDownloading(true);
      const res = await getAdminProductDownloadUrl(product.id);
      const url = res?.data?.signedUrl;
      if (!url) throw new Error("No download link available");
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

  if (!isOpen || !product) return null;

  return (
    <Modal size="2xl">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-flyverr-neutral to-gray-50 dark:from-gray-800 dark:to-gray-700/50 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-flyverr-primary to-flyverr-secondary rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Review Product
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {product.title}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isPending}
            className="text-gray-500 hover:text-flyverr-primary dark:text-gray-400 dark:hover:text-flyverr-secondary hover:bg-flyverr-primary/10 dark:hover:bg-flyverr-secondary/20 rounded-xl p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <div className="flex items-center justify-end gap-3">
            <Link
              href={`/admin/products/${product.id}`}
              target="_blank"
              className="inline-flex items-center rounded-md border-2 border-flyverr-primary text-flyverr-primary px-3 py-2 text-sm font-semibold hover:bg-flyverr-primary/10"
            >
              View
            </Link>
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white"
              size="sm"
            >
              {downloading ? "Preparing..." : "Download File"}
            </Button>
          </div>
          {/* Product Overview */}
          <Card className="border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-flyverr-neutral/50 to-gray-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-t-lg">
              <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center space-x-2">
                <Package className="w-5 h-5 text-flyverr-primary" />
                <span>Product Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-flyverr-primary/10 dark:bg-flyverr-secondary/20 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-flyverr-primary dark:text-flyverr-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.creator.first_name} {product.creator.last_name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      @{product.creator.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-flyverr-primary/10 dark:bg-flyverr-secondary/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-flyverr-primary dark:text-flyverr-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Submitted
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {new Date(product.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-flyverr-primary/10 dark:bg-flyverr-secondary/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-flyverr-primary dark:text-flyverr-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Original Price
                    </p>
                    <p className="text-lg font-bold text-flyverr-primary dark:text-flyverr-secondary">
                      ${product.original_price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-flyverr-primary/10 dark:bg-flyverr-secondary/20 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-flyverr-primary dark:text-flyverr-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Licenses
                    </p>
                    <p className="text-lg font-bold text-flyverr-primary dark:text-flyverr-secondary">
                      {product.total_licenses}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Approval Decision */}
          <Card className="border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-flyverr-neutral/50 to-gray-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-t-lg">
              <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flyverr-primary" />
                <span>Decision</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-1">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setIsApproved(true)}
                    disabled={isSubmitting}
                    className={`relative flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg transition-all duration-300 ease-out focus:outline-none ${
                      isApproved === true
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 shadow-sm border border-green-200 dark:border-green-700"
                        : "text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 hover:border hover:border-green-200/50 dark:hover:border-green-700/50"
                    }`}
                  >
                    <CheckCircle
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isApproved === true
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-green-500"
                      }`}
                    />
                    <span className="text-sm sm:text-base font-semibold transition-colors duration-300">
                      Approve
                    </span>
                    <span
                      className={`pointer-events-none absolute bottom-0 inset-x-6 h-0.5 rounded-full transition-all duration-300 ${
                        isApproved === true ? "bg-green-500" : "bg-transparent"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsApproved(false)}
                    disabled={isSubmitting}
                    className={`relative flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg transition-all duration-300 ease-out focus:outline-none ${
                      isApproved === false
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 shadow-sm border border-red-200 dark:border-red-700"
                        : "text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border hover:border-red-200/50 dark:hover:border-red-700/50"
                    }`}
                  >
                    <XCircle
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isApproved === false
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-red-500"
                      }`}
                    />
                    <span className="text-sm sm:text-base font-semibold transition-colors duration-300">
                      Reject
                    </span>
                    <span
                      className={`pointer-events-none absolute bottom-0 inset-x-6 h-0.5 rounded-full transition-all duration-300 ${
                        isApproved === false ? "bg-red-500" : "bg-transparent"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Round Pricing - Only show if approved */}
          {isApproved === true && (
            <Card className="border-2 border-gray-100 dark:border-gray-700 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-flyverr-neutral/50 to-gray-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-t-lg">
                <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-flyverr-primary" />
                  <span>Round Pricing Configuration</span>
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Set pricing for different resale rounds
                </p>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Newboom (Original) */}
                  <div className="space-y-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <Label className="text-sm font-semibold flex items-center space-x-2 text-green-800 dark:text-green-400">
                      <Package className="w-4 h-4" />
                      <span>Newboom (Original)</span>
                    </Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                        $
                      </span>
                      <Input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={Number.isNaN(roundPricing.originalPrice) ? "" : roundPricing.originalPrice}
                        onChange={handlePriceChange("originalPrice")}
                        className="flex-1 bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-white font-semibold  focus:ring-green-500/20 dark:focus:ring-green-500/20 placeholder:text-green-300 dark:placeholder:text-green-400"
                        placeholder="100"
                      />
                    </div>

                    <p className="text-xs text-green-700 dark:text-green-300">
                      Never resold - Original licenses only
                    </p>
                  </div>

                  {/* Blossom */}
                  <div className="space-y-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <Label className="text-sm font-semibold flex items-center space-x-2 text-blue-800 dark:text-blue-400">
                      <Zap className="w-4 h-4" />
                      <span>Blossom</span>
                    </Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                        $
                      </span>
                      <Input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={Number.isNaN(roundPricing.blossomPrice) ? "" : roundPricing.blossomPrice}
                        onChange={handlePriceChange("blossomPrice")}
                        className="flex-1 bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-white font-semibold  focus:ring-blue-500/20 dark:focus:ring-blue-500/20 placeholder:text-blue-300 dark:placeholder:text-blue-400"
                        placeholder="120"
                      />
                    </div>
                    {errors.blossomPrice && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {errors.blossomPrice}
                      </p>
                    )}
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      1st resale cycle - Growing demand
                    </p>
                  </div>

                  {/* Evergreen */}
                  <div className="space-y-3 p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <Label className="text-sm font-semibold flex items-center space-x-2 text-purple-800 dark:text-purple-400">
                      <Crown className="w-4 h-4" />
                      <span>Evergreen</span>
                    </Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">
                        $
                      </span>
                      <Input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={Number.isNaN(roundPricing.evergreenPrice) ? "" : roundPricing.evergreenPrice}
                        onChange={handlePriceChange("evergreenPrice")}
                        className="flex-1 bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-white font-semibold focus:ring-purple-500 dark:focus:ring-purple-500 placeholder:text-purple-300 dark:placeholder:text-purple-400"
                        placeholder="140"
                      />
                    </div>
                    {errors.evergreenPrice && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {errors.evergreenPrice}
                      </p>
                    )}
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      2nd resale cycle - Stable value
                    </p>
                  </div>

                  {/* Exit Round */}
                  <div className="space-y-3 p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border border-orange-200 dark:border-orange-800 ">
                    <Label className="text-sm font-semibold flex items-center space-x-2 text-orange-800 dark:text-orange-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>Exit</span>
                    </Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-600 dark:text-orange-400 font-bold text-lg">
                        $
                      </span>
                      <Input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={Number.isNaN(roundPricing.exitPrice) ? "" : roundPricing.exitPrice}
                        onChange={handlePriceChange("exitPrice")}
                        className="flex-1 bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700 text-white font-semibold  focus:ring-orange-500 dark:focus:ring-orange-500  placeholder:text-orange-300 dark:placeholder:text-orange-400"
                        placeholder="160"
                      />
                    </div>
                    {errors.exitPrice && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {errors.exitPrice}
                      </p>
                    )}
                    <p className="text-xs text-orange-700 dark:text-orange-300">
                      3rd resale cycle - Final opportunity
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Admin Notes */}
          <Card className="border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-flyverr-neutral/50 to-gray-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-t-lg">
              <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-flyverr-primary" />
                <span>Admin Notes</span>
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isApproved === true
                  ? "Add notes about why this product was approved"
                  : "Add notes about why this product was rejected"}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <Textarea
                value={adminNotes}
                onChange={(e) => {
                  const value = e.target.value;
                  setAdminNotes(value);
                  setErrors((prev) => ({
                    ...prev,
                    adminNotes:
                      value.trim() === "" ? "This field is required" : "",
                  }));
                }}
                placeholder={
                  isApproved === true
                    ? "This product meets our quality standards because..."
                    : "This product was rejected because..."
                }
                className="min-h-[120px] border-2 border-gray-200 dark:border-gray-600 focus:border-flyverr-primary focus:ring-flyverr-primary/20 rounded-xl resize-none"
                disabled={isPending}
              />
              {errors.adminNotes && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {errors.adminNotes}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="px-8 py-3 text-lg font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-flyverr-primary hover:text-flyverr-primary dark:hover:border-flyverr-secondary dark:hover:text-flyverr-secondary transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className={`min-w-[140px] px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                isApproved === true
                  ? "bg-flyverr-primary hover:bg-flyverr-primary/90 text-white shadow-lg hover:shadow-xl"
                  : isApproved === false
                  ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  {isApproved === true ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Approve
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 mr-2" />
                      Reject
                    </>
                  )}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
