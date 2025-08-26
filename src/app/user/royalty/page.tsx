"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useMyLicenses,
  useEligibility,
  usePlatformProducts,
  useClaimRoyalty,
  useRoyaltyHistory,
  useAcquiredRoyaltyLicenses,
} from "@/features/user/royalty/hooks/useRoyalty";
import {
  AdminTable,
  AdminTableHeader,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
  AdminTableHeaderCell,
} from "@/components/ui/admin-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PaginationControls from "@/components/ui/PaginationControls";
import Modal from "@/components/Modal";
import {
  AlertCircle,
  CheckCircle2,
  Gift,
  RefreshCw,
  Search,
} from "lucide-react";

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function RoyaltyPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedLicenseId, setSelectedLicenseId] = useState<string | null>(
    null
  );
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedPlatformProductId, setSelectedPlatformProductId] =
    useState<string>("");
  const [selectedGroupLicenses, setSelectedGroupLicenses] = useState<any[]>([]);

  const [licensesPage, setLicensesPage] = useState(1);
  const [licensesLimit, setLicensesLimit] = useState(20);
  const { data: licensesRes, isLoading: isLicensesLoading } = useMyLicenses(
    licensesPage,
    licensesLimit
  );
  const {
    data: eligibilityRes,
    isFetching: isEligibilityLoading,
    refetch: refetchEligibility,
  } = useEligibility(selectedLicenseId || undefined);
  const { data: platformRes, isLoading: isPlatformLoading } =
    usePlatformProducts();
  const [historyPage, setHistoryPage] = useState(1);
  const [historyLimit, setHistoryLimit] = useState(10);
  const { data: historyRes } = useRoyaltyHistory(historyPage, historyLimit);
  const [acquiredPage, setAcquiredPage] = useState(1);
  const [acquiredLimit, setAcquiredLimit] = useState(10);
  const { data: acquiredRes } = useAcquiredRoyaltyLicenses(
    acquiredPage,
    acquiredLimit
  );
  const claimMutation = useClaimRoyalty();

  const groupedLicenses = licensesRes?.data?.licenses || [];

  const filteredLicenses = useMemo(() => {
    if (!search.trim()) return groupedLicenses;
    const q = search.toLowerCase();
    return groupedLicenses.filter((g) =>
      g.product.title.toLowerCase().includes(q)
    );
  }, [groupedLicenses, search]);

  const openClaimModalForGroup = (licenses: any[]) => {
    setSelectedGroupLicenses(licenses || []);
    const first = licenses?.[0]?.id || null;
    setSelectedLicenseId(first);
    setIsClaimModalOpen(true);
    setSelectedPlatformProductId("");
  };

  // Auto-check eligibility when modal opens or selected license changes
  useEffect(() => {
    if (isClaimModalOpen && selectedLicenseId) {
      refetchEligibility();
    }
  }, [isClaimModalOpen, selectedLicenseId, refetchEligibility]);

  const submitClaim = async () => {
    if (!selectedLicenseId || !selectedPlatformProductId) return;
    try {
      await claimMutation.mutateAsync({
        licenseId: selectedLicenseId,
        selectedPlatformProductId,
      });
      setIsClaimModalOpen(false);
    } catch {}
  };

  return (
    <div className="space-y-10 md:mt-12 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Royalty
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Claim royalty licenses for exited products.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.refresh()}>
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </div>

      {/* My Licenses (eligible for royalty) */}
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product title"
              className="max-w-sm"
            />
          </div>

          <AdminTable>
            <AdminTableHeader>
              <tr>
                <AdminTableHeaderCell>Product</AdminTableHeaderCell>
                <AdminTableHeaderCell>Stage</AdminTableHeaderCell>
                <AdminTableHeaderCell>Round</AdminTableHeaderCell>
                <AdminTableHeaderCell>Licenses</AdminTableHeaderCell>
                <AdminTableHeaderCell></AdminTableHeaderCell>
              </tr>
            </AdminTableHeader>
            <AdminTableBody>
              {isLicensesLoading ? (
                [...Array(3)].map((_, i) => (
                  <AdminTableRow key={i}>
                    {[...Array(5)].map((_, j) => (
                      <AdminTableCell key={j}>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse" />
                      </AdminTableCell>
                    ))}
                  </AdminTableRow>
                ))
              ) : filteredLicenses.length === 0 ? (
                <AdminTableRow>
                  <AdminTableCell colSpan={5}>
                    <div className="text-center py-10">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No licenses found.
                      </p>
                    </div>
                  </AdminTableCell>
                </AdminTableRow>
              ) : (
                filteredLicenses.map((group) => (
                  <AdminTableRow key={group.product.id}>
                    <AdminTableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={group.product.thumbnail_url}
                          alt={group.product.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {group.product.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {group.licenses.length} license(s)
                          </div>
                        </div>
                      </div>
                    </AdminTableCell>
                    <AdminTableCell className="capitalize">
                      {group.product.current_stage}
                    </AdminTableCell>
                    <AdminTableCell>
                      {group.product.current_round}
                    </AdminTableCell>
                    <AdminTableCell>{group.licenses.length}</AdminTableCell>
                    <AdminTableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openClaimModalForGroup(group.licenses)}
                        className="flex items-center gap-2"
                      >
                        <Gift className="w-4 h-4" /> Claim
                      </Button>
                    </AdminTableCell>
                  </AdminTableRow>
                ))
              )}
            </AdminTableBody>
          </AdminTable>
          {licensesRes?.data?.pagination && (
            <PaginationControls
              currentPage={licensesRes.data.pagination.page}
              totalPages={licensesRes.data.pagination.totalPages}
              totalCount={licensesRes.data.pagination.total}
              pageSize={licensesRes.data.pagination.limit}
              onPageChange={(p) => setLicensesPage(p)}
              onPageSizeChange={(s) => {
                setLicensesLimit(s);
                setLicensesPage(1);
              }}
              entityLabel="licenses"
              className="mt-4"
            />
          )}
        </CardContent>
      </Card>

      {/* History */}
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Royalty History
          </h2>
          <AdminTable>
            <AdminTableHeader>
              <tr>
                <AdminTableHeaderCell>Exit License</AdminTableHeaderCell>
                <AdminTableHeaderCell>Platform Product</AdminTableHeaderCell>
                <AdminTableHeaderCell>Licenses</AdminTableHeaderCell>
                <AdminTableHeaderCell>Status</AdminTableHeaderCell>
                <AdminTableHeaderCell>Processed</AdminTableHeaderCell>
              </tr>
            </AdminTableHeader>
            <AdminTableBody>
              {!historyRes?.data?.royaltyClaims?.length ? (
                <AdminTableRow>
                  <AdminTableCell colSpan={5}>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No royalty claims yet.
                    </div>
                  </AdminTableCell>
                </AdminTableRow>
              ) : (
                historyRes.data.royaltyClaims.map((item) => (
                  <AdminTableRow key={item.id}>
                    <AdminTableCell>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.exit_license.product.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.exit_license.license_token}
                        </div>
                      </div>
                    </AdminTableCell>
                    <AdminTableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={item.platform_product.thumbnail_url}
                          alt={item.platform_product.title}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <span>{item.platform_product.title}</span>
                      </div>
                    </AdminTableCell>
                    <AdminTableCell>
                      {item.royalty_licenses_count}
                    </AdminTableCell>
                    <AdminTableCell className="capitalize">
                      {item.status}
                    </AdminTableCell>
                    <AdminTableCell>
                      {formatDate(item.processed_at)}
                    </AdminTableCell>
                  </AdminTableRow>
                ))
              )}
            </AdminTableBody>
          </AdminTable>
          {historyRes?.data?.pagination && (
            <PaginationControls
              currentPage={historyRes.data.pagination.page}
              totalPages={historyRes.data.pagination.totalPages}
              totalCount={historyRes.data.pagination.total}
              pageSize={historyRes.data.pagination.limit}
              onPageChange={(p) => setHistoryPage(p)}
              onPageSizeChange={(s) => {
                setHistoryLimit(s);
                setHistoryPage(1);
              }}
              entityLabel="claims"
              className="mt-4"
            />
          )}
        </CardContent>
      </Card>

      {/* Acquired Royalty Licenses */}
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Acquired Royalty Licenses
          </h2>
          <AdminTable>
            <AdminTableHeader>
              <tr>
                <AdminTableHeaderCell>License</AdminTableHeaderCell>
                <AdminTableHeaderCell>Platform Product</AdminTableHeaderCell>
                <AdminTableHeaderCell>Round</AdminTableHeaderCell>
                <AdminTableHeaderCell>Assigned</AdminTableHeaderCell>
              </tr>
            </AdminTableHeader>
            <AdminTableBody>
              {!acquiredRes?.data?.royaltyLicenses?.length ? (
                <AdminTableRow>
                  <AdminTableCell colSpan={4}>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No royalty licenses acquired yet.
                    </div>
                  </AdminTableCell>
                </AdminTableRow>
              ) : (
                acquiredRes.data.royaltyLicenses.map((lic) => (
                  <AdminTableRow key={lic.id}>
                    <AdminTableCell>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {lic.license.license_token}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(lic.license.acquired_at)}
                        </div>
                      </div>
                    </AdminTableCell>
                    <AdminTableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={lic.platform_product.thumbnail_url}
                          alt={lic.platform_product.title}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <span>{lic.platform_product.title}</span>
                      </div>
                    </AdminTableCell>
                    <AdminTableCell>
                      {lic.platform_product.current_round}
                    </AdminTableCell>
                    <AdminTableCell>
                      {formatDate(lic.assigned_at)}
                    </AdminTableCell>
                  </AdminTableRow>
                ))
              )}
            </AdminTableBody>
          </AdminTable>
          {acquiredRes?.data?.pagination && (
            <PaginationControls
              currentPage={acquiredRes.data.pagination.page}
              totalPages={acquiredRes.data.pagination.totalPages}
              totalCount={acquiredRes.data.pagination.total}
              pageSize={acquiredRes.data.pagination.limit}
              onPageChange={(p) => setAcquiredPage(p)}
              onPageSizeChange={(s) => {
                setAcquiredLimit(s);
                setAcquiredPage(1);
              }}
              entityLabel="royalty licenses"
              className="mt-4"
            />
          )}
        </CardContent>
      </Card>

      {/* Claim Modal */}
      {isClaimModalOpen && (
        <Modal size="lg">
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Claim Royalty
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsClaimModalOpen(false)}
              >
                Close
              </Button>
            </div>

            <div className="space-y-4">
              {/* If multiple licenses, show selector */}
              {selectedGroupLicenses.length > 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select License
                  </label>
                  <select
                    value={selectedLicenseId || ""}
                    onChange={(e) => setSelectedLicenseId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {selectedGroupLicenses.map((l: any) => (
                      <option key={l.id} value={l.id}>
                        {l.license_token} — acquired{" "}
                        {new Date(l.acquired_at).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Eligibility status (auto-fetched) */}
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {isEligibilityLoading ? (
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-40 animate-pulse" />
                ) : eligibilityRes?.data?.eligible ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-4 h-4" /> Eligible for royalty
                    claim
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-4 h-4" />{" "}
                    {eligibilityRes?.data?.reason || "Not eligible"}
                  </div>
                )}
              </div>

              {/* Platform products list when eligible */}
              {eligibilityRes?.data?.eligible && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Select a Platform Product
                  </h3>
                  <AdminTable>
                    <AdminTableHeader>
                      <tr>
                        <AdminTableHeaderCell>Product</AdminTableHeaderCell>
                        <AdminTableHeaderCell>Available</AdminTableHeaderCell>
                        <AdminTableHeaderCell>Total</AdminTableHeaderCell>
                        <AdminTableHeaderCell>Action</AdminTableHeaderCell>
                      </tr>
                    </AdminTableHeader>
                    <AdminTableBody>
                      {!platformRes?.data?.platformProducts?.length ? (
                        <AdminTableRow>
                          <AdminTableCell colSpan={4}>
                            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                              No platform products available.
                            </div>
                          </AdminTableCell>
                        </AdminTableRow>
                      ) : (
                        platformRes.data.platformProducts.map((p) => {
                          const isSelected =
                            selectedPlatformProductId === p.product_id;
                          return (
                            <AdminTableRow key={p.product_id}>
                              <AdminTableCell>
                                <div className="flex items-center gap-3">
                                  <img
                                    src={p.thumbnail_url}
                                    alt={p.title}
                                    className="w-10 h-10 rounded object-cover"
                                  />
                                  <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                      {p.title}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                      {p.description}
                                    </div>
                                  </div>
                                </div>
                              </AdminTableCell>
                              <AdminTableCell>
                                {p.available_licenses}
                              </AdminTableCell>
                              <AdminTableCell>
                                {p.total_licenses}
                              </AdminTableCell>
                              <AdminTableCell>
                                <div className="flex items-center gap-3">
                                  <Button
                                    size="sm"
                                    variant={isSelected ? "default" : "outline"}
                                    className={
                                      isSelected
                                        ? "bg-flyverr-primary hover:bg-flyverr-primary/90"
                                        : ""
                                    }
                                    onClick={() =>
                                      setSelectedPlatformProductId(p.product_id)
                                    }
                                  >
                                    {isSelected ? "Selected" : "Select"}
                                  </Button>
                                  <Link
                                    href={`/marketplace/${p.product_id}`}
                                    target="_blank"
                                    className="text-sm text-flyverr-primary hover:underline"
                                  >
                                    View
                                  </Link>
                                </div>
                              </AdminTableCell>
                            </AdminTableRow>
                          );
                        })
                      )}
                    </AdminTableBody>
                  </AdminTable>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsClaimModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitClaim}
                  disabled={
                    !eligibilityRes?.data?.eligible ||
                    !selectedPlatformProductId ||
                    claimMutation.isPending
                  }
                  className="bg-flyverr-primary hover:bg-flyverr-primary/90"
                >
                  {claimMutation.isPending && (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Claim Royalty
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
