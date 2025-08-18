"use client"

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/Modal";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Star,
  Upload,
  FileText,
  Image as ImageIcon,
  DollarSign,
  Package,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import DashboardLayout from '@/components/DashboardLayout'
import AddProductModal, { NewProduct } from '@/components/AddProductModal'
import StripeOnboardingModal from '@/components/ui/StripeOnboardingModal'
import { useGetMyProducts } from '@/features/user/product/hooks/useGetMyProducts'
import { UserProduct } from '@/features/user/product/product.types'
import { useRouter } from 'next/navigation'
import { canCreateProducts } from '@/lib/stripeHelpers'

// Skeleton loading components
const ProductTableSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    ))}
  </div>
);

const StatsCardSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, index) => (
      <Card key={index} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Product Image Component with loading and error handling
const ProductImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageLoad = () => {
    setImageState('loaded');
  };

  const handleImageError = () => {
    setImageState('error');
    setImageSrc('/api/placeholder/150/150'); // Fallback to placeholder API or default image
  };

  // Default placeholder image (you can replace this with your own default image)
  const defaultImage = (
    <div className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-600`}>
      <ImageIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
    </div>
  );

  if (imageState === 'error') {
    return defaultImage;
  }

  return (
    <>
      {imageState === 'loading' && (
        <div className={`${className} bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center`}>
          <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-flyverr-primary rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${imageState === 'loading' ? 'hidden' : 'block'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  );
};

export default function MyProductsPage() {
  const { user } = useAuth()
  const router = useRouter();
  // Add Product Modal state
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isStripeOnboardingModalOpen, setIsStripeOnboardingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Get products from API
  const { data: productsData, isLoading, error } = useGetMyProducts();
  const products: UserProduct[] = productsData?.data?.products || [];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           (product.category?.slug === selectedCategory);
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProductClick = () => {
    if (canCreateProducts()) {
      setIsAddProductModalOpen(true);
    } else {
      setIsStripeOnboardingModalOpen(true);
    }
  };



  const handleEditProduct = (productId: string) => {
    router.push(`/user/products/${productId}`);
  };

  const handleDeleteProduct = (productId: string) => {
    // TODO: Implement delete confirmation modal and API call
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      console.log('Delete product:', productId);
      // Add delete API call here
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "draft":
        return <FileText className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <ImageIcon className="w-4 h-4" />;
    } else if (fileType.includes('pdf')) {
      return <FileText className="w-4 h-4" />;
    } else if (fileType.includes('zip') || fileType.includes('rar')) {
      return <Package className="w-4 h-4" />;
    } else if (fileType.includes('video/')) {
      return <Upload className="w-4 h-4" />;
    } else {
      return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const soldLicenses = (product: UserProduct) => {
    return product.total_licenses - product.remaining_licenses;
  };

  const revenue = (product: UserProduct) => {
    return soldLicenses(product) * product.original_price;
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your digital products and track their performance
            </p>
          </div>
          <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <StatsCardSkeleton />

        {/* Filters Skeleton */}
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="sm:w-48">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table Skeleton */}
        <div className="mb-8">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4 animate-pulse"></div>
          <ProductTableSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Error loading products
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {error.message || "Failed to load your products. Please try again."}
          </p>
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
            My Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your digital products and track their performance
          </p>
        </div>
        <Button 
          onClick={handleAddProductClick}
          className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Products</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{products.length}</p>
              </div>
              <div className="p-3 bg-blue-500/10 dark:bg-blue-400/20 rounded-lg">
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Approved Products</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {products.filter(p => p.status === "approved").length}
                </p>
              </div>
              <div className="p-3 bg-green-500/10 dark:bg-green-400/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  ${products.reduce((sum, p) => sum + revenue(p), 0).toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 dark:bg-purple-400/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Total Sales</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {products.reduce((sum, p) => sum + soldLicenses(p), 0)}
                </p>
              </div>
              <div className="p-3 bg-orange-500/10 dark:bg-orange-400/20 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-700"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-flyverr-primary dark:focus:ring-flyverr-secondary focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      {filteredProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            My Products ({filteredProducts.length})
          </h2>
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        File Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Licenses
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              {product.thumbnail_url ? (
                                <ProductImage 
                                  src={product.thumbnail_url} 
                                  alt={product.title}
                                  className="h-12 w-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600 shadow-sm"
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-600">
                                  <ImageIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                {product.title}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 max-w-xs">
                                {product.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${getStatusColor(product.status)} font-medium flex items-center gap-1`}>
                            {getStatusIcon(product.status)}
                            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getFileTypeIcon(product.file_type)}
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {product.file_type.split('/')[1]?.toUpperCase() || product.file_type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            ${product.original_price}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {soldLicenses(product)}/{product.total_licenses}
                            </span>
                            <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-flyverr-primary to-flyverr-secondary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(soldLicenses(product) / product.total_licenses) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                            ${revenue(product).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(product.created_at)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditProduct(product.id)}
                              className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="border-red-200 dark:border-red-600 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-800 hover:border-red-300 dark:hover:border-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {products.length === 0 ? "No products yet" : "No products found"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              {products.length === 0 
                ? "Get started by adding your first digital product"
                : searchTerm || selectedStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "No products match your current filters"
              }
            </p>
            {products.length === 0 && (
              <Button 
                onClick={handleAddProductClick}
                className="bg-flyverr-primary hover:bg-flyverr-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />

      {/* Stripe Onboarding Modal */}
      <StripeOnboardingModal
        isOpen={isStripeOnboardingModalOpen}
        onClose={() => setIsStripeOnboardingModalOpen(false)}
      />
    </div>
  );
} 