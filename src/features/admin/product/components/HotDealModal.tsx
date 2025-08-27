"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/Modal";
import { TrendingUp } from "lucide-react";
import { useMarkProductAsHotDeal } from "@/features/admin/product/hooks/useMarkProudctasHotDeal";
import toast from "react-hot-toast";

type Props = {
  productId: string;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
  buttonLabel?: string;
  buttonClassName?: string;
  disabled?: boolean;
};

const hotDealSchema = yup.object({
  dealName: yup
    .string()
    .required("Deal name is required")
    .max(100, "Must be at most 100 characters"),
  dealDescription: yup.string().nullable().transform((v) => v ?? undefined),
  startDate: yup.string().nullable().transform((v) => v ?? undefined),
  endDate: yup
    .string()
    .nullable()
    .transform((v) => v ?? undefined)
    .test("after-start", "End date must be after start date", function (value) {
      const { startDate } = this.parent as { startDate?: string };
      if (!value || !startDate) return true;
      return new Date(value).getTime() > new Date(startDate).getTime();
    }),
  isActive: yup.boolean().default(true),
  priority: yup
    .number()
    .transform((v) => (Number.isNaN(v) ? undefined : v))
    .integer("Must be an integer")
    .min(0, "Min 0")
    .max(100, "Max 100")
    .default(0),
});

type HotDealFormData = {
  dealName: string;
  dealDescription: string | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  priority: number;
};

export default function HotDealModal({ productId, onSuccess, trigger, buttonLabel = "Mark Hot Deal", buttonClassName = "border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20 shadow-sm", disabled = false }: Props) {
  const [open, setOpen] = useState(false);
  const markHotDealMutation = useMarkProductAsHotDeal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HotDealFormData>({
    resolver: yupResolver(hotDealSchema) as any,
    defaultValues: {
      dealName: "",
      dealDescription: null,
      startDate: null,
      endDate: null,
      isActive: true,
      priority: 0,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await markHotDealMutation.mutateAsync({
        data: {
          productId,
          dealType: "hot_deals",
          dealName: values.dealName.trim(),
          dealDescription: values.dealDescription?.trim() || undefined,
          startDate: values.startDate ? new Date(values.startDate).toISOString() : undefined,
          endDate: values.endDate ? new Date(values.endDate).toISOString() : undefined,
          isActive: values.isActive ?? true,
          priority: typeof values.priority === "number" ? values.priority : 0,
        },
      });
      toast.success("Hot deal created successfully");
      reset();
      onSuccess?.();
      setOpen(false);
    } catch (err) {
      toast.error("Failed to create deal");
    }
  });

  return (
    <>
      {trigger ? (
        <div onClick={() => !disabled && setOpen(true)}>{trigger}</div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          disabled={disabled}
          className={buttonClassName}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          {buttonLabel}
        </Button>
      )}

      {open && (
    <Modal size="md">
      <div className="p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mark as Hot Deal</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Deal Name *</Label>
            <Input
              {...register("dealName")}
              placeholder="Summer Mega Sale"
              className="mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
            {errors.dealName && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">{String(errors.dealName.message)}</p>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</Label>
            <Textarea
              {...register("dealDescription")}
              placeholder="Exclusive summer deal with up to 50% discount"
              rows={3}
              className="mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
            {errors.dealDescription && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">{String(errors.dealDescription.message)}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</Label>
              <Input
                type="date"
                {...register("startDate")}
                className="mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">End Date</Label>
              <Input
                type="date"
                {...register("endDate")}
                className="mt-1 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
              />
              {errors.endDate && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{String(errors.endDate.message)}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                {...register("isActive")}
                className="h-4 w-4 rounded border-gray-300 text-flyverr-primary focus:ring-flyverr-primary"
              />
              Active
            </label>
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority (0-100)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                {...register("priority")}
                className="mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
              {errors.priority && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{String(errors.priority.message)}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={markHotDealMutation.isPending}
              className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {markHotDealMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Create Deal
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
      )}
    </>
  );
}


