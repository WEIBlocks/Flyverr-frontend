"use client";

import React, { useState, useRef } from "react";
import { Upload, ImageIcon, AlertCircle, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorAlert } from "@/components/ui/error-alert";
import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateProduct } from "@/features/user/product/hooks/useCreateProduct";
import { useGetProductCategory } from "@/features/user/product/hooks/useGetProductCategory";
import toast from "react-hot-toast";
import { uploadMultipleImages, uploadToStorage } from "@/lib/upload";
import { useAuth } from "@/contexts/AuthContext";
import type { Product } from "@/features/user/product/product.types";
import { supabase } from "@/lib/supabase";

export interface NewProduct {
  title: string;
  description: string;
  categoryId: string;
  thumbnailUrl: string;
  imagesUrls: string[];
  fileUrl: string;
  fileType: string;
  fileSize: number;
  originalPrice: string;
  totalLicenses: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Yup validation schema
const productSchema = yup.object({
  title: yup
    .string()
    .required("Product title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  categoryId: yup.string().required("Category is required"),
  originalPrice: yup
    .string()
    .required("Price is required")
    .matches(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
  totalLicenses: yup
    .string()
    .required("Total licenses is required")
    .matches(/^\d+$/, "Must be a valid number"),
  thumbnailUrl: yup.string().required("Thumbnail is required"),
  imagesUrls: yup
    .array()
    .of(yup.string().required())
    .min(2, "At least 2 additional images are required")
    .required(),
  fileUrl: yup.string().required("Digital product file is required"), // Always required for now
  fileType: yup.string().required("File type is required"), // Always required for now
  fileSize: yup.number().required("File size is required"), // Always required for now
});

export default function AddProductModal({
  isOpen,
  onClose,
}: AddProductModalProps) {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [apiError, setApiError] = useState<unknown>(null);
  const { user } = useAuth();

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createProduct, isPending } = useCreateProduct();
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetProductCategory();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    clearErrors,
    setError,
  } = useForm<NewProduct>({
    resolver: yupResolver(productSchema) as Resolver<NewProduct>,
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      thumbnailUrl: "",
      imagesUrls: [],
      fileUrl: "",
      fileType: "",
      fileSize: 0,
      originalPrice: "",
      totalLicenses: "1",
    },
  });

  // const watchedCategoryId = watch("categoryId"); // Commented out for now

  const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      // In a real app, you'd upload this to your storage service
      // For now, we'll create a temporary URL
      const tempUrl = URL.createObjectURL(file);
      setValue("thumbnailUrl", tempUrl);
      // Clear the validation error
      if (errors.thumbnailUrl) {
        clearErrors("thumbnailUrl");
      }
    }
  };

  const handleImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setImageFiles((prev) => [...prev, ...files]);
      // In a real app, you'd upload these to your storage service
      // For now, we'll create temporary URLs
      const tempUrls = files.map((file) => URL.createObjectURL(file));
      const currentUrls = watch("imagesUrls");
      const newUrls = [...currentUrls, ...tempUrls];
      setValue("imagesUrls", newUrls);
      // Clear the validation error if we have enough images
      if (newUrls.length >= 2 && errors.imagesUrls) {
        clearErrors("imagesUrls");
      }
    }
  };

  const handleMainFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMainFile(file);
      // In a real app, you'd upload this to your storage service
      // For now, we'll create a temporary URL
      const tempUrl = URL.createObjectURL(file);
      setValue("fileUrl", tempUrl);
      setValue("fileType", file.type || file.name.split(".").pop() || "");
      setValue("fileSize", file.size);
      // Clear the validation errors
      if (errors.fileUrl) clearErrors("fileUrl");
      if (errors.fileType) clearErrors("fileType");
      if (errors.fileSize) clearErrors("fileSize");
    }
  };

  const removeImage = (index: number) => {
    const newImages = watch("imagesUrls").filter((_, i) => i !== index);
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);
    setValue("imagesUrls", newImages);
    // Show validation error if we don't have enough images
    if (newImages.length < 2) {
      setError("imagesUrls", {
        message: "At least 2 additional images are required",
      });
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setValue("thumbnailUrl", "");
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
    // Show validation error
    setError("thumbnailUrl", { message: "Thumbnail is required" });
  };

  const removeMainFile = () => {
    setMainFile(null);
    setValue("fileUrl", "");
    setValue("fileType", "");
    setValue("fileSize", 0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Show validation errors since file is always required for now
    setError("fileUrl", { message: "Digital product file is required" });
    setError("fileType", { message: "File type is required" });
    setError("fileSize", { message: "File size is required" });
  };

  const onSubmit = async (data: NewProduct) => {
    // Clear any previous API errors
    setApiError(null);

    // Validate that required files are uploaded
    if (!thumbnailFile) {
      toast.error("Please upload a thumbnail image");
      return;
    }

    if (imageFiles.length < 2) {
      toast.error("Please upload at least 2 additional product images");
      return;
    }

    // Main file is always required for now
    if (!mainFile) {
      toast.error("Please upload a digital product file");
      return;
    }

    const dismiss = toast.loading("Uploading assets...");
    try {
      // Prefer Supabase Auth user id for RLS policies
      const { data: authData } = await supabase.auth.getUser();
      const supabaseUserId = authData?.user?.id;
      const pathUserId = supabaseUserId || user?.id;
      // Upload assets in parallel
      const [thumb, images, file] = await Promise.all([
        uploadToStorage("thumbnails", thumbnailFile, pathUserId),
        uploadMultipleImages(imageFiles, pathUserId),
        uploadToStorage("files", mainFile, pathUserId),
      ]);

      const payload = {
        ...data,
        thumbnailUrl: thumb.url || "",
        imagesUrls: images.map((i) => i.url || "").filter(Boolean),
        fileUrl: file.path, // store storage path; backend will create signed URL for downloads
        fileType: mainFile.type || data.fileType,
        fileSize: mainFile.size || data.fileSize,
      };

      toast.dismiss(dismiss);
      createProduct(payload as Product, {
        onSuccess: () => {
          toast.success("Product submitted for review successfully!");
          handleClose();
        },
        onError: (error: unknown) => {
          setApiError(error);
          toast.error(
            "Failed to create product. Please check the errors below."
          );
        },
      });
    } catch (err: unknown) {
      toast.dismiss(dismiss);
      const message =
        err instanceof Error ? err.message : "Failed to upload assets";
      setApiError(err);
      toast.error(message);
    }
  };

  const handleClose = () => {
    reset();
    setThumbnailFile(null);
    setImageFiles([]);
    setMainFile(null);
    setApiError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal size="lg">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Add New Product
          </h2>
          <p className="text-muted-foreground mt-2">
            Upload your digital product and set up your listing
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="space-y-6"
        >
          {/* Product Details */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Product Title *
            </Label>
            <Input
              {...register("title")}
              placeholder="Enter product title"
              className="border-border text-foreground placeholder:text-muted-foreground"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Category *
            </Label>
            {isCategoriesLoading ? (
              <div className="w-full px-3 py-2 border border-border rounded-md bg-muted/50 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-flyverr-primary"></div>
                  <span>Loading categories...</span>
                </div>
              </div>
            ) : isCategoriesError ? (
              <div className="w-full px-3 py-2 border border-red-200 rounded-md bg-red-50 text-red-600">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Failed to load categories. Please try again.</span>
                </div>
              </div>
            ) : (
              <select
                {...register("categoryId")}
                className="w-full bg-white dark:bg-gray-800 px-3 py-2 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-flyverr-primary focus:border-transparent [&>option]:[&>option]:text-foreground"
              >
                <option value="">Select a category</option>
                {categoriesData?.data?.categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
            {errors.categoryId && (
              <p className="text-sm text-destructive">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Description *
            </Label>
            <Textarea
              {...register("description")}
              placeholder="Describe your product..."
              rows={4}
              className="border-border text-foreground placeholder:text-muted-foreground resize-none"
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Price ($) *
              </Label>
              <Input
                {...register("originalPrice")}
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                className="border-border text-foreground placeholder:text-muted-foreground"
              />
              {errors.originalPrice && (
                <p className="text-sm text-destructive">
                  {errors.originalPrice.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Total Licenses *
              </Label>
              <Input
                {...register("totalLicenses")}
                type="number"
                placeholder="1"
                min="1"
                max="1000"
                className="border-border text-foreground placeholder:text-muted-foreground"
              />
              {errors.totalLicenses && (
                <p className="text-sm text-destructive">
                  {errors.totalLicenses.message}
                </p>
              )}
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Thumbnail Image *
            </Label>
            {thumbnailFile ? (
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={URL.createObjectURL(thumbnailFile)}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {thumbnailFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(thumbnailFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeThumbnail}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-flyverr-primary transition-colors duration-200 bg-muted/50 cursor-pointer"
                onClick={() => thumbnailInputRef.current?.click()}
              >
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Drop your thumbnail here, or{" "}
                    <span className="text-flyverr-primary font-medium cursor-pointer hover:underline">
                      browse
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 5MB (Recommended: 800x600)
                  </p>
                </div>
              </div>
            )}
            <input
              ref={thumbnailInputRef}
              type="file"
              onChange={handleThumbnailUpload}
              accept="image/*"
              className="hidden"
            />
            {errors.thumbnailUrl && (
              <p className="text-sm text-destructive">
                {errors.thumbnailUrl.message}
              </p>
            )}
          </div>

          {/* Additional Images Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Additional Images *
            </Label>
            {imageFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
                {imageFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative border border-border rounded-lg p-3 bg-muted/50 group"
                  >
                    <div className="w-full h-24 rounded-lg overflow-hidden bg-muted mb-2">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-foreground truncate mb-1">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 h-6 w-6 p-0 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div
              className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-flyverr-primary transition-colors duration-200 bg-muted/50 cursor-pointer"
              onClick={() => imagesInputRef.current?.click()}
            >
              <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
              <div className="mt-3">
                <p className="text-sm text-muted-foreground">
                  Drop additional images here, or{" "}
                  <span className="text-flyverr-primary font-medium cursor-pointer hover:underline">
                    browse
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 5MB each • At least 2 images required
                </p>
              </div>
            </div>
            <input
              ref={imagesInputRef}
              type="file"
              onChange={handleImagesUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
            {errors.imagesUrls && (
              <p className="text-sm text-destructive">
                {errors.imagesUrls.message}
              </p>
            )}
          </div>

          {/* Main File Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Digital Product File *
            </Label>
            {mainFile ? (
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-flyverr-primary/20 rounded-lg flex items-center justify-center">
                      {mainFile.type.startsWith("image/") ? (
                        <ImageIcon className="h-6 w-6 text-flyverr-primary" />
                      ) : mainFile.type.includes("pdf") ? (
                        <FileText className="h-6 w-6 text-flyverr-primary" />
                      ) : mainFile.type.includes("zip") ||
                        mainFile.type.includes("rar") ? (
                        <div className="text-flyverr-primary font-bold text-lg">
                          📦
                        </div>
                      ) : mainFile.type.includes("video/") ? (
                        <div className="text-flyverr-primary font-bold text-lg">
                          🎥
                        </div>
                      ) : (
                        <FileText className="h-6 w-6 text-flyverr-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {mainFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(mainFile.size / 1024 / 1024).toFixed(2)} MB •{" "}
                        {mainFile.type || "Unknown type"}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeMainFile}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-flyverr-primary transition-colors duration-200 bg-muted/50 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Drop your file here, or{" "}
                    <span className="text-flyverr-primary font-medium cursor-pointer hover:underline">
                      browse
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, MP4, PNG, JPG, ZIP files accepted
                  </p>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleMainFileUpload}
              accept=".pdf,.zip,.mp4,.png,.jpg,.jpeg"
              className="hidden"
            />
            {errors.fileUrl && (
              <p className="text-sm text-destructive">
                {errors.fileUrl.message}
              </p>
            )}
          </div>

          {/* Admin Approval Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Admin Approval Required
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Your product will be reviewed by our team within 24-48 hours.
                  You'll be notified once it's approved and live on the
                  marketplace.
                </p>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          <ErrorAlert
            error={apiError}
            errors={Object.keys(errors).length > 0 ? errors : undefined}
            title="Please fix the following errors:"
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1  border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-flyverr-primary hover:bg-flyverr-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
