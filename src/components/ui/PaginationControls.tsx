"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  disabled?: boolean;
  entityLabel?: string;
  className?: string;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  disabled = false,
  entityLabel = "items",
  className,
}: PaginationControlsProps) {
  const handleFirst = () => onPageChange(1);
  const handlePrev = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));
  const handleLast = () => onPageChange(totalPages);

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {/* Left side: page size + total */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Show:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          disabled={disabled || !onPageSizeChange}
        >
          {[10, 20, 50, 100].map((n) => (
            <option key={n} value={n} className="text-gray-900">
              {n}
            </option>
          ))}
        </select>
        <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400">
          of {totalCount} {entityLabel}
        </span>
        <span className="sm:hidden text-xs text-gray-600 dark:text-gray-400">
          {totalCount} total
        </span>
      </div>

      {/* Right side: pager */}
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={handleFirst}
          disabled={currentPage === 1 || disabled}
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={currentPage === 1 || disabled}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400 px-3">
          Page {currentPage} of {Math.max(totalPages || 1, 1)}
        </span>
        <span className="sm:hidden text-xs text-gray-600 dark:text-gray-400 px-2">
          Pg {currentPage}/{Math.max(totalPages || 1, 1)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage >= totalPages || disabled}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLast}
          disabled={currentPage >= totalPages || disabled}
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}


