"use client";

import React from "react";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Package, DollarSign, Calendar, Clock, X } from "lucide-react";
import type { InsuranceRecord } from "@/features/admin/insurance-track/insurance.types";

interface Props {
  record: InsuranceRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InsuranceRecordDetailModal({ record, isOpen, onClose }: Props) {
  if (!isOpen || !record) return null;

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString();
  };

  return (
    <Modal size="xl">
      <div className="w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-flyverr-neutral to-gray-50 dark:from-gray-800 dark:to-gray-700/50 rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Insurance Record Details</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">ID: {record.id}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-flyverr-primary dark:text-gray-400 dark:hover:text-flyverr-secondary">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* User */}
          <Card className="border-2 border-gray-100 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                User
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="text-gray-900 dark:text-white">{record.user?.firstName} {record.user?.lastName} (@{record.user?.username})</div>
              <div className="text-gray-600 dark:text-gray-400">{record.user?.email}</div>
              <div className="text-gray-600 dark:text-gray-400">Joined: {formatDate(record.user?.createdAt)}</div>
            </CardContent>
          </Card>

          {/* Product */}
          <Card className="border-2 border-gray-100 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-500" />
                Product
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-900 dark:text-white font-medium">{record.product?.title}</div>
                <div className="text-gray-600 dark:text-gray-400">Stage: {record.product?.currentStage} • Round {record.product?.currentRound}</div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-gray-900 dark:text-white">Original Price: {record.product?.originalPrice}</span>
              </div>
            </CardContent>
          </Card>

          {/* Insurance */}
          <Card className="border-2 border-gray-100 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Insurance Info
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-gray-600 dark:text-gray-400">Purchase Date</div>
                <div className="text-gray-900 dark:text-white">{formatDate(record.purchaseDate)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-600 dark:text-gray-400">Deadline</div>
                <div className="text-gray-900 dark:text-white">{formatDate(record.insuranceDeadline)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-600 dark:text-gray-400">Insurance Fee</div>
                <div className="text-green-600 dark:text-green-400 font-medium">${record.insuranceFee}</div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-600 dark:text-gray-400">Status</div>
                <div>
                  <Badge variant={record.isOverdue ? "destructive" : "secondary"} className="mr-2 text-xs">{record.insuranceStatus}</Badge>
                  {record.isOverdue && (
                    <Badge variant="destructive" className="text-xs">{record.daysOverdue}d overdue</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* License & Transaction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-2 border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">License</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-900 dark:text-white">
                {record.license ? (
                  <div className="space-y-1 text-gray-900 dark:text-white">
                    <div>Token: <span className="text-gray-600 dark:text-gray-400">{record.license.licenseToken}</span></div>
                    <div>Type: <span className="text-gray-600 dark:text-gray-400">{record.license.purchaseType}</span></div>
                    <div>Price: <span className="text-gray-600 dark:text-gray-400">${record.license.purchasePrice}</span></div>
                    <div>Created: <span className="text-gray-600 dark:text-gray-400">{formatDate(record.license.createdAt)}</span></div>
                  </div>
                ) : (
                  <div className="text-gray-600 dark:text-gray-400">No license information</div>
                )}
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Transaction</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                {record.transaction ? (
                  <div className="space-y-1 text-gray-900 dark:text-white">
                    <div>Amount: <span className="text-gray-600 dark:text-gray-400">${record.transaction.amount}</span></div>
                    <div>Fee: <span className="text-gray-600 dark:text-gray-400">${record.transaction.feeAmount}</span></div>
                    <div>Status: <span className="text-gray-600 dark:text-gray-400">{record.transaction.status}</span></div>
                    <div>Date: <span className="text-gray-600 dark:text-gray-400">{formatDate(record.transaction.createdAt)}</span></div>
                  </div>
                ) : (
                  <div className="text-gray-600 dark:text-gray-400">No transaction information</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Modal>
  );
}


