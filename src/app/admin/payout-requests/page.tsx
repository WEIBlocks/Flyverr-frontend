"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AdminTable,
  AdminTableHeader,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
  AdminTableHeaderCell,
} from "@/components/ui/admin-table";
import Modal from "@/components/Modal";
import {
  DollarSign,
  Calendar,
  User,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  BarChart3,
  Filter,
  Download,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  MessageSquare,
  CreditCard,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";
import { useGetPayouts } from "@/features/admin/payout/hooks/useGetPayouts";
import {
  useApprovePayout,
  useRejectPayout,
  useRetryPayout,
} from "@/features/admin/payout/hooks/usePayoutActions";
import { Payout } from "@/features/admin/payout/payout.types";

export default function AdminPayoutRequestsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [actionType, setActionType] = useState<
    "approve" | "reject" | "retry" | null
  >(null);
  const [approvedAmount, setApprovedAmount] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);

  const { data, isLoading, error, refetch } = useGetPayouts(
    statusFilter || undefined
  );

  // Get all payouts for stats calculation
  const { data: allPayoutsData, refetch: refetchAll } = useGetPayouts();
  const { data: pendingData, refetch: refetchPending } =
    useGetPayouts("pending");
  const { data: completedData, refetch: refetchCompleted } =
    useGetPayouts("completed");
  const { data: failedData, refetch: refetchFailed } = useGetPayouts("failed");

  // Combined refetch function
  const refetchAllData = () => {
    refetch();
    refetchAll();
    refetchPending();
    refetchCompleted();
    refetchFailed();
  };

  const approveMutation = useApprovePayout();
  const rejectMutation = useRejectPayout();
  const retryMutation = useRetryPayout();

  const payouts = data?.data || [];
  const allPayouts = allPayoutsData?.data || [];
  const pendingPayouts = pendingData?.data || [];
  const completedPayouts = completedData?.data || [];
  const failedPayouts = failedData?.data || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
            <RefreshCw className="w-3 h-3 mr-1" />
            Processing
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleStatusFilter = (newStatus: string) => {
    setStatusFilter(newStatus === statusFilter ? "" : newStatus);
  };

  const openActionDialog = (
    payout: Payout,
    action: "approve" | "reject" | "retry"
  ) => {
    setSelectedPayout(payout);
    setActionType(action);
    setApprovedAmount(payout.amount.toString());
    setRejectReason("");
    setIsActionDialogOpen(true);
  };

  const closeActionDialog = () => {
    setSelectedPayout(null);
    setActionType(null);
    setApprovedAmount("");
    setRejectReason("");
    setIsActionDialogOpen(false);
  };

  const handleAction = async () => {
    if (!selectedPayout || !actionType) return;

    try {
      switch (actionType) {
        case "approve":
          await approveMutation.mutateAsync({
            payoutId: selectedPayout.id,
            data: { approved_amount: parseFloat(approvedAmount) },
          });
          break;
        case "reject":
          await rejectMutation.mutateAsync({
            payoutId: selectedPayout.id,
            data: { reason: rejectReason },
          });
          break;
        case "retry":
          await retryMutation.mutateAsync(selectedPayout.id);
          break;
      }
      closeActionDialog();
    } catch (error) {
      // Error handling is done in the mutation hooks
    }
  };

  const isActionInProgress =
    approveMutation.isPending ||
    rejectMutation.isPending ||
    retryMutation.isPending;

  // Calculate stats from all data, not filtered data
  const pendingCount = pendingPayouts.length;
  const completedCount = completedPayouts.length;
  const failedCount = failedPayouts.length;
  const totalAmount = allPayouts.reduce((sum, p) => sum + p.amount, 0);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Payout Requests
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Failed to load payout requests. Please try again.
          </p>
          <Button onClick={() => refetchAllData()} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Payout Requests
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and process user payout requests
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10"
            onClick={() => refetchAllData()}
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          {/* <Button
            variant="outline"
            className="border-flyverr-primary text-flyverr-primary hover:bg-flyverr-primary/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button> */}
        </div>
      </div>

      {/* Stats Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-xl">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Requests
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {allPayouts.length}
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {pendingCount}
                </p>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-xl">
                <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Completed
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {completedCount}
                </p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Amount
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalAmount)}
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleStatusFilter("pending")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
            statusFilter === "pending"
              ? "bg-yellow-500 text-white border-yellow-500 shadow-lg"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-yellow-400 hover:text-yellow-600"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                statusFilter === "pending" ? "bg-white" : "bg-yellow-500"
              }`}
            ></div>
            <span>Pending ({pendingCount})</span>
          </div>
        </button>
        <button
          onClick={() => handleStatusFilter("completed")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
            statusFilter === "completed"
              ? "bg-green-600 text-white border-green-600 shadow-lg"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-green-500 hover:text-green-600"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                statusFilter === "completed" ? "bg-white" : "bg-green-500"
              }`}
            ></div>
            <span>Completed ({completedCount})</span>
          </div>
        </button>
        <button
          onClick={() => handleStatusFilter("failed")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
            statusFilter === "failed"
              ? "bg-red-600 text-white border-red-600 shadow-lg"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-red-500 hover:text-red-600"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                statusFilter === "failed" ? "bg-white" : "bg-red-500"
              }`}
            ></div>
            <span>Failed ({failedCount})</span>
          </div>
        </button>
      </div>

      {/* Payouts Table */}
      {isLoading ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 shadow-lg animate-pulse">
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <AdminTable>
          <AdminTableHeader>
            <tr>
              <AdminTableHeaderCell>Request Details</AdminTableHeaderCell>
              <AdminTableHeaderCell>User Information</AdminTableHeaderCell>
              <AdminTableHeaderCell>Amount & Status</AdminTableHeaderCell>
              <AdminTableHeaderCell>Timeline</AdminTableHeaderCell>
              <AdminTableHeaderCell>Notes</AdminTableHeaderCell>
              <AdminTableHeaderCell align="center">
                Actions
              </AdminTableHeaderCell>
            </tr>
          </AdminTableHeader>
          <AdminTableBody>
            {payouts.length === 0 ? (
              <AdminTableRow>
                <td colSpan={6} className="text-center py-8">
                  <div className="text-gray-500 dark:text-gray-400">
                    <CreditCard className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No payout requests found</p>
                  </div>
                </td>
              </AdminTableRow>
            ) : (
              payouts.map((payout) => (
                <AdminTableRow key={payout.id} hoverable={true}>
                  {/* Request Details Cell */}
                  <AdminTableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        Payout Request
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {payout.id.slice(0, 8)}...
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Info ID: {payout.payout_info_id.slice(0, 8)}...
                      </div>
                      {payout.retry_count && payout.retry_count > 0 && (
                        <div className="text-xs text-orange-600 dark:text-orange-400">
                          Retry #{payout.retry_count}
                        </div>
                      )}
                    </div>
                  </AdminTableCell>

                  {/* User Information Cell */}
                  <AdminTableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          User ID: {payout.user_id.slice(0, 8)}...
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Click to view full profile
                      </div>
                    </div>
                  </AdminTableCell>

                  {/* Amount & Status Cell */}
                  <AdminTableCell>
                    <div className="space-y-2">
                      <div className="text-lg font-bold text-flyverr-primary dark:text-flyverr-secondary">
                        {formatCurrency(payout.amount)}
                      </div>
                      {getStatusBadge(payout.status)}
                    </div>
                  </AdminTableCell>

                  {/* Timeline Cell */}
                  <AdminTableCell>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900 dark:text-white flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                        {formatDate(payout.request_date)}
                      </div>
                      {payout.processed_date && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Processed: {formatDate(payout.processed_date)}
                        </div>
                      )}
                      {payout.status === "pending" && (
                        <div className="text-xs text-yellow-600 dark:text-yellow-400">
                          Awaiting review
                        </div>
                      )}
                    </div>
                  </AdminTableCell>

                  {/* Notes Cell */}
                  <AdminTableCell>
                    <div className="max-w-xs">
                      {payout.notes ? (
                        <div className="text-sm text-gray-900 dark:text-white">
                          <div className="flex items-start space-x-1">
                            <MessageSquare className="w-3 h-3 mt-0.5 text-gray-500" />
                            <span className="line-clamp-2">{payout.notes}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          No notes provided
                        </div>
                      )}
                      {payout.last_error && (
                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                          Error: {payout.last_error}
                        </div>
                      )}
                    </div>
                  </AdminTableCell>

                  {/* Actions Cell */}
                  <AdminTableCell align="center">
                    <div className="flex items-center justify-center space-x-2">
                      {payout.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200 dark:border-green-700 text-green-600 dark:text-green-400"
                            onClick={() => openActionDialog(payout, "approve")}
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400"
                            onClick={() => openActionDialog(payout, "reject")}
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                      {payout.status === "failed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                          onClick={() => openActionDialog(payout, "retry")}
                        >
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </AdminTableCell>
                </AdminTableRow>
              ))
            )}
          </AdminTableBody>
        </AdminTable>
      )}

      {/* Action Modal */}
      {isActionDialogOpen && (
        <Modal size="md">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {actionType === "approve" && "Approve Payout Request"}
                {actionType === "reject" && "Reject Payout Request"}
                {actionType === "retry" && "Retry Payout Request"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {actionType === "approve" &&
                  "Review and approve this payout request. You can adjust the amount if needed."}
                {actionType === "reject" &&
                  "Reject this payout request. Please provide a reason for rejection."}
                {actionType === "retry" &&
                  "Retry this failed payout request. The system will attempt to process it again."}
              </p>
            </div>

            {selectedPayout && (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Amount:
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(selectedPayout.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Status:
                      </span>
                      <span>{getStatusBadge(selectedPayout.status)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Requested:
                      </span>
                      <span className="text-sm">
                        {formatDate(selectedPayout.request_date)}
                      </span>
                    </div>
                  </div>
                </div>

                {actionType === "approve" && (
                  <div className="space-y-2">
                    <label
                      htmlFor="approved-amount"
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Approved Amount
                    </label>
                    <Input
                      id="approved-amount"
                      type="number"
                      step="0.01"
                      value={approvedAmount}
                      onChange={(e) => setApprovedAmount(e.target.value)}
                      placeholder="Enter approved amount"
                      className="w-full"
                    />
                  </div>
                )}

                {actionType === "reject" && (
                  <div className="space-y-2">
                    <label
                      htmlFor="reject-reason"
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Rejection Reason
                    </label>
                    <Textarea
                      id="reject-reason"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Enter reason for rejection..."
                      rows={3}
                      className="w-full"
                    />
                  </div>
                )}

                {actionType === "retry" && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    This will reset the payout status to processing and attempt
                    to process it again.
                    {selectedPayout.retry_count &&
                      selectedPayout.retry_count > 0 && (
                        <p className="mt-2 text-orange-600 dark:text-orange-400">
                          This payout has been retried{" "}
                          {selectedPayout.retry_count} time(s) already.
                        </p>
                      )}
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={closeActionDialog}>
                Cancel
              </Button>
              <Button
                onClick={handleAction}
                disabled={
                  isActionInProgress ||
                  (actionType === "approve" && !approvedAmount) ||
                  (actionType === "reject" && !rejectReason.trim())
                }
                className={
                  actionType === "approve"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : actionType === "reject"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }
              >
                {isActionInProgress ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : actionType === "approve" ? (
                  <ThumbsUp className="w-4 h-4 mr-2" />
                ) : actionType === "reject" ? (
                  <ThumbsDown className="w-4 h-4 mr-2" />
                ) : (
                  <RotateCcw className="w-4 h-4 mr-2" />
                )}
                {actionType === "approve" && "Approve"}
                {actionType === "reject" && "Reject"}
                {actionType === "retry" && "Retry"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
