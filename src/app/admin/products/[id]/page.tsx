"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Package,
  User,
  TrendingUp,
  Save,
  FileText,
  Calendar,
  BarChart3,
  Star,
  AlertCircle,
  Flag,
  Trash2,
  Shield,
  Image as ImageIcon,
} from "lucide-react";
import { useGetProductById } from "@/features/admin/product/hooks/useGetProductById";
import { useEditProduct } from "@/features/admin/product/hooks/useEditProduct";
import { useFlagProduct } from "@/features/admin/product/hooks/useFlagProduct";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import AdminProductDetailSkeleton from "@/components/ui/AdminProductDetailSkeleton";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import Swal from "sweetalert2";
import HotDealModal from "../../../../features/admin/product/components/HotDealModal";
import { swal } from "@/lib/utils";

// Validation schema
const editProductSchema = yup.object({
  title: yup
    .string()
    .required("Product title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  thumbnail_url: yup
    .string()
    .url("Must be a valid URL")
    .required("Thumbnail URL is required"),
  original_price: yup
    .number()
    .positive("Price must be positive")
    .required("Price is required"),
  total_licenses: yup
    .number()
    .integer("Licenses must be a whole number")
    .positive("Licenses must be positive")
    .required("Total licenses is required"),
  featured: yup.boolean().required(),
  adminNotes: yup.string().optional(),
  roundPricing: yup
    .object({
      exitPrice: yup
        .number()
        .positive("Exit price must be positive")
        .required("Exit price is required"),
      blossomPrice: yup
        .number()
        .positive("Blossom price must be positive")
        .required("Blossom price is required"),
      evergreenPrice: yup
        .number()
        .positive("Evergreen price must be positive")
        .required("Evergreen price is required"),
    })
    .required(),
});

// Types based on the API response
interface RoundPricing {
  id: string;
  exit_price: number;
  blossom_price: number;
  evergreen_price: number;
}

interface Creator {
  id: string;
  email: string;
  status: string;
  username: string;
  last_name: string;
  first_name: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  file_type: string;
  file_size: number;
  original_price: number;
  total_licenses: number;
  remaining_licenses: number;
  current_stage: string;
  current_round: number;
  status: string;
  featured: boolean;
  admin_notes: string;
  created_at: string;
  updated_at: string;
  creator: Creator;
  category: Category;
  round_pricing: RoundPricing;
}

interface ProductStatistics {
  totalLicenses: number;
  soldLicenses: number;
  totalTransactions: number;
  totalRevenue: number;
  averagePrice: number;
}

interface ProductDetailResponse {
  success: boolean;
  message: string;
  data: {
    product: Product;
    statistics: ProductStatistics;
    recentActivity: {
      licenses: any[];
      transactions: any[];
    };
  };
}

export default function AdminProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagAction, setFlagAction] = useState<"flag" | "unflag" | "delete">(
    "flag"
  );
  const [flagReason, setFlagReason] = useState("");
  const [flagType, setFlagType] = useState<
    "inappropriate" | "copyright" | "spam" | "quality" | "other" | ""
  >("");

  const { data, isLoading, error } = useGetProductById(productId);
  const editProductMutation = useEditProduct();
  const flagProductMutation = useFlagProduct();

  const [showHotDealModal, setShowHotDealModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(editProductSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail_url: "",
      original_price: 0,
      total_licenses: 0,
      featured: false,
      adminNotes: "",
      roundPricing: {
        exitPrice: 0,
        blossomPrice: 0,
        evergreenPrice: 0,
      },
    },
  });

  // Update form data when product data is loaded
  useEffect(() => {
    if (data?.data?.product) {
      const product = data.data.product;
      reset({
        title: product.title,
        description: product.description,
        thumbnail_url: product.thumbnail_url,
        original_price: product.original_price,
        total_licenses: product.total_licenses,
        featured: product.featured,
        adminNotes: product.admin_notes || "",
        roundPricing: {
          exitPrice: product.round_pricing?.exit_price || 0,
          blossomPrice: product.round_pricing?.blossom_price || 0,
          evergreenPrice: product.round_pricing?.evergreen_price || 0,
        },
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: any) => {
    editProductMutation.mutate({
      productId,
      product: formData,
    });
  };

  const handleFlagProduct = async () => {
    try {
      await flagProductMutation.mutateAsync({
        productId,
        flagData: {
          action: flagAction,
          reason: flagReason,
          flagType: flagType,
          adminNotes: `Product ${flagAction}ed: ${flagReason}`,
        },
      });

      const actionText =
        flagAction === "flag"
          ? "hidden"
          : flagAction === "unflag"
          ? "shown"
          : "deleted";
      swal("Success", `Product ${actionText} successfully!`, "success", () => {
        setShowFlagModal(false);
        setFlagReason("");
        setFlagType("");
      });

      // No need for window.location.reload() - React Query will refresh the data
    } catch (error) {
      console.error("Error flagging product:", error);
      const actionText =
        flagAction === "flag"
          ? "hide"
          : flagAction === "unflag"
          ? "show"
          : "delete";
      swal(
        "Error",
        `Failed to ${actionText} product. Please try again.`,
        "error"
      );
    }
  };

  const openFlagModal = (action: "flag" | "unflag" | "delete") => {
    setFlagAction(action);
    setShowFlagModal(true);
  };

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case "newboom":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
            New Boom
          </Badge>
        );
      case "blossom":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
            Blossom
          </Badge>
        );
      case "evergreen":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800">
            Evergreen
          </Badge>
        );
      case "exit":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800">
            Exit
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">
            {stage}
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-400">
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
            Rejected
          </Badge>
        );
      case "flagged":
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
            Hidden
          </Badge>
        );
      case "deleted":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
            Deleted
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">
            {status}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const shortenId = (value: string, width: number = 6) => {
    if (!value) return "";
    return value.length <= width * 2 + 1
      ? value
      : `${value.slice(0, width)}…${value.slice(-width)}`;
  };

  if (isLoading) {
    return <AdminProductDetailSkeleton />;
  }

  if (!data?.data?.product) {
    return (
      <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The product you are looking for does not exist.
          </p>
          <Button
            onClick={() => router.push("/admin/products")}
            className="bg-flyverr-primary hover:bg-flyverr-primary/90"
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const product = data.data.product;
  const statistics = data.data.statistics;
  const recentActivity = data.data.recentActivity;

  return (
    <div className="min-h-screen bg-flyverr-neutral dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-flyverr-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Product Details
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {product.status === "deleted"
                  ? "This product has been deleted"
                  : "View and edit product information"}
              </p>
            </div>

            {/* Admin Actions */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-start md:justify-end w-full md:w-auto">
              <HotDealModal
                productId={productId}
                buttonLabel="Mark Hot Deal"
                buttonClassName="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20 shadow-sm"
              />
              {product.status === "approved" && (
                <Button
                  variant="outline"
                  onClick={() => openFlagModal("flag")}
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900/20 shadow-sm"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Hide Product
                </Button>
              )}

              {product.status === "flagged" && (
                <Button
                  variant="outline"
                  onClick={() => openFlagModal("unflag")}
                  className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20 shadow-sm"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Show Product
                </Button>
              )}

              {product.status !== "deleted" && (
                <Button
                  variant="outline"
                  onClick={() => openFlagModal("delete")}
                  className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20 shadow-sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Product
                </Button>
              )}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`space-y-8 ${
            product.status === "deleted" ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Product Details Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                      <Package className="w-5 h-5 text-flyverr-primary" />
                    </div>
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Product Title *
                    </Label>
                    <Input
                      {...register("title")}
                      className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-flyverr-primary/20 focus:border-flyverr-primary transition-colors duration-200 ${
                        errors.title
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : ""
                      }`}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description *
                    </Label>
                    <Textarea
                      {...register("description")}
                      rows={4}
                      className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                        errors.description
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Thumbnail Upload */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Product Thumbnail *
                    </Label>

                    {/* Simple Thumbnail Area */}
                    <div className="w-full">
                      {watch("thumbnail_url") ? (
                        <div className="relative">
                          <div className="w-full h-48 sm:h-60 md:h-64 lg:h-72 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden relative">
                            <ImageWithFallback
                              src={watch("thumbnail_url")}
                              alt="Product thumbnail"
                              fill={true}
                              fallbackIcon={
                                <ImageIcon className="w-16 h-16 text-gray-400" />
                              }
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Simple Remove Button */}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setValue("thumbnail_url", "")}
                            className="absolute top-2 right-2 w-6 h-6 p-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full"
                          >
                            ✕
                          </Button>

                          {/* Simple Change Button */}
                          <div className="mt-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document
                                  .getElementById("thumbnail-upload")
                                  ?.click()
                              }
                              className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                            >
                              <ImageIcon className="w-4 h-4 mr-2" />
                              Change Image
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-48 sm:h-60 md:h-64 lg:h-72 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700">
                          <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            No thumbnail selected
                          </p>
                          <Button
                            type="button"
                            onClick={() =>
                              document
                                .getElementById("thumbnail-upload")
                                ?.click()
                            }
                            className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white px-4 py-2 rounded-md"
                          >
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Hidden file input */}
                    <input
                      id="thumbnail-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setValue(
                              "thumbnail_url",
                              e.target?.result as string
                            );
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />

                    {errors.thumbnail_url && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {errors.thumbnail_url.message}
                      </p>
                    )}
                  </div>

                  {/* Price and Licenses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Original Price ($) *
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register("original_price", { valueAsNumber: true })}
                        className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                          errors.original_price
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.original_price && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.original_price.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Total Licenses *
                      </Label>
                      <Input
                        type="number"
                        {...register("total_licenses", { valueAsNumber: true })}
                        className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                          errors.total_licenses
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.total_licenses && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.total_licenses.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Featured Status */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Featured Product
                    </Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register("featured")}
                        className="w-4 h-4 text-flyverr-primary border-gray-300 rounded focus:ring-flyverr-primary"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Mark as featured product
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Round Pricing */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-flyverr-primary" />
                    </div>
                    Round Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Exit Price ($) *
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register("roundPricing.exitPrice", {
                          valueAsNumber: true,
                        })}
                        className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                          errors.roundPricing?.exitPrice
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.roundPricing?.exitPrice && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.roundPricing.exitPrice.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Blossom Price ($) *
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register("roundPricing.blossomPrice", {
                          valueAsNumber: true,
                        })}
                        className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                          errors.roundPricing?.blossomPrice
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.roundPricing?.blossomPrice && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.roundPricing.blossomPrice.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Evergreen Price ($) *
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register("roundPricing.evergreenPrice", {
                          valueAsNumber: true,
                        })}
                        className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                          errors.roundPricing?.evergreenPrice
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      {errors.roundPricing?.evergreenPrice && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.roundPricing.evergreenPrice.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Notes */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-flyverr-primary" />
                    </div>
                    Admin Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    {...register("adminNotes")}
                    placeholder="Add admin notes about this product..."
                    rows={4}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Product Info & Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Product Status */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Status
                      </span>
                      {getStatusBadge(product.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Stage
                      </span>
                      {getStageBadge(product.current_stage)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Round
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {product.current_round}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Category
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {product.category?.name || "Uncategorized"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Creator Information */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                      <User className="w-5 h-5 text-flyverr-primary" />
                    </div>
                    Creator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-flyverr-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-flyverr-primary font-semibold">
                        {product.creator.first_name.charAt(0)}
                        {product.creator.last_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {product.creator.first_name} {product.creator.last_name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        @{product.creator.username}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>{product.creator.email}</p>
                    <p>Status: {product.creator.status}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Average Price
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${statistics.averagePrice}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* File Information */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                      <FileText className="w-5 h-5 text-flyverr-primary" />
                    </div>
                    File Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Type
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {product.file_type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Size
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatFileSize(product.file_size)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Licenses
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {product.remaining_licenses}/{product.total_licenses}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Product ID
                    </span>
                    <span className="text-xs font-mono text-gray-900 dark:text-white">
                      {shortenId(product.id)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-flyverr-primary" />
                    </div>
                    Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Licenses
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {statistics.totalLicenses}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Sold Licenses
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {statistics.soldLicenses}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Revenue
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${statistics.totalRevenue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Transactions
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {statistics.totalTransactions}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Timestamps */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-flyverr-primary" />
                    </div>
                    Timestamps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Created
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatDate(product.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Updated
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatDate(product.updated_at)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Recent Activity */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-flyverr-primary/10 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-flyverr-primary" />
                </div>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Licenses */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Licenses
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-600 dark:text-gray-400">
                          <th className="py-2 pr-3">License ID</th>
                          <th className="py-2 pr-3">Acquired</th>
                          <th className="py-2 pr-3">Round</th>
                          <th className="py-2 pr-3">Type</th>
                          <th className="py-2 pr-3">Resale</th>
                          <th className="py-2 pr-3">Owner</th>
                          <th className="py-2">Listed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentActivity?.licenses?.length ? (
                          recentActivity.licenses.map((lic: any) => (
                            <tr
                              key={lic.id}
                              className="border-t border-gray-200 dark:border-gray-700"
                            >
                              <td className="py-2 pr-3 font-mono text-xs text-gray-900 dark:text-gray-100">
                                {shortenId(lic.id)}
                              </td>
                              <td className="py-2 pr-3 text-gray-700 dark:text-gray-300">
                                {lic.acquired_at
                                  ? formatDate(lic.acquired_at)
                                  : "—"}
                              </td>
                              <td className="py-2 pr-3 text-gray-700 dark:text-gray-300">
                                {lic.current_round}
                              </td>
                              <td className="py-2 pr-3 text-gray-700 dark:text-gray-300">
                                {lic.purchase_type || "—"}
                              </td>
                              <td className="py-2 pr-3 text-gray-700 dark:text-gray-300">
                                {lic.resale_eligible ? "Yes" : "No"}
                              </td>
                              <td className="py-2 pr-3 font-mono text-xs text-gray-700 dark:text-gray-300">
                                {lic.current_owner_id
                                  ? shortenId(lic.current_owner_id)
                                  : "—"}
                              </td>
                              <td className="py-2 text-gray-700 dark:text-gray-300">
                                {lic.is_listed_for_resale ? "Yes" : "No"}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={7}
                              className="py-3 text-center text-gray-500 dark:text-gray-400"
                            >
                              No license activity
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Transactions */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Transactions
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-600 dark:text-gray-400">
                          <th className="py-2 pr-3">Tx ID</th>
                          <th className="py-2 pr-3">Amount</th>
                          <th className="py-2 pr-3">Status</th>
                          <th className="py-2 pr-3">Type</th>
                          <th className="py-2 pr-3">Buyer</th>
                          <th className="py-2 pr-3">Seller</th>
                          <th className="py-2">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentActivity?.transactions?.length ? (
                          recentActivity.transactions.map((tx: any) => (
                            <tr
                              key={tx.id}
                              className="border-t border-gray-200 dark:border-gray-700"
                            >
                              <td className="py-2 pr-3 font-mono text-xs text-gray-900 dark:text-gray-100">
                                {shortenId(tx.id)}
                              </td>
                              <td className="py-2 pr-3 text-gray-700 dark:text-gray-300">
                                ${tx.amount}
                              </td>
                              <td className="py-2 pr-3 text-gray-700 dark:text-gray-300">
                                {tx.status}
                              </td>
                              <td className="py-2 pr-3 text-gray-700 dark:text-gray-300">
                                {tx.transaction_type}
                              </td>
                              <td className="py-2 pr-3 font-mono text-xs text-gray-700 dark:text-gray-300">
                                {shortenId(tx.buyer_id)}
                              </td>
                              <td className="py-2 pr-3 font-mono text-xs text-gray-700 dark:text-gray-300">
                                {shortenId(tx.seller_id)}
                              </td>
                              <td className="py-2 text-gray-700 dark:text-gray-300">
                                {formatDate(tx.created_at)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={7}
                              className="py-3 text-center text-gray-500 dark:text-gray-400"
                            >
                              No transaction activity
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Update Button - Below the form */}
          {product.status !== "deleted" && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-flyverr-primary"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {isDirty
                        ? "You have unsaved changes"
                        : "All changes saved"}
                    </span>
                  </div>
                  {isDirty && (
                    <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                      Unsaved
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={editProductMutation.isPending || !isDirty}
                  className="bg-flyverr-primary hover:bg-flyverr-primary/90 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] h-10 shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                >
                  {editProductMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Product
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* Flag Product Modal */}
        {showFlagModal && (
          <Modal size="sm">
            <div className="p-6 w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {flagAction === "flag" && "Hide Product"}
                  {flagAction === "unflag" && "Show Product"}
                  {flagAction === "delete" && "Delete Product"}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFlagModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reason *
                  </Label>
                  <Textarea
                    value={flagReason}
                    onChange={(e) => setFlagReason(e.target.value)}
                    placeholder={`Enter reason for ${
                      flagAction === "flag"
                        ? "hiding"
                        : flagAction === "unflag"
                        ? "showing"
                        : "deleting"
                    } this product...`}
                    rows={3}
                    className="mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>

                {flagAction === "flag" && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Flag Type *
                    </Label>
                    <select
                      value={flagType}
                      onChange={(e) =>
                        setFlagType(
                          e.target.value as
                            | "inappropriate"
                            | "copyright"
                            | "spam"
                            | "quality"
                            | "other"
                            | ""
                        )
                      }
                      className="mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-flyverr-primary/20 focus:border-flyverr-primary"
                      required
                    >
                      <option value="">Select flag type</option>
                      <option value="inappropriate">
                        Inappropriate Content
                      </option>
                      <option value="copyright">Copyright Issue</option>
                      <option value="spam">Spam</option>
                      <option value="quality">Quality Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowFlagModal(false)}
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleFlagProduct}
                    disabled={
                      !flagReason.trim() ||
                      (flagAction === "flag" && !flagType) ||
                      flagProductMutation.isPending
                    }
                    className={`${
                      flagAction === "delete"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : flagAction === "flag"
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {flagProductMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {flagAction === "delete"
                          ? "Deleting..."
                          : flagAction === "flag"
                          ? "Hiding..."
                          : "Showing..."}
                      </>
                    ) : (
                      <>
                        {flagAction === "delete" && (
                          <Trash2 className="w-4 h-4 mr-2" />
                        )}
                        {flagAction === "flag" && (
                          <Flag className="w-4 h-4 mr-2" />
                        )}
                        {flagAction === "unflag" && (
                          <Shield className="w-4 h-4 mr-2" />
                        )}
                        {flagAction === "delete"
                          ? "Delete Product"
                          : flagAction === "flag"
                          ? "Hide Product"
                          : "Show Product"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {/* Hot Deal Modal handled by component's internal state */}
      </div>
    </div>
  );
}
