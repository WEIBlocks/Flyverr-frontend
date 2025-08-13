"use client";

import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Save, Camera, Shield, Loader2 } from "lucide-react";
import { useEditCurrentUser, useGetCurrentUser } from "@/features/auth/hooks";
import { useForm } from "react-hook-form";
import { isPlainObject } from "@/lib/utils";
import type { EditUserData } from "@/features/auth/auth.types";

// Skeleton Loading Component
const ProfileSkeleton = () => (
  <div className="p-6 space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Overview Card Skeleton */}
      <div className="lg:col-span-1">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              {/* Avatar Skeleton */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                {/* <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div> */}
              </div>

              {/* Name Skeleton */}
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-1"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-3"></div>

              {/* Badges Skeleton */}
              <div className="flex justify-center space-x-2 mb-4">
                <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                <div className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
              </div>

              {/* Member Since Skeleton */}
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Profile Form Skeleton */}
      <div className="lg:col-span-2 space-y-6">
        {/* Personal Information Skeleton */}
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-48"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-20"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-20"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-20"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-24"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-12"></div>
              <div className="h-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
          </CardContent>
          <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          </div>
        </Card>

        {/* Account Information Skeleton */}
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-40"></div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                >
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return <ProfileSkeleton />;
  }

  return <ProfileContent />;
}

function ProfileContent() {
  const [imageError, setImageError] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Only call hooks when mounted to prevent hydration issues
  const { data: user, isLoading, error, refetch } = useGetCurrentUser();
  const { updateProfile: updateUser, isUpdating } = useEditCurrentUser();

  // Handle dynamic error messages from API
  const getErrorMessage = (error: any) => {
    if (error?.response?.data?.errors) {
      // Handle array of validation errors

      const errors = error?.response?.data?.errors;
      if (Array.isArray(errors)) {
        return errors.join(", ");
      }
      console.log("errors", errors);

      return errors;
    }

    if (error?.response?.data?.message) {
      return error.response.data.message;
    }

    if (error?.message) {
      return error.message;
    }

    return "Failed to update profile. Please try again.";
  };

  // Clear errors when user starts typing
  const clearErrors = () => {
    setSubmissionError(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EditUserData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      bio: "",
    },
    mode: "onChange",
  });

  // Watch form values for real-time updates
  const watchedValues = watch();

  // Update form values when user data changes
  useEffect(() => {
    if (user && isPlainObject(user)) {
      setValue("firstName", user.first_name || "");
      setValue("lastName", user.last_name || "");
      setValue("username", user.username || "");
      setValue("bio", user.bio || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data: EditUserData) => {
    try {
      // Clear any previous submission errors
      setSubmissionError(null);

      // Create submission data excluding email (since it's read-only)
      // Handle empty bio - send null instead of empty string if bio is empty
      const submissionData = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        bio: data.bio?.trim() || null, // Send null if bio is empty or whitespace
      };

      console.log("Saving user data:", submissionData);

      await updateUser(submissionData, {
        onSuccess: (data) => {
          // Clear any submission errors on success
          console.log("data", data);
          setSubmissionError(null);
          // Set success state
          setIsSuccess(true);
          // Optionally refetch user data after update
          // setIsRefetching(true); // This line is removed

          // Clear success state after a few seconds
          setTimeout(() => setIsSuccess(false), 3000);
        },
        onError: (error) => {
          // Keep form open on error so user can fix and retry
          console.error("Failed to update profile:", error);
          setSubmissionError(getErrorMessage(error));
        },
      });
    } catch (error) {
      // If updateUser throws an error, keep form open
      console.error("Failed to update profile:", error);
      setSubmissionError(getErrorMessage(error));
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Handle file selection for profile image
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setSubmissionError("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmissionError("Image size must be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Clear any previous errors
      setSubmissionError(null);
    }
  };

  // Remove preview image
  const removePreviewImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle click on avatar to open file selection
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Default avatar fallback
  const getAvatarSrc = () => {
    if (previewImage) {
      return previewImage;
    }
    if (imageError || !user?.avatar_url) {
      return `https://ui-avatars.com/api/?name=${user?.first_name || ""}+${
        user?.last_name || ""
      }&background=6366f1&color=fff&size=150`;
    }
    return user.avatar_url;
  };

  // Loading state - Show skeleton instead of spinner
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Failed to load profile
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {error.message ||
                "Something went wrong while loading your profile"}
            </p>
            <Button
              onClick={() => refetch()}
              className="bg-flyverr-primary hover:bg-flyverr-primary/90"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No user data
  if (!user) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No user data found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Please log in again to access your profile
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account information and preferences
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Removed Edit Profile Button */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                {/* Avatar Section */}
                <div className="relative inline-block mb-4">
                  <div
                    className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg relative group cursor-pointer mx-auto"
                    onClick={handleAvatarClick}
                  >
                    <img
                      src={getAvatarSrc()}
                      alt={`${user?.first_name} ${user?.last_name}`}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      onLoad={() => setImageError(false)}
                    />

                    {/* Camera Icon Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* Simple Upload Button */}
                  <div className="mt-3">
                    <Button
                      onClick={handleAvatarClick}
                      variant="outline"
                      size="sm"
                      className="w-full bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>

                    {/* Remove Preview Button - Only show when there's a preview */}
                    {previewImage && (
                      <Button
                        onClick={removePreviewImage}
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Remove Preview
                      </Button>
                    )}
                  </div>

                  {/* Click to edit hint */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Click to change photo
                  </p>
                </div>

                {/* User Info */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {watchedValues.firstName} {watchedValues.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  @{watchedValues.username}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {user?.email}
                </p>

                {/* Badges */}
                <div className="flex justify-center space-x-2 mb-4">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                    <Shield className="w-3 h-3 mr-1" />
                    {user.status}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                    <User className="w-3 h-3 mr-1" />
                    {user.role}
                  </Badge>
                </div>

                {/* Member Since */}
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Member since{" "}
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Success Message Display */}
          {isSuccess && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                    Profile updated successfully!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Message Display */}
          {submissionError && (
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                    {submissionError}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Personal Information */}
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </Label>
                  <Input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    disabled={false}
                    onChange={(e) => {
                      register("firstName").onChange(e);
                      clearErrors();
                    }}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-700"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </Label>
                  <Input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    disabled={false}
                    onChange={(e) => {
                      register("lastName").onChange(e);
                      clearErrors();
                    }}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-700"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </Label>
                <Input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  disabled={false}
                  onChange={(e) => {
                    register("username").onChange(e);
                    clearErrors();
                  }}
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-700"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </Label>
                <Input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Email cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bio
                </Label>
                <Textarea
                  {...register("bio")}
                  disabled={false}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  onChange={(e) => {
                    register("bio").onChange(e);
                    clearErrors();
                  }}
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 resize-none"
                />
                {errors.bio && (
                  <p className="text-red-500 text-xs">{errors.bio.message}</p>
                )}
              </div>
            </CardContent>

            {/* Save Button */}
            <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={isUpdating}
                className={`w-full text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  submissionError
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-flyverr-primary hover:bg-flyverr-primary/90"
                }`}
              >
                {isUpdating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isUpdating
                  ? "Saving..."
                  : submissionError
                  ? "Retry Save"
                  : "Save Changes"}
              </Button>
            </div>
          </Card>

          {/* Account Information */}
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Account Status
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {user.status}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Email Verified
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {user.email_verified ? "Yes" : "No"}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Role
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {user.role}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Member Since
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
