"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Save,
  Eye,
  Download,
  Calendar,
  User,
  Package,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Upload,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Tag,
  Info,
  X,
} from "lucide-react";
import { useGetProductById } from "@/features/user/product/hooks/useGetProductById";
import { useUpdateProduct } from "@/features/user/product/hooks/useUpdateProduct";
import { Product } from "@/features/user/product/product.types";

import { ErrorAlert } from "@/components/ui/error-alert";

// ProductImage Component with loading and error handling
const ProductImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [imageState, setImageState] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageLoad = () => {
    setImageState("loaded");
  };

  const handleImageError = () => {
    setImageState("error");
    setImageSrc("/api/placeholder/150/150"); // Fallback to placeholder API or default image
  };

  // Default placeholder image (you can replace this with your own default image)
  const defaultImage = (
    <div
      className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-600`}
    >
      <ImageIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
    </div>
  );

  if (imageState === "error") {
    return defaultImage;
  }

  return (
    <>
      {imageState === "loading" && (
        <div
          className={`${className} bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center`}
        >
          <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-flyverr-primary rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${
          imageState === "loading" ? "hidden" : "block"
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  );
};

import {
  formatDate,
  formatFileSize,
  getStatusColor,
  getStatusIcon,
  getFileTypeIcon,
} from "@/lib/productUtils";
import { swal } from "@/lib/utils";
import { createUserFriendlyError } from "@/lib/errorUtils";

export default function ProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const { data: productData, isLoading, error } = useGetProductById(productId);
  const product = productData?.data?.product;

  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    originalPrice: 0,
    totalLicenses: 0,
  });

  // File state
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [mainFile, setMainFile] = useState<File | null>(null);

  // Error state
  const [apiError, setApiError] = useState<any>(null);

  // Initialize form data when product loads
  React.useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        originalPrice: product.original_price || 0,
        totalLicenses: product.total_licenses || 0,
      });
    }
  }, [product]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const handleMainFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainFile(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeMainFile = () => {
    setMainFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!thumbnailFile) {
      setApiError({ message: "Thumbnail is required" });
      return;
    }

    if (imageFiles.length === 0) {
      setApiError({ message: "At least one product image is required" });
      return;
    }

    if (!mainFile) {
      setApiError({ message: "Digital product file is required" });
      return;
    }

    if (!product) {
      setApiError({ message: "Product not found" });
      return;
    }

    // For now, we'll use placeholder URLs since we need to handle file uploads properly
    // In a real implementation, you'd upload files first and get URLs back
    const productData: Product = {
      title: formData.title,
      description: formData.description,
      thumbnailUrl: product.thumbnail_url, // Keep existing for now
      imagesUrls: [], // Keep existing for now
      fileUrl: "", // Keep existing for now
      fileType: product.file_type, // Keep existing for now
      fileSize: product.file_size || 0, // Keep existing for now
      originalPrice: formData.originalPrice.toString(),
      totalLicenses: formData.totalLicenses.toString(),
    };

    updateProduct(
      { id: productId, product: productData },
      {
        onSuccess: () => {
          swal("Success", "Product updated successfully!", "success", () => {
            router.push("/user/products");
          });
        },
        onError: (error: any) => {
          setApiError(error);
          swal("Error", createUserFriendlyError(error), "error");
        },
      }
    );
  };

  const handleBack = () => {
    router.back();
  };

  const handleViewMode = () => {
    router.push(`/user/products/${productId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error?.message ||
              "The product you're looking for doesn't exist or you don't have access to it."}
          </p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Product
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update your product information
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            onClick={handleViewMode}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Mode
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white"
          >
            {isUpdating ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isUpdating ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Product Title *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter product title"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Enter product description"
                    className="mt-1"
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Licenses */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Pricing & Licenses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="price"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Price *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        handleInputChange(
                          "originalPrice",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="0.00"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="licenses"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Total Licenses *
                    </Label>
                    <Input
                      id="licenses"
                      type="number"
                      min="1"
                      value={formData.totalLicenses}
                      onChange={(e) =>
                        handleInputChange(
                          "totalLicenses",
                          parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="1"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Upload */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Product Thumbnail *
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label
                    htmlFor="thumbnail"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Upload Thumbnail
                  </Label>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="mt-1"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    This will be the main image displayed for your product
                  </p>
                </div>

                {thumbnailFile && (
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(thumbnailFile)}
                      alt="Thumbnail preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                    <Button
                      type="button"
                      onClick={removeThumbnail}
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Product Images *
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label
                    htmlFor="images"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Upload Images
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesUpload}
                    className="mt-1"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Upload multiple images to showcase your product
                  </p>
                </div>

                {imageFiles.length > 0 && (
                  <div className="grid grid-cols-4 gap-4">
                    {imageFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                        />
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-5 h-5 p-0 rounded-full"
                        >
                          <X className="w-2.5 h-2.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Digital Product File */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Digital Product File *
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label
                    htmlFor="mainFile"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Upload File
                  </Label>
                  <Input
                    id="mainFile"
                    type="file"
                    onChange={handleMainFileUpload}
                    className="mt-1"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PDF, MP4, PNG, JPG, ZIP files accepted
                  </p>
                </div>

                {mainFile && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {mainFile.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(mainFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={removeMainFile}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Status */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Current Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </span>
                  <Badge
                    className={`${getStatusColor(
                      product.status
                    )} font-medium flex items-center gap-1`}
                  >
                    {getStatusIcon(product.status)}
                    {product.status.charAt(0).toUpperCase() +
                      product.status.slice(1)}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Current Stage
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {product.current_stage}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Round
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {product.current_round}
                  </span>
                </div>

                {product.featured && (
                  <div className="flex items-center justify-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                    <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Featured Product
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Creator Information */}
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Creator Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-flyverr-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-flyverr-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {product.creator.first_name} {product.creator.last_name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{product.creator.username}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {product.creator.email}
                </div>
              </CardContent>
            </Card>

            {/* Admin Notes */}
            {product.admin_notes && (
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-500" />
                    Admin Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {product.admin_notes}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {apiError && <ErrorAlert error={apiError} />}
      </form>
    </div>
  );
}
