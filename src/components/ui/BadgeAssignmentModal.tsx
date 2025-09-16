"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/Modal";
import { Shield, CheckCircle, AlertTriangle, X } from "lucide-react";

interface BadgeAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  userName: string;
  badgeType: "reseller" | "creator";
}

export default function BadgeAssignmentModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  userName,
  badgeType,
}: BadgeAssignmentModalProps) {
  const getBadgeInfo = () => {
    if (badgeType === "reseller") {
      return {
        name: "Verified Reseller",
        description: "Allows user to create and list products for sale",
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
        icon: Shield,
        requirements: "Admin assignment - no spending required",
      };
    } else {
      return {
        name: "Verified Creator",
        description: "Recognizes user's product creation capabilities",
        color:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
        icon: CheckCircle,
        requirements: "Admin assignment - no spending required",
      };
    }
  };

  const badgeInfo = getBadgeInfo();
  const IconComponent = badgeInfo.icon;

  if (!isOpen) return null;

  return (
    <Modal size="md">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IconComponent className="w-5 h-5 text-flyverr-primary" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Assign Badge
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          You are about to assign a verified badge to{" "}
          <strong>{userName}</strong>.
        </p>

        <div className="space-y-4">
          {/* Badge Preview */}
          <div className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-center">
              <div
                className="w-20 h-20 mx-auto mb-3 rounded-xl flex items-center justify-center shadow-lg border-2"
                style={{
                  backgroundColor: badgeInfo.color.includes("blue")
                    ? "#3B82F6"
                    : "#10B981",
                  borderColor: badgeInfo.color.includes("blue")
                    ? "#3B82F6"
                    : "#10B981",
                }}
              >
                <IconComponent className="w-12 h-12 text-white" />
              </div>
              <Badge className={`${badgeInfo.color} text-sm px-4 py-2`}>
                <IconComponent className="w-4 h-4 mr-2" />
                {badgeInfo.name}
              </Badge>
            </div>
          </div>

          {/* Badge Details */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-900 dark:text-white">
              Badge Details:
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {badgeInfo.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              <strong>Requirements:</strong> {badgeInfo.requirements}
            </p>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This badge will be assigned immediately and
              the user will gain access to create products (for reseller badge)
              or be recognized as a verified creator.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto bg-flyverr-primary hover:bg-flyverr-primary/90 text-white"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Assigning...
              </>
            ) : (
              <>
                <IconComponent className="w-4 h-4 mr-2" />
                Assign Badge
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
