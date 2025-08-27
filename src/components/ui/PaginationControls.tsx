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
        "flex flex-col items-stretch justify-center sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-4 bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-5 rounded-lg border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {/* Left side: page size + total */}
      <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto min-w-0 gap-2 sm:gap-3 md:gap-4 flex-wrap">
        <span className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">Show:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          className="border border-gray-300 dark:border-gray-600 rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm md:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full sm:w-auto"
          disabled={disabled || !onPageSizeChange}
        >
          {[10, 20, 50, 100].map((n) => (
            <option key={n} value={n} className="text-gray-900">
              {n}
            </option>
          ))}
        </select>
        <span className="hidden md:inline text-sm md:text-base text-gray-600 dark:text-gray-400">
          of {totalCount} {entityLabel}
        </span>
        <span className="hidden sm:inline md:hidden text-sm text-gray-600 dark:text-gray-400">
          of {totalCount} {entityLabel}
        </span>
        <span className="sm:hidden text-xs text-gray-600 dark:text-gray-400">
          {totalCount} total
        </span>
      </div>

      {/* Right side: pager */}
      <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto gap-1 sm:gap-2 md:gap-3 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={handleFirst}
          disabled={currentPage === 1 || disabled}
          className="p-1.5 sm:p-2 md:p-2.5"
        >
          <ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={currentPage === 1 || disabled}
          className="p-1.5 sm:p-2 md:p-2.5"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </Button>
        <span className="hidden lg:inline text-sm md:text-base text-gray-600 dark:text-gray-400 px-2 sm:px-3 md:px-4">
          Page {currentPage} of {Math.max(totalPages || 1, 1)}
        </span>
        <span className="hidden sm:inline lg:hidden text-sm text-gray-600 dark:text-gray-400 px-2 sm:px-3">
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
          className="p-1.5 sm:p-2 md:p-2.5"
        >
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLast}
          disabled={currentPage >= totalPages || disabled}
          className="p-1.5 sm:p-2 md:p-2.5"
        >
          <ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </Button>
      </div>
    </div>
  );
}


