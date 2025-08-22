"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  RefreshCw,
  ArrowLeft,
  Plus,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  User,
} from "lucide-react";
import { usePayoutInfo } from "@/features/user/payout/hooks/usePayoutInfo";
import { useUserPayouts } from "@/features/user/payout/hooks/useUserPayouts";
import {
  useCreatePayoutMethod,
  useRequestPayout,
} from "@/features/user/payout/hooks/usePayoutActions";
import { PayoutMethod, UserPayout } from "@/features/user/payout/payout.types";
import { useRouter } from "next/navigation";
import {
  AdminTable,
  AdminTableHeader,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
  AdminTableHeaderCell,
} from "@/components/ui/admin-table";
import Modal from "@/components/Modal";

export default function PayoutRequestsPage() {
  const router = useRouter();
  const [isAddMethodModalOpen, setIsAddMethodModalOpen] = useState(false);
  const [isRequestPayoutModalOpen, setIsRequestPayoutModalOpen] =
    useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [accountNote, setAccountNote] = useState("");
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutNotes, setPayoutNotes] = useState("");
  const [selectedPayoutMethodId, setSelectedPayoutMethodId] = useState("");

  const {
    data: payoutInfoData,
    isLoading: isPayoutInfoLoading,
    error: payoutInfoError,
    refetch: refetchPayoutInfo,
  } = usePayoutInfo();
  const {
    data: userPayoutsData,
    isLoading: isUserPayoutsLoading,
    error: userPayoutsError,
    refetch: refetchUserPayouts,
  } = useUserPayouts();

  const createPayoutMethodMutation = useCreatePayoutMethod();
  const requestPayoutMutation = useRequestPayout();

  const payoutInfo = payoutInfoData?.data;
  const userPayouts = userPayoutsData?.data || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "processing":
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleAddPayoutMethod = async () => {
    if (!accountNote.trim()) return;

    try {
      await createPayoutMethodMutation.mutateAsync({
        payment_method: paymentMethod,
        account_details: { note: accountNote },
      });

      setIsAddMethodModalOpen(false);
      setPaymentMethod("bank");
      setAccountNote("");
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleRequestPayout = async () => {
    if (!payoutAmount || !selectedPayoutMethodId || !payoutNotes.trim()) return;

    try {
      await requestPayoutMutation.mutateAsync({
        amount: parseFloat(payoutAmount),
        payout_info_id: selectedPayoutMethodId,
        notes: payoutNotes,
      });

      setIsRequestPayoutModalOpen(false);
      setPayoutAmount("");
      setPayoutNotes("");
      setSelectedPayoutMethodId("");
    } catch (error) {
      // Error handled by mutation
    }
  };

  const refetchAll = () => {
    refetchPayoutInfo();
    refetchUserPayouts();
  };

  if (payoutInfoError || userPayoutsError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Error loading payout data
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Something went wrong while fetching your payout information.
          </p>
          <Button
            onClick={refetchAll}
            className="bg-flyverr-primary hover:bg-flyverr-primary/90"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="border-gray-300 dark:border-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Payout Requests
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your payout methods and request withdrawals
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={refetchAll}
            variant="outline"
            className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${
                isPayoutInfoLoading || isUserPayoutsLoading
                  ? "animate-spin"
                  : ""
              }`}
            />
            Refresh
          </Button>
          <Button
            onClick={() => setIsRequestPayoutModalOpen(true)}
            className="bg-flyverr-primary hover:bg-flyverr-primary/90"
            disabled={!payoutInfo?.summary.hasActivePayoutMethod}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Request Payout
          </Button>
        </div>
      </div>

      {/* Payout Methods Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Bank Account
          </h2>
          <Button
            onClick={() => setIsAddMethodModalOpen(true)}
            variant="outline"
            className="flex items-center space-x-2"
            disabled={payoutInfo?.payoutMethods.all.length >= 1}
          >
            <Plus className="w-4 h-4" />
            <span>Add Bank Account</span>
          </Button>
        </div>

        {isPayoutInfoLoading ? (
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ) : payoutInfo?.payoutMethods.all.length === 0 ? (
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-12 text-center">
              <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No bank account added
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Add your bank account details to start requesting withdrawals
              </p>
              <Button
                onClick={() => setIsAddMethodModalOpen(true)}
                className="bg-flyverr-primary hover:bg-flyverr-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Bank Account
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payoutInfo?.payoutMethods.all.map((method: PayoutMethod) => (
              <Card
                key={method.id}
                className="border-0 shadow-lg bg-white dark:bg-gray-800"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {method.payment_method}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {method.is_active && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Active
                        </span>
                      )}
                      {method.is_verified ? (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Unverified
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <strong>Note:</strong>{" "}
                      {method.account_details.note || "No note provided"}
                    </p>
                    <p className="mt-2">
                      <strong>Added:</strong> {formatDate(method.created_at)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Payout Requests History */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Payout History
        </h2>

        <AdminTable>
          <AdminTableHeader>
            <tr>
              <AdminTableHeaderCell>Amount</AdminTableHeaderCell>
              <AdminTableHeaderCell>Status</AdminTableHeaderCell>
              <AdminTableHeaderCell>Request Date</AdminTableHeaderCell>
              <AdminTableHeaderCell>Processed Date</AdminTableHeaderCell>
              <AdminTableHeaderCell>Notes</AdminTableHeaderCell>
            </tr>
          </AdminTableHeader>
          <AdminTableBody>
            {isUserPayoutsLoading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <AdminTableRow key={index}>
                  {[...Array(5)].map((_, i) => (
                    <AdminTableCell key={i}>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                    </AdminTableCell>
                  ))}
                </AdminTableRow>
              ))
            ) : userPayouts.length === 0 ? (
              <AdminTableRow>
                <AdminTableCell colSpan={5}>
                  <div className="text-center py-12">
                    <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      No payout requests yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                      Your payout requests will appear here once you submit them
                    </p>
                  </div>
                </AdminTableCell>
              </AdminTableRow>
            ) : (
              userPayouts.map((payout: UserPayout) => (
                <AdminTableRow key={payout.id}>
                  {/* Amount */}
                  <AdminTableCell>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(payout.amount)}
                    </span>
                  </AdminTableCell>

                  {/* Status */}
                  <AdminTableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payout.status)}
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          payout.status
                        )}`}
                      >
                        {payout.status}
                      </span>
                    </div>
                  </AdminTableCell>

                  {/* Request Date */}
                  <AdminTableCell>
                    <span className="text-gray-500 dark:text-gray-400">
                      {formatDate(payout.request_date)}
                    </span>
                  </AdminTableCell>

                  {/* Processed Date */}
                  <AdminTableCell>
                    <span className="text-gray-500 dark:text-gray-400">
                      {formatDate(payout.processed_date)}
                    </span>
                  </AdminTableCell>

                  {/* Notes */}
                  <AdminTableCell>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {payout.notes || "-"}
                    </span>
                  </AdminTableCell>
                </AdminTableRow>
              ))
            )}
          </AdminTableBody>
        </AdminTable>
      </div>

      {/* Add Payout Method Modal */}
      {isAddMethodModalOpen && (
        <Modal size="lg">
          <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add Bank Account
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddMethodModalOpen(false)}
                className="border-gray-300 dark:border-gray-600"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Method
                </label>
                <Input
                  type="text"
                  value={paymentMethod}
                  readOnly
                  className="w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Only bank accounts are supported at this time
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bank Account Details
                </label>
                <Textarea
                  placeholder="Enter your bank account details (account number, routing number, bank name, etc.)"
                  value={accountNote}
                  onChange={(e) => setAccountNote(e.target.value)}
                  className="w-full"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddMethodModalOpen(false)}
                  disabled={createPayoutMethodMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddPayoutMethod}
                  disabled={
                    !accountNote.trim() || createPayoutMethodMutation.isPending
                  }
                  className="bg-flyverr-primary hover:bg-flyverr-primary/90"
                >
                  {createPayoutMethodMutation.isPending && (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Add Bank Account
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Request Payout Modal */}
      {isRequestPayoutModalOpen && (
        <Modal size="lg">
          <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Request Payout
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRequestPayoutModalOpen(false)}
                className="border-gray-300 dark:border-gray-600"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount (USD)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payout Method
                </label>
                <select
                  value={selectedPayoutMethodId}
                  onChange={(e) => setSelectedPayoutMethodId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select payout method</option>
                  {payoutInfo?.payoutMethods.active.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.payment_method} - {method.account_details.note}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes
                </label>
                <Textarea
                  placeholder="Add any notes for this payout request"
                  value={payoutNotes}
                  onChange={(e) => setPayoutNotes(e.target.value)}
                  className="w-full"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsRequestPayoutModalOpen(false)}
                  disabled={requestPayoutMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRequestPayout}
                  disabled={
                    !payoutAmount ||
                    !selectedPayoutMethodId ||
                    !payoutNotes.trim() ||
                    requestPayoutMutation.isPending
                  }
                  className="bg-flyverr-primary hover:bg-flyverr-primary/90"
                >
                  {requestPayoutMutation.isPending && (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Submit Request
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
